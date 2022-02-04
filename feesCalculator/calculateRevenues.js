import { createClient } from "redis";
import moment from "moment";
import fetch from "node-fetch";
import config from "../config.js";

let redis = null;

(async () => {
  redis = createClient();

  redis.on("error", (err) => console.log("Redis Client Error", err));

  await redis.connect();
})();

export const calculateRevenues = async () => {
  const lastWeekEmissionsAmount = await redis.get(
    "byebyedai.lastWeekEmissionsAmount"
  );
  const currentWeekEmissionsAmount = await redis.get(
    "byebyedai.currentWeekEmissionsAmount"
  );
  const currentWeekEmissionsStartDate = await redis.get(
    "byebyedai.currentWeekEmissionsStartDate"
  );

  const emissionsPerHourLastWeek = parseInt(lastWeekEmissionsAmount) / 168;
  const emissionsPerHourCurrentWeek =
    parseInt(currentWeekEmissionsAmount) / 168;
  const responseToken = await fetch(
    `${config.coingeckoApiUrl}/coins/spell-token`
  );

  const datasToken = await responseToken.json();
  const tokenPrice = datasToken.market_data.current_price.usd;

  let totalEmissionsLastSevenDaysUSD = 0;

  for (let i = 168; i > 0; i--) {
    const date = moment().subtract(i, "h");
    if (moment(date).isBefore(moment(currentWeekEmissionsStartDate))) {
      const emissionsUSD = parseInt(emissionsPerHourLastWeek * tokenPrice);
      totalEmissionsLastSevenDaysUSD += emissionsUSD;
    } else {
      const emissionsUSD = parseInt(emissionsPerHourCurrentWeek * tokenPrice);
      totalEmissionsLastSevenDaysUSD += emissionsUSD;
    }
  }
  console.log("Set emissions : ", totalEmissionsLastSevenDaysUSD, " $");
  await redis.set(
    "byebyedai.totalEmissionsLastSevenDaysUSD",
    JSON.stringify(totalEmissionsLastSevenDaysUSD)
  );
};

await calculateRevenues();
process.exit(0);
