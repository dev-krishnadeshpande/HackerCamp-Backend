const submissionQueue = require('../queue/submissionQueue');

module.exports = async function (name, payload) {
  const job = await submissionQueue.add(name, payload);

  return job;
}
