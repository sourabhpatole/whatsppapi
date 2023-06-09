const fs = require("fs");
require("dotenv").config();
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const VerifyToken = (req, res) => {
  try {
    let accessToken = process.env.TOKEN;

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
  try {
    let entry = req.body["entry"][0];
    let changes = entry["changes"][0];
    let value = changes["value"];
    let messageObject = value["messages"];
    // myConsole.log(messageObject);
    let messages = messageObject[0];
    let text = GetTextUser(messages);
    res.send("EVENT_RECEIVED");
  } catch (error) {
    myConsole.log(error);
    res.send("EVENT_RECEIVED");
  }
};
const GetTextUser = (messages) => {
  let text = "";
  let typeMessage = messages["type"];
  if (typeMessage == "text") {
    text = messages["text"]["body"];
  } else if (typeMessage == "interactive") {
    let interactiveObject = messages["interactive"];
    let typeInteractive = interactiveObject["type"];
    if (typeInteractive == "button_replay") {
      text = interactiveObject["button_replay"]["title"];
    } else if (typeMessage == "list_replay") {
      text = interactiveObject["list_replay"]["title"];
    } else {
      console.log("No Message");
    }
  } else {
    console.log("No Message");
  }
  return text;
};
module.exports = { ReceiveMessage, VerifyToken };
