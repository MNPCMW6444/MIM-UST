import Web3 from "web3";
import { createRequire } from "module";

import { createClient } from "redis";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => {});

  await redis.connect();
})();

const require = createRequire(import.meta.url);
const BentoBoxABI = require("../datas/BentoBoxABI.json");
const DegenBoxABI = require("../datas/DegenBoxABI.json");

// change this to Infura RPC
const ETH_RPC_URL =
  "https://mainnet.infura.io/v3/a7e39996c734463f97b05564e14b2764";
const web3_eth = new Web3(ETH_RPC_URL);

const FTM_RPC_URL = "https://rpc.ftm.tools";
const web3_ftm = new Web3(FTM_RPC_URL);

const AVAX_RPC_URL = "https://api.avax.network/ext/bc/C/rpc";
const web3_avax = new Web3(AVAX_RPC_URL);

const BSC_RPC_URL = "https://bsc-dataseed1.binance.org:443";
const web3_bsc = new Web3(BSC_RPC_URL);

const ARBI_RPC_URL = "https://arb1.arbitrum.io/rpc";
const web3_arbi = new Web3(ARBI_RPC_URL);

const MIM_ADDRESS_ETH =
  "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3".toLowerCase();
const MIM_ADDRESS_FTM =
  "0x82f0b8b456c1a451378467398982d4834b6829c1".toLowerCase();
const MIM_ADDRESS_AVAX =
  "0x130966628846bfd36ff31a822705796e8cb8c18d".toLowerCase();
const MIM_ADDRESS_BSC =
  "0xfe19f0b51438fd612f6fd59c1dbb3ea319f433ba".toLowerCase();
const MIM_ADDRESS_ARBI =
  "0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a".toLowerCase();

const BENTO_BOX_ADDRESS_ETH =
  "0xf5bce5077908a1b7370b9ae04adc565ebd643966".toLowerCase();
const BENTO_BOX_ADDRESS_FTM =
  "0xf5bce5077908a1b7370b9ae04adc565ebd643966".toLowerCase();
const BENTO_BOX_ADDRESS_AVAX =
  "0xf4f46382c2be1603dc817551ff9a7b333ed1d18f".toLowerCase();
const BENTO_BOX_ADDRESS_BSC =
  "0x090185f2135308bad17527004364ebcc2d37e5f6".toLowerCase();
const BENTO_BOX_ADDRESS_ARBI =
  "0x74c764d41b77dbbb4fe771dab1939b00b146894a".toLowerCase();

const DEGEN_BOX_ADDRESS_ETH =
  "0xd96f48665a1410c0cd669a88898eca36b9fc2cce".toLowerCase();
const DEGEN_BOX_ADDRESS_FTM = "".toLowerCase();
const DEGEN_BOX_ADDRESS_AVAX =
  "0x1fC83f75499b7620d53757f0b01E2ae626aAE530".toLowerCase();
const DEGEN_BOX_ADDRESS_BSC = "".toLowerCase();

