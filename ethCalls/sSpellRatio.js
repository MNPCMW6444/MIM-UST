import { createRequire } from "module";
import Web3 from "web3";
import EthDater from "ethereum-block-by-date";
import { createClient } from "redis";
import moment from "moment";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

const require = createRequire(import.meta.url);
const rpcURL = "http://10.8.0.3:8545/";
const web3 = new Web3(rpcURL);
const dater = new EthDater(web3);

const StakedSpellABI = require("../datas/StakedSpellABI.json");
const SpellABI = require("../datas/SpellABI.json");

const StakedSpellContractAddress = "0x26FA3fFFB6EfE8c1E69103aCb4044C26B9A106a9";
const SpellContractAddress = "0x090185f2135308BaD17527004364eBcC2D37e5F6";

async function getBlocksBoundaries(lastTimestamp) {
  console.log("Fetching blocks ...");
  try {
    let blocksObjects = await dater.getEvery(
      "hours", // Period, required. Valid value: years, quarters, months, weeks, days, hours, minutes
      moment(lastTimestamp), // Start date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
      moment().subtract(1, "h"), // End date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
      1, // Duration, optional, integer. By default 1.
      true // Block after, optional. Search for the nearest block before or after the given date. By default true.
    );
    let blocks = [];
    blocksObjects.forEach(({ block, timestamp }) => {
      blocks.push({ block, timestamp: timestamp * 1000 });
    });
    console.log("Blocks fetched !");
    return blocks;
  } catch (error) {
    console.log("Dater error : ", error);
  }
}

async function getStakedSpellRatioHistory() {
  async function getRatioForBlock(StakedSpellContract, SpellContract, block) {
    let sSPELLSupplyAtBlock = 0.0;
    let spellBalanceAtBlock = 0.0;

    try {
      const sSPELLSupplyAtBlockResponse =
        await StakedSpellContract.methods.totalSupply
          .call()
          .call(null, block.block);
      sSPELLSupplyAtBlock = web3.utils.fromWei(sSPELLSupplyAtBlockResponse);
    } catch (e) {
      console.log("Error while fetching sSPELL supply : ", e);
    }

    try {
      const spellBalanceAtBlockResponse = await SpellContract.methods
        .balanceOf(StakedSpellContractAddress)
        .call(null, block.block);
      spellBalanceAtBlock = web3.utils.fromWei(spellBalanceAtBlockResponse);
    } catch (e) {
      console.log("Error while fetching SPELL balance : ", e);
    }
    return {
      ratio: spellBalanceAtBlock / sSPELLSupplyAtBlock,
      timestamp: block.timestamp,
    };
  }

  const StakedSpellContract = new web3.eth.Contract(
    StakedSpellABI,
    StakedSpellContractAddress
  );
  const SpellContract = new web3.eth.Contract(SpellABI, SpellContractAddress);

  let ratioArray = [];
  let blocks = [];
  let lastTimestamp = 1622401177000;

  const cachedLastTimestamp = await redis.get(
    "byebyedai.stakedRatio.lastTimestamp"
  );

  if (cachedLastTimestamp !== null) {
    lastTimestamp = JSON.parse(cachedLastTimestamp);
  }

  blocks = await getBlocksBoundaries(lastTimestamp);
  if (blocks.length > 0) {
    for (let i = 0; i < blocks.length - 1; i++) {
      const ratioObject = await getRatioForBlock(
        StakedSpellContract,
        SpellContract,
        blocks[i]
      );
      ratioArray.push(ratioObject);
    }
    return ratioArray;
  }
}

const ratioHistory = await getStakedSpellRatioHistory();
await redis.set(
  "byebyedai.stakedRatio.lastTimestamp",
  JSON.stringify(ratioHistory[ratioHistory.length - 1].timestamp)
);
const previousRatioHistory = await redis.get(
  "byebyedai.stakedRatio.stakedRatioHistory"
);
let parsedPreviousRatio = [];
if (previousRatioHistory !== null) {
  parsedPreviousRatio = JSON.parse(previousRatioHistory);
}
Array.prototype.push.apply(parsedPreviousRatio, ratioHistory);
await redis.set(
  "byebyedai.stakedRatio.stakedRatioHistory",
  JSON.stringify(parsedPreviousRatio)
);
process.exit(0);
