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
  res.send("Hello receive message");
};
module.exports = { ReceiveMessage, VerifyToken };