const ETH_CAULDRONS = [
  {
    name: "ALCX",
    address: "0x7b7473a76D6ae86CE19f7352A1E89F6C9dc39020".toLowerCase(),
    type: 1,
  },
  {
    name: "FTM",
    address: "0x05500e2Ee779329698DF35760bEdcAAC046e7C27".toLowerCase(),
    type: 1,
  },
  {
    name: "xSUSHI",
    address: "0x98a84EfF6e008c5ed0289655CcdCa899bcb6B99F".toLowerCase(),
    type: 1,
  },
  {
    name: "ycrvIB",
    address: "0xEBfDe87310dc22404d918058FAa4D56DC4E93f0A".toLowerCase(),
    type: 1,
  },
  {
    name: "yvstETH",
    address: "0x0BCa8ebcB26502b013493Bf8fE53aA2B1ED401C1".toLowerCase(),
    type: 1,
  },
  {
    name: "yvwETH v2",
    address: "0x920D9BD936Da4eAFb5E25c6bDC9f6CB528953F9f".toLowerCase(),
    type: 1,
  },
  {
    name: "cvxtricrypto2",
    address: "0x4EAeD76C3A388f4a841E9c765560BBe7B3E4B3A0".toLowerCase(),
    type: 1,
  },
  {
    name: "SHIB",
    address: "0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4".toLowerCase(),
    type: 1,
  },
  {
    name: "cvxrencrv",
    address: "0x35a0Dd182E4bCa59d5931eae13D0A2332fA30321".toLowerCase(),
    type: 1,
  },
  {
    name: "ALGD",
    address: "0xc1879bf24917ebE531FbAA20b0D05Da027B592ce".toLowerCase(),
    type: 1,
  },
  {
    name: "FTT",
    address: "0x9617b633EF905860D919b88E1d9d9a6191795341".toLowerCase(),
    type: 1,
  },
  {
    name: "sSPELL",
    address: "0x3410297D89dCDAf4072B805EFc1ef701Bb3dd9BF".toLowerCase(),
    type: 1,
  },
  {
    name: "cvx3pool",
    address: "0x257101F20cB7243E2c7129773eD5dBBcef8B34E0".toLowerCase(),
    type: 1,
  },
  {
    name: "SPELL",
    address: "0xCfc571f3203756319c231d3Bc643Cee807E74636".toLowerCase(),
    type: 2,
  },
  {
    name: "UST",
    address: "0x59e9082e068ddb27fc5ef1690f9a9f22b32e573f".toLowerCase(),
    type: 2,
  },
];
const FTM_CAULDRONS = [
  {
    name: "wFTM 3.5%",
    address: "0x8E45Af6743422e488aFAcDad842cE75A09eaEd34".toLowerCase(),
    type: 1,
  },
  {
    name: "wFTM 1.8%",
    address: "0xd4357d43545F793101b592bACaB89943DC89d11b".toLowerCase(),
    type: 1,
  },
  {
    name: "yvWFTM",
    address: "0xed745b045f9495B8bfC7b58eeA8E0d0597884e12".toLowerCase(),
    type: 1,
  },
];
const AVAX_CAULDRONS = [
  {
    name: "AVAX",
    address: "0x3CFEd0439aB822530b1fFBd19536d897EF30D2a2".toLowerCase(),
    type: 1,
  },
  {
    name: "wMEMO",
    address: "0x35fA7A723B3B39f15623Ff1Eb26D8701E7D6bB21".toLowerCase(),
    type: 1,
  },
  {
    name: "xJOE",
    address: "0x3b63f81Ad1fc724E44330b4cf5b5B6e355AD964B".toLowerCase(),
    type: 2,
  },
  {
    name: "USDC/AVAX JLP",
    address: "0x95cCe62C3eCD9A33090bBf8a9eAC50b699B54210".toLowerCase(),
    type: 2,
  },
  {
    name: "USDT/AVAX JLP",
    address: "0x0a1e6a80E93e62Bd0D3D3BFcF4c362C40FB1cF3D".toLowerCase(),
    type: 2,
  },
  {
    name: "MIM/AVAX JLP",
    address: "0x2450Bf8e625e98e14884355205af6F97E3E68d07".toLowerCase(),
    type: 2,
  },
  {
    name: "MIM/AVAX SLP",
    address: "0xAcc6821d0F368b02d223158F8aDA4824dA9f28E3".toLowerCase(),
    type: 2,
  },
];
const BSC_CAULDRONS = [
  {
    name: "CAKE",
    address: "0xF8049467F3A9D50176f4816b20cDdd9bB8a93319".toLowerCase(),
    type: 1,
  },
  {
    name: "BNB",
    address: "0x692CF15F80415D83E8c0e139cAbcDA67fcc12C90".toLowerCase(),
    type: 1,
  },
];
const ARBI_CAULDRONS = [
  {
    name: "wETH",
    address: "0xC89958B03A55B5de2221aCB25B58B89A000215E6".toLowerCase(),
    type: 1,
  },
];

