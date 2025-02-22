const submissionRouter = require("./submissions");

async function v1Router(fastify, options) {
  fastify.register(submissionRouter, { prefix: '/submissions' });
}

module.exports = v1Router;