import {
  list, check, uncheck, line,
} from './selectors.js';

const addToDo = (todo, id, done, trash) => {
  if (trash) {
    return;
  }
  const Done = done ? check : uncheck;
  const Line = done ? line : '';
  const position = 'beforeend';

  const item = `<li class="item">
              <div class="left">
              <i class="fa-regular ${Done}" job="complete" id=${id}${id}></i>
              <p class="text ${Line}">${todo}</p>
              </div>
              <i class="fa-solid fa-trash" job="delete" id=${id}></i>
            </li>`;

  list.insertAdjacentHTML(position, item);
};

export default addToDo;