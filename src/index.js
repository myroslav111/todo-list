import './sass/main.scss';
import { refs } from './js/refs';
import './js/authorization';
import './js/log-window';

refs.button.addEventListener('click', closeTitlePage);

refs.form.classList.add('hidden');

function closeTitlePage(e) {
  refs.startTxt.classList.add('hidden');
  refs.button.classList.add('hidden');
  refs.authorizationPage.classList.remove('hidden');
  refs.title.innerHTML = '<h1 class"title">ВВЕДИ ЗАДАЧУ</h1>';
}

// рендер в дом
function renderToDom(markup) {
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', markup);
}

// обьект для для post
function createObjDataToPost(input) {
  const objData = {};
  objData.isDone = false;
  objData.text = input;
  objData.idMessage = input;
  return objData;
}

// делаем строку для рендера
function makeMarkup(data, idMessage, isDone) {
  switch (isDone) {
    case true:
      return `<li class="boxToDo" id="${idMessage}">
    <input type="checkbox" id="todo" name="todo" value="todo" checked/>
    <label for="tod" data-content="${data}">${data}</label>
    <div class="close"></div>
    </li> `;
      break;
    case false:
      return `<li class="boxToDo" id="${idMessage}">
      <input type="checkbox" id="todo" name="todo" value="todo" />
      <label for="tod" data-content="${data}">${data}</label>
      <div class="close"></div>
      </li> `;
      break;
    default:
      console.log('чет пошло не так');
  }
}

export { createObjDataToPost, makeMarkup, renderToDom };
