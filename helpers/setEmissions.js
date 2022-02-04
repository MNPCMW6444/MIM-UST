import { createClient } from "redis";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

const setEmissions = async () => {
  const lastWeekAmount = 300000000;
  const currentWeekAmount = 270000000;
  const currentWeekStartDate = "2022-01-16T14:00:00";
  await redis.set(
    "byebyedai.lastWeekEmissionsAmount",
    JSON.stringify(lastWeekAmount)
  );
  await redis.set(
    "byebyedai.currentWeekEmissionsAmount",
    JSON.stringify(currentWeekAmount)
  );
  await redis.set(
    "byebyedai.currentWeekEmissionsStartDate",
    currentWeekStartDate
  );
  console.log("Set last week amount : ", lastWeekAmount, " SPELL");
  console.log("Set current week amount : ", currentWeekAmount, " SPELL");
  console.log("Set current week date : ", currentWeekStartDate);
};

await setEmissions();
process.exit(0);
