const mongoose = require('mongoose');
const { DB_CONNECTION, NODE_ENV } = require('./serverConfig');

async function connectToDB() {
  try {
    if (NODE_ENV == 'development') {
      await mongoose.connect(DB_CONNECTION);
      console.log("MongoDB server is connected")
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDB;