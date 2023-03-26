const connection = require("./connectionModel");

const getAllTasks = async () => {
  const query = `SELECT * FROM tasks`;
  const tasks = await connection.execute(query);
  if (tasks) {
    console.log("dados buscados com sucesso");
  }
  return tasks[0];
};

module.exports = {
  getAllTasks,
};
