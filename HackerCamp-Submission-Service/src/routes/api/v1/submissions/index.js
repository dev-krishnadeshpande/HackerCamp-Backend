const createSubmission = require('../../../../controllers/submissionController');

async function submissionRouter(fastify, options) {
  fastify.post('/', createSubmission);
}

module.exports = submissionRouter;