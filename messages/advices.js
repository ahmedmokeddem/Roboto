const { fetchAdvice } = require("../constants/constants");

const advices = async (say) => {
  say({ text: await fetchAdvice() });
};

module.exports = { advices };
