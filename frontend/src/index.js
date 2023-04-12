import { deleteTasks, fetchData, sendData, updateTask } from './controller/tasksController.js';
import '../src/style.css';
import msgModel from './model/MsgModel.js';
import { modal } from './model/deleteConfirm.js';

const tasks = document.querySelector('#tasks');
const thead = document.querySelector('thead');
const inputTask = document.querySelector('.add-task');
const form = document.querySelector('form');
const body = document.querySelector('body');
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
  try {
    const data = await fetchData();

    tasks.innerHTML = '';

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
  } catch (error) {
    console.error(error);
  }
};

loadTasks();

const addTask = async (e) => {
  const title = inputTask.value;
  e.preventDefault();
  if (title !== undefined) {
    await sendData(title);
    inputTask.value = '';
    inputTask.focus();

    loadTasks();
    msgModel('Dados Adicionado com sucesso!');
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
    msgModel('Dados actualizados com sucesso...');
  }
};

const deleteTask = (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('delete')) {
    const idStr = target.getAttribute('id');
    const id = idStr.slice(6);

    const modalElem = modal();

    const btns = document.querySelector('.modal-buttons');
    const btn = btns.querySelectorAll('button');

    btn.forEach((bt) =>
      bt.addEventListener('click', async (e) => {
        const target = e.target;

        if (target.innerText == 'Cancel') {
          body.removeChild(modalElem);
          return;
        }
        try {
          await deleteTasks(id);
          loadTasks();
          body.removeChild(modalElem);
          msgModel('Dados deletados com sucesso!', true);
        } catch (error) {
          console.error(error);
        }
      })
    );
  }
};
function deleteHandler(e) {
  const target = e.target;

  if ((target.innerText = 'Cancel')) {
    return 0;
  }
  return 1;
}
