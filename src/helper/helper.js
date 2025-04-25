const { JWT } = require("google-auth-library");
const path = require("path");
const { dotenv } = require("dotenv");
require("dotenv").config();

const { PROJECT_PATH, EXTERNAL_PATH, SERVICE_ACCOUNT_PATH } = process.env;

// Path to  Firebase service account key JSON file
const serviceAccountPath = path.join(PROJECT_PATH, SERVICE_ACCOUNT_PATH);

// Initialize JWT client for OAuth 2.0
const client = new JWT({
  keyFile: serviceAccountPath, // Path to your service account JSON file
  scopes: ["https://www.googleapis.com/auth/firebase.messaging"], // FCM Scope
});

//Function to get the OAuth 2.0 access token
exports.getAccessToken = async () => {
  //return;
  //app.get("/getAccessToken", async (req, res) => {
  try {
    // The client will automatically refresh the token if needed
    const tokens = await client.authorize(); // Get OAuth 2.0 tokens
    //res.send(tokens.access_token); // Return the access token for use in the API request
    return tokens.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw new Error("Unable to obtain access token");
  }
};

exports.sendPushNotification = async (
  url,
  accessToken,
  deviceToken,
  title,
  message
) => {
  try {
    const notificationPayload = {
      message: {
        token: deviceToken,
        notification: {
          title: title,
          body: message,
        },
        android: {
          priority: "high",
        },
      },
    };

    // Send the HTTP POST request to FCM with the Authorization header containing the access token
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the OAuth 2.0 access token here
      },
      body: JSON.stringify(notificationPayload), // Send the notification payload as the request body
    });

    //console.log("response", response);

    //const responseData = await response.json();

    return response;

    //console.log(responseData);
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw new Error("Unable to send push notification");
  }
};
