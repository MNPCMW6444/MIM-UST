import express from "express";
import cors from "cors";
import CacheService from "express-api-cache";
import timeout from "connect-timeout";
import { createClient } from "redis";
import config from "./config.js";
import {
  getBorrowableMimsArbitrum,
  getBorrowableMimsAvalanche,
  getBorrowableMimsBinance,
  getBorrowableMimsEthereum,
  getBorrowableMimsFantom,
} from "./pools/borrowableMims.js";
import moment from "moment";

import Twilio from "twilio";

const asd = process.env.PORT || 10004;
const app = express();
const cache = CacheService.cache;

const minnininn = 500;

app.use(cors());
//app.use(timeout(600000));

let redis = null;

const accountSid = "ACb56542d282e469142290abbc1c21b238";
const authToken = "5e093feacc8d6afbc6471b70a641fa3d";
const client = new Twilio(accountSid, authToken);

(async () => {
  if (config.env !== "dev") {
    redis = createClient();

    redis.on("error", (err) => {});

    await redis.connect();
  }
})();

const corsOptions = {
  origin:
    config.env === "dev"
      ? "http://localhost:3001"
      : "https://www.byebyedai.money",
};
/* 
app.get(
  "/getSpellHolders",
  cache("30 seconds"),
  cors(corsOptions),
  async (req, res) => {
    console.log("fetching /getSpellHolders");
    const holdersByChain = await redis.get("byebyedai.spellHoldersArray");
    console.log("Done");
    res.json(JSON.parse(holdersByChain));
  }
);

app.get(
  "/getsSpellHolders",
  cache("30 seconds"),
  cors(corsOptions),
  async (req, res) => {
    console.log("fetching /getsSpellHolders");
    const holdersByChain = await redis.get("byebyedai.stakedSpellHoldersArray");
    console.log("Done");
    res.json(JSON.parse(holdersByChain));
  }
);

app.get(
  "/getMkrHolders",
  cache("30 seconds"),
  cors(corsOptions),
  async (req, res) => {
    console.log("fetching /getMkrHolders");
    const holdersByChain = await redis.get("byebyedai.mkrHoldersArray");
    console.log("Done");
    res.json(JSON.parse(holdersByChain));
  }
);

app.get(
  "/getMkrFees",
  cache("4 hours"),
  cors(corsOptions),
  async (req, res) => {
    const makerFees = await redis.get("byebyedai.makerFees");
    res.json(JSON.parse(makerFees));
  }
);

app.get(
  "/getSpellFees",
  cache("30 seconds"),
  cors(corsOptions),
  async (req, res) => {
    const total = await redis.get("byebyedai.totalSpellFees");
    res.json(JSON.parse(total));
  }
);

app.get(
  "/getSpellCauldrons",
  cache("30 seconds"),
  cors(corsOptions),
  async (req, res) => {
    const cauldronsArray = await redis.get("byebyedai.cauldronsArray");
    res.send({
      cauldrons: JSON.parse(cauldronsArray),
    });
  }
);

app.get(
  "/getHistoricalStakedSpellRatio",
  cache("30 seconds"),
  cors(corsOptions),
  async (req, res) => {
    const stakedRatioHistory = await redis.get(
      "byebyedai.stakedRatio.stakedRatioHistory"
    );
    res.send({
      stakedRatioHistory: JSON.parse(stakedRatioHistory),
    });
  }
);

app.get(
  "/getEmissions",
  cache("2 hours"),
  cors(corsOptions),
  async (req, res) => {
    const emissions = await redis.get(
      "byebyedai.totalEmissionsLastSevenDaysUSD"
    );
    res.json(JSON.parse(emissions));
  }
);

app.get(
  "/getBorrowableMims",
  cors(corsOptions),
  cache("5 seconds"),
  async (req, res) => {
    console.log("Update borrowable MIMs...", moment().format("HH:mm:ss"));
    const borrwableEth = await getBorrowableMimsEthereum();
     const borrowableAvax = await getBorrowableMimsAvalanche();
    const borrowableFtm = await getBorrowableMimsFantom();
    const borrowableArbi = await getBorrowableMimsArbitrum();
    const borrowableBsc = await getBorrowableMimsBinance(); */
/*     console.log("Update done.", moment().format("HH:mm:ss"));
    let borrwableEth2 = borrwableEth.substring(2, borrwableEth.length - 1);
    borrwableEth2.split(".").join("");
    let checkedNew = borrwableEth2.split(".").join("");
    checkedNew = checkedNew.split(",").join(".");
    let sum = parseFloat(checkedNew);
    res.json({ MIMS: sum });
  }
);
 */

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), async function() {
  let sum = 0;
try{
 console.log(`Server listening for ${corsOptions.origin} requests ...`);
  const borrwableEth = await getBorrowableMimsEthereum();
  /* const borrowableAvax = await getBorrowableMimsAvalanche();
  const borrowableFtm = await getBorrowableMimsFantom();
  const borrowableArbi = await getBorrowableMimsArbitrum();
  const borrowableBsc = await getBorrowableMimsBinance(); */

  
  console.log("Update done.", moment().format("HH:mm:ss"));
  let borrwableEth2 = borrwableEth.substring(2, borrwableEth.length - 1);
  borrwableEth2.split(".").join("");
  let checkedNew = borrwableEth2.split(".").join("");
  checkedNew = checkedNew.split(",").join(".");
   sum = parseFloat(checkedNew); 
console.log(sum)
}catch(e){console.log("catched::     ");console.log(e);}
/* client.messages.create({
      body: "Bot is running and will notify if MIM>"+minnininn,
      from: "+14106715603",
      to: "+12312374619",})
      .then(message => console.log(message.sid));  */

        setTimeout(() => {check22();}, 5000); 


});

/* app.listen(asd, "127.0.0.1", async () => {
 

 
});
 */
async function check22(){
let sum=0;
  try{ const borrwableEth = await getBorrowableMimsEthereum();
 let borrwableEth2 = borrwableEth.substring(2, borrwableEth.length - 1);
  borrwableEth2.split(".").join("");
  let checkedNew = borrwableEth2.split(".").join("");
  checkedNew = checkedNew.split(",").join(".");
  sum = parseFloat(checkedNew); 
  console.log(sum)
if(sum>minnininn){
 client.messages.create({
      body: "There are "+sum+" MIMs!! not checking again in the next 30 minutes",
      from: "+14106715603",
      to: "+12312374619",})
      .then(message => console.log(message.sid)); }}catch(e){console.log("catched::     ");console.log(e);}
      if (!sum)
     setTimeout(() => {check22();}, sum>minnininn?1800000:30000);
}
