/** EXTERNAL DEPENDENCIES */
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

/** ROUTERS */
const middleware = require("./middleware");
const user = require("./routes/user");

/** INIT */
const app = express();

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** START SERVER*/
app.listen(3300, () => console.log("Started on 3300"));

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "pages")));

/** CONNECT TO DATABASE */
mongoose.connect("mongodb://localhost/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/** ROUTES */
app.use(middleware.cors);
app.use(user);

/** EXPORT PATH */
module.exports = app;
