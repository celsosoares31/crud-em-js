const baseURL = 'http://localhost:3333/';

const fetchData = async () => {
  try {
    const data = await fetch(`${baseURL}tasks`);
    const resp = await data.json();

    return resp;
  } catch (err) {
    console.log(err);
  }
};

const sendData = async (title) => {
  try {
    await fetch(`${baseURL}save`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'Content-Security-Policy': ' default-src *' },
      body: JSON.stringify({
        title,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (task, id) => {
  const { title, status } = task;

  console.log(title, status);
  try {
    await fetch(`${baseURL}update/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title,
        status,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
export { fetchData, sendData, updateTask };
