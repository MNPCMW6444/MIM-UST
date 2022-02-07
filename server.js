import express from "express";
import CacheService from "express-api-cache";
import {getBorrowableMimsEthereum} from ".;/borrowableMims";

import Twilio from "twilio";

const app = express();
const cache = CacheService.cache;
const minnininn = 30000000;
const accountSid = "ACb56542d282e469142290abbc1c21b238";
const authToken = "5e093feacc8d6afbc6471b70a641fa3d";
const client = new Twilio(accountSid, authToken);

app.set("port", process.env.PORT || 5000);
app
  .get("/", function (request, response) {
    var result = "App is running";
    response.send(result);
  })
  .listen(app.get("port"), async function () {
    console.log("Bot is Running");
    /* client.messages.create({
      body: "Bot is running! will check available MIM every 30 sconds and will notify if MIM>"+minnininn,
      from: "+14106715603",
      to: "+12312374619",})
      .then(message => console.log(message.sid)); */ 
  });

app.get(
  "/getBorrowableMims",
  cache("5 seconds"),
  async (req, res) => {
    let sum = 0;
    try {
      const borrwableEth = await getBorrowableMimsEthereum();
      console.log("done");
      let borrwableEth2 = borrwableEth.substring(2, borrwableEth.length - 1);
      borrwableEth2.split(".").join("");
      let checkedNew = borrwableEth2.split(".").join("");
      checkedNew = checkedNew.split(",").join(".");
      sum = parseFloat(checkedNew);
      console.log("There are "+sum+" MIMS, so "+(sum > minnininn? "SMS has been sent":"SMS has NOT been sent"));
      if (sum > minnininn) {
        /* client.messages
          .create({
            body:
              "There are " +
              sum +
              " MIMs!! checking again in 30 seconds and will alert if still >" + minnininn,
            from: "+14106715603",
            to: "+12312374619",
          })
          .then((message) => console.log(message.sid)); */
      }
    } catch (e) {
      console.log("A problem accoured, the folowing error was caught:");
      console.log(e);
    }
    res.json({ message:sum > minnininn? "SMS has been sent":"SMS has NOT been sent" });
  }
);
