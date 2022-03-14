// Required modules
const express = require("express");
const compression = require("compression");
const dotenv = require("dotenv");
const db = require("./db/db.js");

// Routes
const routeAuth = require("./routes/auth");
const routeUsers = require("./routes/users");
const routeCategories = require("./routes/categories");
const routePosts = require("./routes/posts");

// Create app of express
const app = express();

// Middleware
app.use(compression());

// Config
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect with db
db.connect();

// Routes
app.use("/api/auth", routeAuth);
app.use("/api/users", routeUsers);
app.use("/api/categories", routeCategories);
app.use("/api/posts", routePosts);

app.listen(process.env.PORT, () => {
  console.log(`api run in ${process.env.PORT}`);
});
