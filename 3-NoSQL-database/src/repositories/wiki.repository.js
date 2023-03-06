const redis = require('redis');
console.log('da');
const bluebird = require('bluebird');


const redisClient = redis.createClient({
  port: process.env.REDIS_PORT
});

redisClient.on("ready", () => {
  console.log('redis have ready !')
});

redisClient.on('connect', () => console.log(`Redis is connected on port ${process.env.REDIS_PORT}`))

redisClient.on('error', (err) => {
  console.error(err);
});

class WikiRepository {
  async hasTopic(topicName) {
    try {
      return await redisClient.existsAsync(topicName);
    } catch (error) {
      console.error(error);
    }
  }

  async getTopic(topicName) {
    try {
      return JSON.parse(await redisClient.getAsync(topicName));
    } catch (error) {
      console.error(error);
    }
  }

  async setTopic(topicName, data) {
    try {
      return await redisClient.setAsync(topicName, JSON.stringify(data));

    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new WikiRepository();
