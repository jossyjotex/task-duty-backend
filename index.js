require("dotenv/config");
const express = require("express");
const app = express();
const port = process.env.PORT || 6767;
const connect = require("./config/db");
const cors = require('cors')
// const TASKS = require("../model/taskModel");
const taskRouter = require("./routes/taskRouter");

// MIDDLEWARE
app.use(express.json());
app.use(cors())

// AP'S

app.use("/api", taskRouter);

// SERVER AND DB

connect()
  .then(() => {
    try {
      app.listen(
        port,
        console.log(`server is connected to http://localhost:${port}`)
      );
    } catch (error) {
      console.log("cannot connect to the server");
    }
  })
  .catch(() => {
    console.log("invalid database connection...!", error);
  });

// ROUTES

app.get("/", function (req, res) {
  res.status(200).send("Hello World");
});

app.use((req, res) => {
  res.status(400).send("route not found");
});
