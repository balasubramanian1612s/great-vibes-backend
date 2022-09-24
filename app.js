const express = require("express");

const app = express();
const userRouter = require("./api/users/user.router");
const movieRouter = require("./api/movies/movies.router");
require("dotenv").config();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

app.listen(process.env.PORT, () => {
  console.log("Up and running");
});
