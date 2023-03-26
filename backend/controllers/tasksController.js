const { getAllTasks } = require("../model/tasksModel");

const getTasks = async (req, res) => {
  const data = await getAllTasks();
  res.status(200).json(data);
};

module.exports = {
  getTasks,
};
