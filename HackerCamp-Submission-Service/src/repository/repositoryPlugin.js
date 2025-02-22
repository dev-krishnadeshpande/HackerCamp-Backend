const fastifyPlugin = require('fastify-plugin');

const SubmissionRepository = require('./SubmissionRepository');

async function submissionRepository(fastify, options) {
  const repo = new SubmissionRepository();
  fastify.decorate('repo', repo);
}

module.exports = fastifyPlugin(submissionRepository);