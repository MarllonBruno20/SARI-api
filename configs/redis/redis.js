const Redis = require("ioredis");
const config = require("./redisConfig");

const redisClient = new Redis(config);

module.exports = { redisClient };
