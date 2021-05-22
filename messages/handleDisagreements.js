const handleDisagreements = async(event, say)=>{

    await say({
      
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `I am sorry to know that <@${event.user}>. Do not worry disagreements are a normal process to come up with new ideas in any team. When you handle your disagreements responsibly you might come up with brilliant solutions and ideas! 😍 So cheer up it's all part of the game ! ☺ ` ,
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Here are some great articles that can help you resolve this disagreement 😉 "
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "<https://www.inc.com/lolly-daskal/7-simple-ways-to-deal-with-a-disagreement-effectively.html|7 Simple Ways to Deal With a Disagreement Effectively>"
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "<https://hbr.org/2017/07/how-to-handle-a-disagreement-on-your-team|How to Handle a Disagreement on Your Team >"
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "<https://blink.ucsd.edu/HR/supervising/conflict/handle.html|How to Handle Conflict in the Workplace>"
            }
          }
        ]
      

    })
  }

module.exports = { handleDisagreements };
