const { fetchJokes } = require("../constants/constants");

const jokes = async (say) => {
  const { joke, answer } = await fetchJokes();
  say({ text: `${joke} \n \n${answer}` });
};

module.exports = { jokes };
