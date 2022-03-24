const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTED TO DB");
  } catch (err) {
    console.log("CONNECTION TO DB FAILED");
    process.exit(1);
  }
};

module.exports = connectDB;
