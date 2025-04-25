const express = require("express");
const router = express.Router();

const controller = require("../controller/controller");

//Define routes
router.get(
  "/sendMessageToOne/:title/:message/:deviceToken",
  controller.sendMessageToOne
);

router.get(
  "/sendMessageToAll/:title/:message/:deviceTokens",
  controller.sendMessageToAll
);

module.exports = router;
