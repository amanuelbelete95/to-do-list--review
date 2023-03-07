import { list, input, addBtn } from './modules/selectors.js';
import completeToDo from './modules/completetodo.js';
import addToDo from './modules/addtodo.js';

let LIST = JSON.parse(localStorage.getItem('TODO')) || [];
let id = 0;

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});

const erase = document.querySelector('.erase');
erase.addEventListener('click', () => {
  const updateLocal = JSON.parse(localStorage.getItem('TODO'));

  const currentList = updateLocal.filter((item) => item.done === false);
  localStorage.setItem('TODO', JSON.stringify(currentList));
  window.location.reload();
});

const myData = JSON.parse(localStorage.getItem('TODO'));

const rerender = (myList) => {
  if (myList) {
    const container = document.createElement('div');
    myList.forEach((item) => {
      container.innerHTML += `<li class="item">
              <div class="left">
              <i class="fa-regular fa-square" job="complete" id=${item.id}></i>
              <p class="text">${item.todo}</p>
              </div>
              <i class="fa-solid fa-trash" job="delete" id=${id}></i>
            </li>`;
      list.append(container);
    });
  }
};

rerender(myData);

addBtn.addEventListener('click', () => {
  const todo = input.value;

  if (todo) {
    addToDo(todo, id, false, false);
    if (myData) {
      LIST = myData;
    }
    LIST.push({
      todo,
      id: LIST.length,
      done: false,
      trash: false,
    });

    id += 1;
    localStorage.setItem('TODO', JSON.stringify(LIST));
  }

  input.value = '';
});

const removeToDo = (element, elemenId) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[elemenId].trash = true;
  const t = localStorage.getItem('TODO');
  const parsedData = JSON.parse(t);
  const data = parsedData[elemenId].id;

  const currentList = parsedData.filter((item) => item.id !== data);
  currentList.forEach((element, index) => {
    element.id = index;
  });

  LIST = currentList;
  window.location.reload();
  localStorage.setItem('TODO', JSON.stringify(currentList));
};

list.addEventListener('click', (event) => {
  const element = event.target;
  const elemenId = event.target.id;
  const elementJob = element.attributes.job.value;
  if (elementJob === 'complete') {
    completeToDo(element, elemenId);
  } else if (elementJob === 'delete') {
    removeToDo(element, elemenId);
  }
});
