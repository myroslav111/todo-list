import './sass/main.scss';
import { refs } from './js/refs';

refs.form.addEventListener('submit', preventDefault);
refs.btn.addEventListener('click', renderToDoList);

function preventDefault(e) {
  e.preventDefault();
}

// берем дату инпута
function renderToDoList(e) {
  const userInput = refs.form.input.value;
  if (!userInput) return;
  renderToDom(makeMarkup(userInput));
  refs.form.reset();
  refs.list.addEventListener('click', removeItemFromDom);
}

function removeItemFromDom(e) {
  if (e.target.nodeName !== 'DIV') return;
  e.target.parentElement.remove();
}

// рендер в дом
function renderToDom(markup) {
  refs.list.insertAdjacentHTML('beforeend', markup);
}

// делаем строку для рендера
function makeMarkup(data) {
  return `<li class="boxToDo">
    <input type="checkbox" id="todo" name="todo" value="todo" />
    <label for="todo" data-content="${data}">${data}</label>
    <div class="close"></div>
  </li> `;
}

fetch('https://62927bdf9d159855f08b4a6f.mockapi.io/todo')
  .then(res => {
    console.log(res);
    return res.json();
  })
  .catch(err => console.log(err));
