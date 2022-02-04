import fetch from "node-fetch";
import { createClient } from "redis";
import { AddressesByChain } from "../datas/AddressesByChain.js";
import config from "../config.js";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

async function getSpellHolders() {
  let holdersByChain = [];
  try {
    for (const chain of AddressesByChain) {
      const { chainId, chainName, spellAddress } = chain;
      const response = await fetch(
        `${config.covalentApiUrl}/${chainId}/tokens/${spellAddress}/token_holders/?key=${config.covalentApiKey}`,
        {
          method: "GET",
        }
      );
      const jsonResponse = await response.json();
      console.log(`json for SPELL chain ${chain} : `, jsonResponse);
      if (jsonResponse.data !== null) {
        holdersByChain.push({
          chainId,
          chainName,
          holders: jsonResponse.data.pagination.total_count,
        });
      }
    }
  } catch (error) {
    console.log("covalent error SPELL holders : ", error);
  }
  await redis.set(
    "byebyedai.spellHoldersArray",
    JSON.stringify(holdersByChain)
  );
}

async function getStakedSpellHolders() {
  let holdersByChain = [];
  try {
    for (const chain of AddressesByChain) {
      const { chainId, chainName, sSpellAddress } = chain;
      if (sSpellAddress !== null) {
        const response = await fetch(
          `${config.covalentApiUrl}/${chainId}/tokens/${sSpellAddress}/token_holders/?key=${config.covalentApiKey}`,
          {
            method: "GET",
          }
        );
        const jsonResponse = await response.json();
        console.log(`json for sSPELL chain ${chain} : `, jsonResponse);
        if (jsonResponse.data !== null) {
          holdersByChain.push({
            chainId,
            chainName,
            holders: jsonResponse.data.pagination.total_count,
          });
        }
      }
    }
  } catch (error) {
    console.log("covalent error sSPELL holders : ", error);
  }
  await redis.set(
    "byebyedai.stakedSpellHoldersArray",
    JSON.stringify(holdersByChain)
  );
}
async function getMkrHolders() {
  let holdersByChain = [];
  try {
    for (const chain of AddressesByChain) {
      const { chainId, chainName, mkrAddress } = chain;
      if (mkrAddress !== null) {
        const response = await fetch(
          `${config.covalentApiUrl}/${chainId}/tokens/${mkrAddress}/token_holders/?key=${config.covalentApiKey}`,
          {
            method: "GET",
          }
        );
        const jsonResponse = await response.json();
        console.log(`json for MKR chain ${chain} : `, jsonResponse);
        if (jsonResponse.data !== null) {
          holdersByChain.push({
            chainId,
            chainName,
            holders: jsonResponse.data.pagination.total_count,
          });
        }
      }
    }
  } catch (error) {
    console.log("covalent error MKR holders : ", error);
  }
  await redis.set("byebyedai.mkrHoldersArray", JSON.stringify(holdersByChain));
}

await getSpellHolders();
await getStakedSpellHolders();
await getMkrHolders();
process.exit(0);
