const {sendRandomMotivationLink} = require('../constants/constants');

const motivationArticle = async (event, say) => {
  console.log(sendRandomMotivationLink())
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `I'm sorry to hear that <@${event.user}> let me try to help you 😇 : `,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Here is an article to help you 🗞: <${sendRandomMotivationLink().randomMotivLink}>`,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `And here is a beautiful music to help you relax 🎼: <${sendRandomMotivationLink().randomMusicLink}>`,
        },
      },
    ],
  });
};

module.exports = { motivationArticle };