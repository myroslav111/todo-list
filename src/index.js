import './sass/main.scss';
import { refs } from './js/refs';
import { fatchData, postData, deleteData, patchData } from './js/api';

refs.form.addEventListener('submit', preventDefault);
refs.btn.addEventListener('click', renderToDoList);
refs.button.addEventListener('click', renderToDoListStart);

const objData = {};
let counter = 0;

refs.form.classList.add('hidden');

function preventDefault(e) {
  e.preventDefault();
}

function renderToDoListStart(e) {
  refs.startTxt.classList.add('hidden');
  refs.button.classList.add('hidden');
  refs.form.classList.remove('hidden');
  refs.title.innerHTML = '<h1 class"title">ВВЕДИ ЗАДАЧУ</h1>';
}

// берем дату инпута и рендерим лист
async function renderToDoList(e) {
  counter += 1;
  const userInput = refs.form.input.value;
  if (!userInput) return;
  switch (counter > 1) {
    case true:
      refs.title.innerHTML = 'ЩА ЖДИ';
      break;
    case false:
      refs.title.innerHTML = `<div class"second-text"><span>а пока ждем анекдот</span><br/><span>Совокупление — процесс покупки совы.</span></div>`;
      break;
    default:
      refs.title.innerHTML = 'Упс';
  }

  setTimeout(async () => {
    try {
      await renderDataServer(userInput);
      refs.form.reset();
      refs.list.addEventListener('change', isCheck);
      refs.list.addEventListener('click', removeItemFromDom);
    } catch (error) {
    } finally {
      refs.title.innerHTML = '';
    }
  }, 1000);
}

async function isCheck(e) {
  const elById = e.target.parentElement.id;
  await patchData(elById, { isDone: e.target.checked });
}

// рендер данных с сервиса
async function renderDataServer(userInput) {
  await postData(createObjDataToPost(userInput));
  refs.list.addEventListener('change', isCheck);
  const res = await fatchData();
  const arrMarkup = res.data.map(el => {
    return makeMarkup(el.text, el.id, el.isDone);
  });

  renderToDom(arrMarkup.join(''));
}

// удаляем айтемы
async function removeItemFromDom(e) {
  if (e.target.nodeName !== 'DIV') return;
  const elForDelete = e.target.parentElement;
  elForDelete.remove();
  await deleteData(elForDelete.id);
}

// рендер в дом
function renderToDom(markup) {
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', markup);
}

// обьект для для post
function createObjDataToPost(input) {
  objData.isDone = false;
  objData.text = input;
  return objData;
}

// делаем строку для рендера
function makeMarkup(data, id, isDone) {
  switch (isDone) {
    case true:
      return `<li class="boxToDo" id="${id}">
    <input type="checkbox" id="todo" name="todo" value="todo" checked/>
    <label for="todo" data-content="${data}">${data}</label>
    <div class="close"></div>
    </li> `;
      break;
    case false:
      return `<li class="boxToDo" id="${id}">
      <input type="checkbox" id="todo" name="todo" value="todo" />
      <label for="todo" data-content="${data}">${data}</label>
      <div class="close"></div>
      </li> `;
      break;
    default:
      console.log('чет пошло не так');
  }
}
