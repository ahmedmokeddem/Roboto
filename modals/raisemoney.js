const { admin_id } = require("../constants/constants");

const raisemoney = async(app) => {
    var id = await admin_id;
    app.command("/setmoneyvalue", async({ ack, body, client, say }) => {
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
                        "type": "modal",
                        "title": {
                            "type": "plain_text",
                            "text": "Enter a new money value",
                            "emoji": true
                        },
                        "submit": {
                            "type": "plain_text",
                            "text": "Submit",
                            "emoji": true
                        },
                        "close": {
                            "type": "plain_text",
                            "text": "Cancel",
                            "emoji": true
                        },
                        "blocks": [{
                            "type": "input",
                            "element": {
                                "type": "plain_text_input",
                                "action_id": "plain_text_input-action"
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "Please, enter here the money value:",
                                "emoji": true
                            }
                        }]
                    },
                });
            } catch (error) {
                console.error(error);
            }
        }
    });
};

module.exports = { raisemoney };