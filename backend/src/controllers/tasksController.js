const { getAllTasks, savedTask, deleteTask, updateTask } = require("../model/tasksModel");

const getTasks = async (req, res) => {
  const data = await getAllTasks();
  res.status(200).json(data);
};

const addTasks = async (req, res) => {
  const response = await savedTask(req.body);
  res.status(201).json([{ message: "informacao salva" }, response]);
};

const deleteTasks = async (req, res) => {
  const response = await deleteTask(req.params.id);
  res.status(200).json([{ message: "Registo deletado com sucesso" }, response]);
};

const updateTasks = async (req, res) => {
  const response = await updateTask(req.params.id, req.body);
  res.status(200).json([{ message: "Dado actualizado com sucesso" }, response]);
};

module.exports = {
  getTasks,
  addTasks,
  deleteTasks,
  updateTasks,
};