export const getBorrowableMimsEthereum = async () => {
  console.log("-- ETHEREUM --");
  let borrowableMims = {
    chain: "Ethereum",
    cauldrons: [],
  };
  /*  const BentoBoxContractEthereum = new web3_eth.eth.Contract(
    BentoBoxABI,
    BENTO_BOX_ADDRESS_ETH
  ); */
  const DegenBoxContractEthereum = new web3_eth.eth.Contract(
    DegenBoxABI,
    DEGEN_BOX_ADDRESS_ETH
  );

  try {
    const block = await web3_eth.eth.getBlockNumber();
    for (let i = 0; i < ETH_CAULDRONS.length; i++) {
      const { name, address, type } = ETH_CAULDRONS[i];
      /*  if (type === 1) {
        const borrowableMIMs = await BentoBoxContractEthereum.methods
          .balanceOf(MIM_ADDRESS_ETH, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        /*  console.log(
          `borrowable1 MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        ); 
      } else { */
      const borrowableMIMs = await DegenBoxContractEthereum.methods
        .balanceOf(MIM_ADDRESS_ETH, address)
        .call(null, block);
      borrowableMims.cauldrons.push({
        name,
        borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
      });
      /*  console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        ); */

      /* } */
    }
    await redis.set(
      "byebyedai.borrowableMimsEthereum",
      JSON.stringify(borrowableMims)
    );
  } catch (error) {
    const cachedBorrowableMimsEthereum = await redis.get(
      "byebyedai.borrowableMimsEthereum"
    );
    if (cachedBorrowableMimsEthereum !== null) {
      borrowableMims = JSON.parse(cachedBorrowableMimsEthereum);
    }
    console.log("Error on Ethereum fetch : ", error);
  }
  console.log("\n");
  return borrowableMims;
};

