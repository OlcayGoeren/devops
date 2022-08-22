// require("dotenv").config();
const express = require("express");
const app = express();
const redis = require("redis");
var cors = require("cors");
let counter = 0;
// process.env.REDIS_URL
const client = redis.createClient({
  url: process.env.REDIS_URL,
});

app.use(cors());

client.on("error", (err) => {
  console.log("Error occured while connecting or accessing redis server");
});

app.use(express.static("."));
app.use(express.json());

app.get("/", function (request, response) {
  response.status(200).send("Hello " + process.env.MESSAGE);
});

app.get("/health", function (request, response) {
  response.status(200).send({
    health: true,
  });
});

app.get("/counter", async function (req, res) {
  try {
    const myCounter = await client.get("counter");
    if (myCounter == null) {
      console.log("if");
      const setnewCounter = await client.set("counter", 0);
      counter = 0;
      res.status(200).send({
        counter,
      });
    } else {
      console.log("else");
      counter = parseInt(myCounter);
      res.status(200).send({
        counter,
      });
    }
  } catch (error) {
    console.log("error");
  }
});

app.post("/increment", async function (request, response) {
  const myCounter = await client.get("counter");
  const intCounter = parseInt(myCounter);
  counter = intCounter + 1;
  client.set("counter", counter);
  response.status(200).send({ counter });
});

app.post("/decrement", async function (request, response) {
  const myCounter = await client.get("counter");
  const intCounter = parseInt(myCounter);
  counter = intCounter - 1;
  client.set("counter", counter);
  response.status(200).send({ counter });
});

const listener = app.listen(process.env.PORT, async function () {
  await client.connect();

  console.log("Your app is listening on port " + listener.address().port);
});
