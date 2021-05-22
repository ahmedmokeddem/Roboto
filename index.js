const { App } = require("@slack/bolt");
const { handleActions } = require("./actions/actions");
const { handleMessages } = require("./messages/messages");
const { weeklyCheckModal } = require("./modals/weeklyCheckModal");
const { handleScheduleMessage } = require("./messages/scheduledMessage");
require("dotenv/config");

const app = new App({
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const launch = () => {
  app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
};

launch();

handleMessages(app);
weeklyCheckModal(app);
handleScheduleMessage(app);
handleActions(app);
