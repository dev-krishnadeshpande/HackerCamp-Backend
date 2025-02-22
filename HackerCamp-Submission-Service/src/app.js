const fastifyPlugin = require('fastify-plugin');

const apiRouter = require('./routes/api/apiRouter');
const repositoryPlugin = require('./repository/repositoryPlugin');
const servicePlugin = require('./services/servicePlugin');

async function app(fastify, options) {
  await fastify.register(repositoryPlugin);
  await fastify.register(servicePlugin);
  await fastify.register(apiRouter, { prefix: '/api' });
}

module.exports = fastifyPlugin(app);
