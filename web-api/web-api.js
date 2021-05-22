const { WebClient } = require("@slack/web-api");
require("dotenv/config");
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

const asyncFunc = async () => {
  // send a message directly in the channel general without any event
  const result = await web.chat.postMessage({
    channel: "yasser.belatreche0",
    text: "Hello,World!",
  });
  console.log(result);
};

asyncFunc();
