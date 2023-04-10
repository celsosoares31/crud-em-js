const connection = require("./connectionModel");

const getAllTasks = async () => {
  const query = `SELECT * FROM tasks`;
  const [tasks] = await connection.execute(query);

  if (tasks) {
    console.log("dados buscados com sucesso");
  }
  return tasks;
};

const savedTask = async (task) => {
  const { title } = task;

  const query = "INSERT INTO tasks (title,status,created_at) VALUES (?,?,?)";
  const [saveTask] = await connection.execute(query, [title, "pendente", dateGenerator()]);

  if (saveTask) {
    console.log("Tarefa salva com sucesso");
  }
  return saveTask;
};

const deleteTask = async (id) => {
  const query = "DELETE FROM tasks WHERE id =?";
  const [deleteTask] = await connection.execute(query, [id]);

  if (deleteTask) {
    console.log("Tarefa deletada com sucesso");
  }

  return deleteTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;
  if (title && status) {
    const query = "UPDATE tasks SET title=?, status =? WHERE id =?";
    const [updateTask] = await connection.execute(query, [title, status, id]);

    if (updateTask) {
      console.log("Tarefa atualizada com sucesso");
    }

    return updateTask;
  } else if (status && !title) {
    console.log("titulo invalido");
    const query = "UPDATE tasks SET status=? WHERE id =?";
    const [updateTask] = await connection.execute(query, [status, id]);

    if (updateTask) {
      console.log("Status atualizado com sucesso");
    }

    return updateTask;
  } else if (!status && title) {
    console.log("status invalido");
    const query = "UPDATE tasks SET title=? WHERE id =?";
    const [updateTask] = await connection.execute(query, [title, id]);

    if (updateTask) {
      console.log("titulo atualizado com sucesso");
    }

    return updateTask;
  }
};

function dateGenerator() {
  const newDate = new Date(Date.now());
  newDate.toUTCString();

  return newDate;
}
module.exports = {
  getAllTasks,
  savedTask,
  deleteTask,
  updateTask,
};
