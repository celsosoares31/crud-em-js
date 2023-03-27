const app = document.querySelector("#app");

const getData = async () => {
  const data = await fetch("http://localhost:5000/tasks");

  const resp = await data.json();

  console.log(resp);
};

getData();
