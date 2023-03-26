const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const axios = require("axios");
const cors = require("cors");

function createFolder() {
  if (!fs.existsSync(path.join(__dirname, "../front/logs"))) {
    fs.mkdir(path.join(__dirname, "../front/logs"), (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("Created " + path.join(__dirname, "../front/"));
    });
  }
}

function addLog(req) {
  fs.appendFile(path.join(__dirname, "../front/logs", "log.txt"), `Method type: ${req.method} created at: ${new Date()} \n`, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("log saved successfully");
  });
}

router.use((req, res, next) => {
  createFolder();
  // addLog(req);
  next();
});

router.use(cors());

router.get("/users", async (req, res) => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");

  res.send(data);
});

module.exports = router;
