const { dotenv } = require("dotenv");
require("dotenv").config();

const { getAccessToken, sendPushNotification } = require("../helper/helper");
const { FCM_URL, PROJECT_PATH, SERVICE_ACCOUNT_PATH } = process.env;

exports.sendMessageToOne = async (req, res) => {
  // Get the device token, title, and message from the request parameters
  const title = req.params.title;
  const message = req.params.message;
  const deviceToken = req.params.deviceToken;
  try {
    //get the OAuth 2.0 access token
    const token = await getAccessToken().then(res);

    await sendPushNotification(
      FCM_URL,
      token,
      deviceToken,
      title,
      message
    ).then(async (result) => {
      //notification sent is successful
      if (result.statusText === "OK") {
        res.send("Hooray! Message sent.");
      } else {
        res.send({
          message: "Error in sending push notification:",
          code: 502,
        });
      }
    });
  } catch (error) {
    console.error("Error in sending push notification:", error.message);
    res.send("Error in sending push notification:", error.message);
  }
};

exports.sendMessageToAll = async (req, res) => {
  const title = req.params.title;
  const message = req.params.message;
  const deviceTokens = req.params.deviceTokens.split(";");
  let msg;
  try {
    //get the OAuth 2.0 access token
    const token = await getAccessToken().then(res);

    deviceTokens.forEach(async (deviceToken) => {
      await sendPushNotification(
        FCM_URL,
        token,
        deviceToken,
        title,
        message
      ).then(async (result) => {
        console.log("results", result);

        //notification sent is successful
        if (result.statusText === "OK") {
          console.log("Hooray! Message sent.");
          msg = { message: "Hooray! Message sent." };
        } else {
          res.send({
            message: "Error in sending push notification:",
            code: 502,
          });
        }
      });
    });
    res.send(msg.message);
  } catch (error) {
    console.error("Error in sending push notification:", error);
    res.send("Error in sending push notification:", error.message);
  }
};
