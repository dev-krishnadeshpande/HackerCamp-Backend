const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');
const { EVALUATION_JOB } = require('../utils/constants');
const SubmissionRepository = require('../repository/SubmissionRepository');
const { SOCKET_SERVER_URL } = require('../config/serverConfig');

function evaluationWorker(queueName) {
  const submissionRepository = new SubmissionRepository();

  new Worker(queueName,
    async job => {
      if (job.name === EVALUATION_JOB) {
        try {
          await submissionRepository.updateSubmission(job.data);
          const response = await axios.post(`${SOCKET_SERVER_URL}/sendPayload`, {
            payload: job.data
          });
        }
        catch (error) {
          console.error(error.code);
        }
      }
    }, {
    connection: redisConnection,
  });

}

module.exports = evaluationWorker;