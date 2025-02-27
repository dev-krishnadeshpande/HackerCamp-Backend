const mongoose = require('mongoose');
const { DB_CONNECTION } = require('./serverConfig');

async function connectToDB() {
  try {
    await mongoose.connect(DB_CONNECTION);
    console.log("MongoDB server is connected")
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDB;