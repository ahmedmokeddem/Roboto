const { WebClient } = require("@slack/web-api");
require("dotenv/config");
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

const handleMoneyraisemoney = async(app) => {
    // get a list of all the members include admin and bots
    var { members } = await web.users.list();

    // filter the members and return the list a real users only with without admin and bots
    members = members.filter((member) => {
        return (
            member.is_admin === false &&
            member.is_bot === false &&
            member.is_email_confirmed === true
        );
    });

    // Handle a view_submission event
    app.view("Raise_money", async({ ack, body, view, client }) => {
        // Acknowledge the view_submission event
        await ack();
        var money_value = view["state"]["values"]["money_value"]["money_value-action"];
        console.log(money_value);
        // send a confirmation message to admin
        await web.chat.postMessage({
            channel: body.user.id,
            text: "The money value is set!",
        });
    });
};

module.exports = { handleMoneyraisemoney };

// WORKING ON IT