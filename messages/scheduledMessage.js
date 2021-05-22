const { WebClient } = require("@slack/web-api");
require("dotenv/config");
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

const handleScheduleMessage = async (app) => {
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
  app.view("weekly-check", async ({ ack, body, view, client }) => {
    // Acknowledge the view_submission event
    await ack();

    // get the day as a number from 0 to 6
    var day = view["state"]["values"]["day"]["day-action"];
    day = day.selected_option.value;

    // get the time as a string
    var time = view["state"]["values"]["time"]["time-action"];
    time = time.selected_time;
    // get the houre and the minute
    time = time.split(":");
    const timeInHoure = Number(time[0]);
    const timeInMinute = Number(time[1]);

    // get the text as a string
    var text = view["state"]["values"]["text"]["text-action"];
    text = text.value;

    const today = new Date();
    const dayOfTheWeek = today.getDay();

    var dateOfTheSendingMessage = new Date();

    // test if the given day is passed in that week or not and set the date based on that
    const diff = day - dayOfTheWeek;
    if (diff >= 0) {
      // that's mean the day is comming (when we compare it to the number of the day 0-6)
      dateOfTheSendingMessage.setDate(today.getDate() + diff);
    } else {
      // that mean the day is passed (when we compare it to the number of the day 0-6)
      dateOfTheSendingMessage.setDate(7 + today.getDate() + diff);
    }
    dateOfTheSendingMessage.setHours(timeInHoure + 1, timeInMinute, 0, 0);

    // send a message directly in the to all users every time the  come
    members.forEach((member) => {
      var timesExcuted = 0;

      const scheduleMessage = async () => {
        //update the sending time each week in s
        dateOfTheSendingMessage =
          (dateOfTheSendingMessage.getTime() + timesExcuted * 604800000) / 1000; // 604800:number of seconds in a week

        try {
          const result = await web.chat.scheduleMessage({
            channel: member.id,
            text: text,
            as_user: true,
            // Time to post message, in Unix Epoch timestamp format
            post_at: dateOfTheSendingMessage - 3600, //we set it to our time zone
          });

          console.log(result);
          timesExcuted++;
        } catch (error) {
          console.log(error);
        }
      };

      scheduleMessage();
      setInterval(scheduleMessage, 604800000);
    });

    // send a confirmation message to admin
    await web.chat.postMessage({
      channel: body.user.id,
      text: "Your schedule message is set",
    });
  });
};

module.exports = { handleScheduleMessage };

// WORKING ON IT
