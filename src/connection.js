// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");
const config = require("../config")

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(config.token, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
module.exports = client;