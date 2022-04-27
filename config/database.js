const mongoose = require("mongoose");

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database successfully!");
    })
    .catch((error) => {
      console.log("Failed to connet to database " + error);
      process.exit(1);
    });
};
