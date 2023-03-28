const fetchData = async () => {
  const data = await fetch("http://localhost:5000/tasks");
  const resp = await data.json();
  return resp;
};

const sendData = async (title) => {
  await fetch("http://localhost:5000/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title,
    }),
  });
};

const updateTask = async (task, id) => {
  const { title, status } = task;

  await fetch(`http://localhost:5000/update/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title,
      status,
    }),
  });
};
export { fetchData, sendData };
