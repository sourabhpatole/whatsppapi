const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const VerifyToken = (req, res) => {
  try {
    let accessToken =
      "EAAIvPYSLqTIBABqHBFIrq2Nb8OmJZBY8tCZCSqZCZAt8uZBgZAlqsJ7oTuyZCfMKR2xoNXRlVButNXiMUEusPupPs2YeWLB4i1hZAaRL8uZCusDfmrygmSiZBfho8UpSyKSmwScqiHfZA5twiGR6gyo7fYLw1DZAZBfX7bwgmAfZAgNLMWdBE3No5WZCWgdJRkTFr4p05ZBotErRYFuPfQZDZD";
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (challenge != null && token != null && token == accessToken) {
      res.send(challenge);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(400).send();
  }
  res.send("Hello verify token");
};

const ReceiveMessage = (req, res) => {
  // res.send("Hello receive message");
  try {
    let entry = req.body["entry"][0];
    let changes = entry["changes"][0];
    let value = changes["value"];
    let messageObject = value["messages"];
    myConsole.log(messageObject);
    res.send("EVENT_RECEIVED");
  } catch (error) {
    myConsole.log(messageObject);
    res.send("EVENT_RECEIVED");
  }
};
module.exports = { ReceiveMessage, VerifyToken };
