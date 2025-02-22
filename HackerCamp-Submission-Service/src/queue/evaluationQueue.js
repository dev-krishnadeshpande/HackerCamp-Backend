const { Queue } = require('bullmq');
const redisConnection = require('../config/redisConfig');

const { EVALUATION_QUEUE } = require('../utils/constants');;

export default new Queue(EVALUATION_QUEUE, { connection: redisConnection });