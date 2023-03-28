import { fetchData, sendData } from "./controller/tasksController";

const tasks = document.querySelector("#tasks");
const inputTask = document.querySelector(".add-task");
const form = document.querySelector("form");

const tasksUpdate = async (e) => {
  console.log(e.target.value);
};

const loadTasks = async () => {
  tasks.innerHTML = "";
  const data = await fetchData();
  data.forEach((task) => {
    taskRender(task);
  });
  const select = document.querySelector("select");
  select.addEventListener("change", tasksUpdate);
  form.addEventListener("submit", addTask);
};

const addTask = async (e) => {
  e.preventDefault();
  const title = inputTask.value;

  if (title !== undefined) {
    await sendData(title);
    inputTask.value = "";

    loadTasks();
  }
};

const taskRender = (task) => {
  const tr = document.createElement("tr");
  const statusArr = ["em andamento", "pendente", "concluido"];
  const { id, title, created_at, status } = task;

  tr.innerHTML = `
  <tr>
    <td>${title}</td>
    <td>${created_at}</td>
    <td>
    <select id="${id}">
      ${statusArr.map((item) => {
        if (item !== status) {
          return `<option value="${item}">${item}</option>`;
        }
        return `<option selected value="${item}">${item}</option>`;
      })}
    </select>
    </td>
    <td>
      <button><span class="material-symbols-outlined"> edit </span></button>
      <button><span class="material-symbols-outlined"> delete </span></button>
    </td>
  </tr>
  `;
  tasks.appendChild(tr);
};

loadTasks();
