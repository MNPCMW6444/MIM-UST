import { createClient } from "redis";
import fetch from "node-fetch";
import config from "../config.js";
import { getFeesForProtocol } from "../utils.js";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

const generateMakerFees = async () => {
  const response = await fetch(`${config.cryptoFeesApiUrl}/fees`, {
    method: "GET",
  });
  const jsonResponse = await response.json();
  const makerFees = getFeesForProtocol(jsonResponse.protocols, "maker");
  await redis.set("byebyedai.makerFees", `${makerFees}`);
};

await generateMakerFees();
process.exit(0);
