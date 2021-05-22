const { jokes } = require("./jokes");
const { advices } = require("./advices");
const { motivationArticle } = require("./motivationArticles");
const { handleDisagreements } = require("./handleDisagreements");


// hendle messages
const handleMessages = async (app) => {
  // reply when the user tag him
  app.event("app_mention", async ({ event, say, message }) => {
    const salutationWords = /(hi|hey|hello)/g;
    const motivateNeedWords = /(not good|tired|burned out)/g;
    const disagreementWords = /(disagree|disagreement|conflict|fight|disagreements|conflicts|disagreed)/g;
    const jokeWords = /joke/g;
    const adviceWords = /advice/g;
    const isAnySalutationWordExist = salutationWords.test(event.text);
    const isAnyMotivateNeedWordsExist = motivateNeedWords.test(event.text);
    const isAnyDisagreementWordsExist = disagreementWords.test(event.text);
    const isAnyJokeWordsExist = jokeWords.test(event.text);
    const isAnyAdviceWordsExist = adviceWords.test(event.text);

    if (isAnySalutationWordExist) {
      await say(
        `Hi there! <@${event.user}> I hope you're doing well, how can i help you?`
      );
      return;
    } else if (isAnyMotivateNeedWordsExist) {
      motivationArticle(event, say);
      return;
    } else if(isAnyDisagreementWordsExist){
      handleDisagreements(event, say)
      return;

    }else if (isAnyJokeWordsExist) {
      jokes(say);
      return;
    } else if (isAnyAdviceWordsExist) {
      advices(say);
      return;
    } else {
      await say(
                `Hi I'm Roboto a chat bot, here is what i can do:\n• Tell joke\n\n• Give advices \n\n• Schedule a weekly check (this for admin only)\n\n• Give you some motivation articles when you didn't feel good and a looot more`
            );
    }
    return;
  });
};

module.exports = { handleMessages };
