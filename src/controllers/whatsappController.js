const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const VerifyToken = (req, res) => {
  try {
    let accessToken =
      "EAAIvPYSLqTIBAOAq7IoKaq1mN20nsYZC5mRBc0DeyGGI3bdr9o6OPncZAdYVUZB5ZCK8IG4JZCksvZCGNoz7XJmJZAz3aEBYYUmAbIqnZBOFLNUXwS8TfoEBlZACNXfpcfETEXw1Gja4jdGbBFcsMyhkOJ3SOE08gXQnMpYeSSdDz3RImCmnToZCnC1lNl0f8DD6eZCDzIDBYKG2WcX4bYxucUn2IsE6uvWrxsZD";
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
    let message = messageObject[0];
    let text = GetTextUser();
    res.send("EVENT_RECEIVED");
  } catch (error) {
    myConsole.log(error);
    res.send("EVENT_RECEIVED");
  }
};
const GetTextUser = (message) => {
  let text = "";
  let typeMessage = message["type"];
  if (typeMessage == "text") {
    text = message["text"]["body"];
  } else if (typeMessage == "interactive") {
    let interactiveObject = message["interactive"];
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
