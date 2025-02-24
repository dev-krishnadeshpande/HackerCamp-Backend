const mongoose = require('mongoose');
const { DB_CONNECTION, NODE_ENV, MONGO_URI } = require('./serverConfig');

async function connectToDB() {
  try {
    if (NODE_ENV == 'development') {
      await mongoose.connect(DB_CONNECTION);
      console.log("MongoDB server is connected")
    }
    else {
      await mongoose.connect(MONGO_URI);
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDB;