import moment from "moment";
import { createClient } from "redis";

import fetch from "node-fetch";
import Web3 from "web3";
import config from "../config.js";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

export async function getCauldronsWeeklyFees() {
  const storedPools = await redis.get("byebyedai.poolsList");
  const pools = JSON.parse(storedPools);
  const storedLastSyncDate = await redis.get("byebyedai.lastSyncDate");
  const lastSyncDate = JSON.parse(storedLastSyncDate);
  const responseFees = await fetch(
    `${config.abracadabraApiUrl}/statistic/fees-earned`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: {
          from: moment(lastSyncDate).subtract(7, "d").toISOString(),
          to: moment(lastSyncDate).toISOString(),
        },
      }),
    }
  );
  const jsonResponseFees = await responseFees.json();
  const totalFeesEarned = Web3.utils.fromWei(jsonResponseFees.totalFeesEarned);

  const cauldronsFeesArray = jsonResponseFees.pools.map((pool) => {
    const storedPool = pools.find((item) => item.address === pool.address);
    return {
      ...storedPool,
      fees: `${Web3.utils.fromWei(pool.feesEarned)}`,
    };
  });
  console.log("Total fees updated : ", totalFeesEarned, "$");
  await redis.set("byebyedai.totalSpellFees", `${totalFeesEarned}`);
  await redis.set(
    "byebyedai.cauldronsArray",
    JSON.stringify(cauldronsFeesArray)
  );
}
