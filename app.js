const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const userRouter = require("./api/users/user.router");
const movieRouter = require("./api/movies/movies.router");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60,
    },
  })
);

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Up and running");
});
