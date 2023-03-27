const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const { getAllUsers } = require("./src/controllers/usersController");
const { getTasks, addTasks, deleteTasks, updateTasks } = require("./src/controllers/tasksController");
const { validatePostRequest, validatePutRequest } = require("./src/midlewares/requestValidationService");

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
  if (req.method !== "GET" && req.method !== "POST" && req.method !== "PUT" && req.method !== "DELETE") {
    return res.status(400).json({
      message: "Invalid method",
    });
  }
  next();
});

router.use(cors());

router.get("/users", getAllUsers);
router.get("/tasks", getTasks);
router.post("/save", validatePostRequest, addTasks);
router.delete("/delete/:id", deleteTasks);
router.put("/update/:id", validatePutRequest, updateTasks);

module.exports = router;
