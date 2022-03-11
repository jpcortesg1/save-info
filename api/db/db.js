const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.URL_MONGO_DB, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
};

module.exports = db = {
  connect,
};
