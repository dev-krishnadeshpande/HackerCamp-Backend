const v1Router = require("./v1/v1Router");

async function apiRouter(fastify, options) {
  fastify.register(v1Router, { prefix: '/v1' });
}

module.exports = apiRouter;