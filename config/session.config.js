require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const connectSession = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 },
      unset: "destroy",
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        // time to live
        ttl: 60 * 60 * 24,
      }),
    })
  );
};

module.exports = connectSession;