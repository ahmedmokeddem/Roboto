const { admin_id } = require("../constants/constants");

const weeklyCheckModal = async (app) => {
  var id = await admin_id;

  app.command("/setweeklycheck", async ({ ack, body, client, say }) => {
    // Acknowledge the command request
    await ack();

    if (id != body.user_id) {
      await say(`Sorry <@${body.user_id}> only owner can use this command`);
    } else {
      try {
        const result = await client.views.open({
          token: process.env.SLACK_BOT_TOKEN,
          trigger_id: body.trigger_id,
          view: {
            type: "modal",
            callback_id: "weekly-check",
            title: {
              type: "plain_text",
              text: "Set Weekly Check",
              emoji: true,
            },
            submit: {
              type: "plain_text",
              text: "Submit",
              emoji: true,
            },
            close: {
              type: "plain_text",
              text: "Cancel",
              emoji: true,
            },
            blocks: [
              {
                type: "input",
                block_id: "day",
                element: {
                  type: "static_select",
                  placeholder: {
                    type: "plain_text",
                    text: "Select an Day",
                    emoji: true,
                  },
                  options: [
                    {
                      text: {
                        type: "plain_text",
                        text: "Sunday",
                        emoji: true,
                      },
                      value: "0",
                    },
                    {
                      text: {
                        type: "plain_text",
                        text: "Monday",
                        emoji: true,
                      },
                      value: "1",
                    },
                    {
                      text: {
                        type: "plain_text",
                        text: "Tuesday",
                        emoji: true,
                      },
                      value: "2",
                    },
                    {
                      text: {
                        type: "plain_text",
                        text: "Wednesday",
                        emoji: true,
                      },
                      value: "3",
                    },
                    {
                      text: {
                        type: "plain_text",
                        text: "Thurday",
                        emoji: true,
                      },
                      value: "4",
                    },
                    {
                      text: {
                        type: "plain_text",
                        text: "Friday",
                        emoji: true,
                      },
                      value: "5",
                    },
                    {
                      text: {
                        type: "plain_text",
                        text: "Saturday",
                        emoji: true,
                      },
                      value: "6",
                    },
                  ],
                  action_id: "day-action",
                },
                label: {
                  type: "plain_text",
                  text: "Pick a day",
                  emoji: true,
                },
              },
              {
                type: "input",
                block_id: "time",
                element: {
                  type: "timepicker",
                  initial_time: "18:00",
                  placeholder: {
                    type: "plain_text",
                    text: "Select time",
                    emoji: true,
                  },
                  action_id: "time-action",
                },
                label: {
                  type: "plain_text",
                  text: "Pick a time",
                  emoji: true,
                },
              },
              {
                type: "input",
                block_id: "text",
                element: {
                  type: "plain_text_input",
                  multiline: true,
                  action_id: "text-action",
                },
                label: {
                  type: "plain_text",
                  text: "Write the list of tasks to check",
                  emoji: true,
                },
              },
            ],
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
};

module.exports = { weeklyCheckModal };
