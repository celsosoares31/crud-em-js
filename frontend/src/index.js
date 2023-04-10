import { deleteTasks, fetchData, sendData, updateTask } from './controller/tasksController.js';
import '../src/style.css';

const tasks = document.querySelector('#tasks');
const inputTask = document.querySelector('.add-task');
const form = document.querySelector('form');
const statusArr = new Array('em andamento', 'pendente', 'concluido');

const taskRender = (task) => {
  const tr = document.createElement('tr');

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
      <button class="btn-tabela edit" id="edit${id}"><span class="material-symbols-outlined"> edit </span></button>
      <button class="btn-tabela delete" id="delete${id}"><span class="material-symbols-outlined"> delete </span></button>
    </td>
  </tr>
  `;
  tasks.appendChild(tr);
};

const loadTasks = async () => {
  tasks.innerHTML = '';
  const data = await fetchData();
  data.forEach((task) => {
    taskRender(task);
  });
  form.addEventListener('submit', addTask);

  const select = document.querySelectorAll('select');
  const btnEdit = document.querySelectorAll('.edit');
  const btnDelete = document.querySelectorAll('.delete');
  select.forEach((select) => select.addEventListener('change', statusUpdate));
  btnEdit.forEach((btn) => btn.addEventListener('click', updateTitle));
  btnDelete.forEach((btn) => btn.addEventListener('click', deleteTask));
};

loadTasks();

const addTask = async (e) => {
  e.preventDefault();
  const title = inputTask.value;

  if (title !== undefined) {
    await sendData(title);
    inputTask.value = '';

    loadTasks();
  }
};

const statusUpdate = async (e) => {
  e.preventDefault();
  const status = e.target.value;
  const id = e.target.id;
  try {
    await updateTask({ title: '', status }, id);
  } catch (error) {
    console.error(error);
  }
};

const updateTitle = async (e) => {
  e.preventDefault();
  const titleColumn = e.target.parentNode.parentNode.children[0];
  const target = e.originalTarget;
  const value = titleColumn.outerText;
  const input = `<input class="edit-title" value="${value}"/>`;

  console.log(target, '               yes');

  if (target.classList.contains('btn-tabela') && !target.classList.contains('editar')) {
    titleColumn.innerHTML = input;
    target.innerHTML = `<span class="material-symbols-outlined">save</span>`;
    let inputArea = document.querySelector('.edit-title');
    target.classList.add('editar');
    inputArea.focus();
  } else if (target.classList.contains('btn-tabela') && target.classList.contains('editar')) {
    const tr = target.parentNode.parentNode;
    const id = tr.children[2].children[0].id;
    const selectValue = tr.children[2].children[0].value;
    const title = tr.children[0].children[0].value;

    target.classList.remove('editar');
    console.log({ title, selectValue });

    if (typeof title === 'string' && typeof selectValue === 'string') {
      if (title.length > 5 && statusArr.includes(selectValue)) {
        try {
          await updateTask(
            {
              title,
              status: selectValue,
            },
            id
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadTasks();
  }
};

const deleteTask = async (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('delete')) {
    const idStr = target.getAttribute('id');
    const id = idStr.slice(6);
    try {
      await deleteTasks(id);
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  }
};
