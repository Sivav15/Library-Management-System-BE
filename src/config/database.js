const mongoose = require("mongoose");

const database = async () => {
  try {
    const url = `${process.env.mongoUrl}/${process.env.dbName}`;
    await mongoose.connect(url);
    console.log("Database connection successful");
  } catch (error) {
    console.log(`Database connection failed, ${error.message}`);
  }
};

module.exports = database;
