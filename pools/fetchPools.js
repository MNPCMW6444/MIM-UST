import fetch from "node-fetch";
import { createClient } from "redis";
import config from "../config.js";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

async function fetchPools() {
  let pools = [];
  const response = await fetch(`${config.abracadabraApiUrl}/pools`, {
    method: "GET",
  });
  const jsonResponse = await response.json();
  pools = jsonResponse.pools;
  await redis.set("byebyedai.poolsList", JSON.stringify(pools));
}

await fetchPools();
process.exit(0);
