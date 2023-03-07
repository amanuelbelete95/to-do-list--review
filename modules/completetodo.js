import { check, uncheck, line } from './selectors.js';

const completeToDo = (element, elemenId) => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(line);

  const localData = JSON.parse(localStorage.getItem('TODO'));

  localData.forEach((element) => {
    const idnum = Number(elemenId);
    if (idnum === element.id) {
      element.done = !element.done;
    }
    localStorage.setItem('TODO', JSON.stringify(localData));
  });
};
export default completeToDo;