export const getBorrowableMimsFantom = async () => {
  console.log("-- FANTOM --");
  let borrowableMims = {
    chain: "Fantom",
    cauldrons: [],
  };
  const BentoBoxContractFantom = new web3_ftm.eth.Contract(
    BentoBoxABI,
    BENTO_BOX_ADDRESS_FTM
  );
  const DegenBoxContractFantom = new web3_eth.eth.Contract(
    DegenBoxABI,
    DEGEN_BOX_ADDRESS_FTM
  );
  try {
    for (let i = 0; i < FTM_CAULDRONS.length; i++) {
      const block = await web3_ftm.eth.getBlockNumber();
      const { name, address, type } = FTM_CAULDRONS[i];
      if (type === 1) {
        const borrowableMIMs = await BentoBoxContractFantom.methods
          .balanceOf(MIM_ADDRESS_FTM, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      } else {
        const borrowableMIMs = await DegenBoxContractFantom.methods
          .balanceOf(MIM_ADDRESS_FTM, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      }
    }
    await redis.set(
      "byebyedai.borrowableMimsFantom",
      JSON.stringify(borrowableMims)
    );
  } catch (error) {
    const cachedBorrowableMimsFantom = await redis.get(
      "byebyedai.borrowableMimsFantom"
    );
    if (cachedBorrowableMimsFantom !== null) {
      borrowableMims = JSON.parse(cachedBorrowableMimsFantom);
    }
    console.log("Error on Fantom fetch : ", error);
  }
  console.log("\n");
  return borrowableMims;
};

export const getBorrowableMimsAvalanche = async () => {
  console.log("-- AVALANCHE --");
  let borrowableMims = {
    chain: "Avalanche",
    cauldrons: [],
  };
  const BentoBoxContractAvalanche = new web3_avax.eth.Contract(
    BentoBoxABI,
    BENTO_BOX_ADDRESS_AVAX
  );

  const DegenBoxContractAvalanche = new web3_avax.eth.Contract(
    DegenBoxABI,
    DEGEN_BOX_ADDRESS_AVAX
  );
  try {
    const block = await web3_avax.eth.getBlockNumber();
    for (let i = 0; i < AVAX_CAULDRONS.length; i++) {
      const { name, address, type } = AVAX_CAULDRONS[i];
      if (type === 1) {
        const borrowableMIMs = await BentoBoxContractAvalanche.methods
          .balanceOf(MIM_ADDRESS_AVAX, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      } else {
        const borrowableMIMs = await DegenBoxContractAvalanche.methods
          .balanceOf(MIM_ADDRESS_AVAX, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      }
    }
    await redis.set(
      "byebyedai.borrowableMimsAvalanche",
      JSON.stringify(borrowableMims)
    );
  } catch (error) {
    const cachedBorrowableMimsAvalanche = await redis.get(
      "byebyedai.borrowableMimsAvalanche"
    );
    if (cachedBorrowableMimsAvalanche !== null) {
      borrowableMims = JSON.parse(cachedBorrowableMimsAvalanche);
    }
    console.log("Error on Avalanche fetch : ", error);
  }
  console.log("\n");
  return borrowableMims;
};

export const getBorrowableMimsBinance = async () => {
  console.log("-- Binance --");
  let borrowableMims = {
    chain: "Binance Smart Chain",
    cauldrons: [],
  };
  const BentoBoxContractBinance = new web3_bsc.eth.Contract(
    BentoBoxABI,
    BENTO_BOX_ADDRESS_BSC
  );
  const DegenBoxContractBinance = new web3_bsc.eth.Contract(
    DegenBoxABI,
    DEGEN_BOX_ADDRESS_BSC
  );
  try {
    const block = await web3_bsc.eth.getBlockNumber();
    for (let i = 0; i < BSC_CAULDRONS.length; i++) {
      const { name, address, type } = BSC_CAULDRONS[i];
      if (type === 1) {
        const borrowableMIMs = await BentoBoxContractBinance.methods
          .balanceOf(MIM_ADDRESS_BSC, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      } else {
        const borrowableMIMs = await DegenBoxContractBinance.methods
          .balanceOf(MIM_ADDRESS_BSC, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      }
    }
    await redis.set(
      "byebyedai.borrowableMimsBinance",
      JSON.stringify(borrowableMims)
    );
  } catch (error) {
    const cachedBorrowableMimsBinance = await redis.get(
      "byebyedai.borrowableMimsBinance"
    );
    if (cachedBorrowableMimsBinance !== null) {
      borrowableMims = JSON.parse(cachedBorrowableMimsBinance);
    }
    console.log("Error on BSC fetch : ", error);
  }
  console.log("\n");
  return borrowableMims;
};

export const getBorrowableMimsArbitrum = async () => {
  console.log("-- Arbitrum --");
  let borrowableMims = {
    chain: "Arbitrum",
    cauldrons: [],
  };
  const BentoBoxContractArbitrum = new web3_arbi.eth.Contract(
    BentoBoxABI,
    BENTO_BOX_ADDRESS_ARBI
  );
  const DegenBoxContractArbitrum = new web3_bsc.eth.Contract(
    DegenBoxABI,
    DEGEN_BOX_ADDRESS_BSC
  );
  try {
    const block = await web3_arbi.eth.getBlockNumber();
    for (let i = 0; i < ARBI_CAULDRONS.length; i++) {
      const { name, address, type } = ARBI_CAULDRONS[i];
      if (type === 1) {
        const borrowableMIMs = await BentoBoxContractArbitrum.methods
          .balanceOf(MIM_ADDRESS_ARBI, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      } else {
        const borrowableMIMs = await DegenBoxContractBinance.methods
          .balanceOf(MIM_ADDRESS_BSC, address)
          .call(null, block);
        borrowableMims.cauldrons.push({
          name,
          borrowableMIMs: parseInt(Web3.utils.fromWei(borrowableMIMs)),
        });
        console.log(
          `borrowable MIMs for ${name} : `,
          new Intl.NumberFormat("de-DE").format(
            Web3.utils.fromWei(borrowableMIMs)
          )
        );
      }
    }
    await redis.set(
      "byebyedai.borrowableMimsArbitrum",
      JSON.stringify(borrowableMims)
    );
  } catch (error) {
    const cachedBorrowableMimsArbitrum = await redis.get(
      "byebyedai.borrowableMimsArbitrum"
    );
    if (cachedBorrowableMimsArbitrum !== null) {
      borrowableMims = JSON.parse(cachedBorrowableMimsArbitrum);
    }
    console.log("Error on Arbitrum fetch : ", error);
  }
  console.log("\n");
  return borrowableMims;
};
