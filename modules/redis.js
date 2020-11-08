const redis = require("redis");
const client = redis.createClient();

function getHash(key) {
  return new Promise((resolve, reject) => {
    client.hgetall(key, function (err, object) {
      if (err) {
        reject(err);
      }
      resolve(object);
    });
  });
}

function setHash(id, key, value) {
  client.hmset(id, key, JSON.stringify(value));
}

module.exports = {
  setHash,
  getHash,
};
