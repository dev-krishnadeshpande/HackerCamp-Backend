const fastify = require('fastify')({ logger: true });
const app = require('./app');
const connectToDB = require('./config/dbConfig');
const { PORT } = require('./config/serverConfig');
const { EVALUATION_QUEUE } = require('./utils/constants');
const EvaluationWorker = require('./workers/EvaluationWorker');

fastify.register(app);

fastify.listen({ port: PORT }, function () {
  try {
    connectToDB();
    EvaluationWorker(EVALUATION_QUEUE);
  }
  catch (error) {
    console.error('error', error);
  }
})

