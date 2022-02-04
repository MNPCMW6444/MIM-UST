import moment from "moment";
import fetch from "node-fetch";
import { createClient } from "redis";
import config from "../config.js";
import { getCauldronsWeeklyFees } from "../feesCalculator/spellFees.js";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

async function populateOnSync() {
  const currentSyncDate = await redis.get("byebyedai.lastSyncDate");
  const responseSyncDate = await fetch(
    `${config.abracadabraApiUrl}/health/status`,
    {
      method: "GET",
    }
  );
  const jsonSyncDate = await responseSyncDate.json();
  const lastSyncDate = jsonSyncDate.lastSync;
  if (
    currentSyncDate === null ||
    lastSyncDate !== JSON.parse(currentSyncDate) ||
    moment(JSON.parse(currentSyncDate)).isBefore(moment().subtract(1, "h"))
  ) {
    await redis.set("byebyedai.lastSyncDate", JSON.stringify(lastSyncDate));
    await getCauldronsWeeklyFees();
  } else {
    await redis.set(
      "byebyedai.lastSyncDate",
      JSON.stringify(moment().format())
    );
    await getCauldronsWeeklyFees();
  }
}

await populateOnSync();
process.exit(0);
