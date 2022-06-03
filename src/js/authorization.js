import { fatchData, postData, deleteData, patchData, putData } from './api';
import Notiflix from 'notiflix';
import { refs } from './refs';
import { createObjDataToPost, makeMarkup, renderToDom } from '../index';

refs.authorizationPage.addEventListener('submit', e => e.preventDefault());
refs.formSignUp.addEventListener('submit', createUser);
refs.formLogIn.addEventListener('submit', logInUser);
const formData = {};
let counter2 = 0;

async function createUser(e) {
  formData.userName = e.target.userName.value;
  formData.email = e.target.email.value;
  formData.password = e.target.password.value;
  await postData(formData);
  Notiflix.Loading.pulse();
  try {
    refs.login.classList.remove('slide-up');
  } catch (error) {
    console.log(error);
  } finally {
    Notiflix.Loading.remove();
  }
}

let findUser;

async function logInUser(e) {
  const userNameInput = e.target.userNameSecond.value;
  const passwordUser = e.target.passwordSecond.value;
  const response = await (await fatchData()).data;
  findUser = response.find(
    ({ email, password }) => email === userNameInput && password === passwordUser,
  );
  if (!findUser) return;
  refs.authorizationPage.classList.add('hidden');
  refs.form.classList.remove('hidden');
}

refs.btn.addEventListener('click', renderToDoList);

async function renderToDoList(e) {
  counter2 += 1;
  let userInput = refs.form.input.value;
  if (!userInput) return;
  findUser.userData.push(createObjDataToPost(userInput));
  refs.form.reset();

  await putData(findUser.id, findUser);

  renderToDomm(findUser);
}

function renderToDomm(res) {
  try {
    const arrMarkup = res.userData.map(el => {
      return makeMarkup(el.text, el.idMessage, el.isDone);
    });
    renderToDom(arrMarkup.join(''));
  } catch (error) {
    console.log('error');
  } finally {
    refs.title.innerHTML = '';
  }
}

refs.list.addEventListener('click', removeItemFromDommAndDb);

async function removeItemFromDommAndDb(e) {
  if (e.target.nodeName !== 'DIV') return;
  const elForDelete = e.target.parentElement;
  elForDelete.remove();

  const res = await (await fatchData()).data;

  const findToDel = res.find(el => el.id === findUser.id);
  const newDataToPost = findToDel.userData.filter(el => el.idMessage !== elForDelete.id);

  findUser.userData = [...newDataToPost];

  await putData(findUser.id, findUser);
}

refs.list.addEventListener('change', isChecked);

async function isChecked(e) {
  const elById = e.target.parentElement.id;
  findUser.userData.map(el =>
    el.idMessage === elById ? (el.isDone = e.target.checked) : console.log('чет пошло не так'),
  );
  await putData(findUser.id, findUser);
}

export { logInUser };
