import { fatchData, postData, deleteData, patchData, putData } from './api';
import { refs } from './refs';
import { createObjDataToPost, makeMarkup, renderToDom, isCheck, removeItemFromDom } from '../index';

console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', e => {
  let parent = e.target.parentNode.parentNode;
  Array.from(e.target.parentNode.parentNode.classList).find(element => {
    if (element !== 'slide-up') {
      parent.classList.add('slide-up');
    } else {
      signupBtn.parentNode.classList.add('slide-up');
      parent.classList.remove('slide-up');
    }
  });
});

signupBtn.addEventListener('click', ec);

function ec(e) {
  let parent = e.target.parentNode;
  Array.from(e.target.parentNode.classList).find(element => {
    if (element !== 'slide-up') {
      parent.classList.add('slide-up');
    } else {
      loginBtn.parentNode.parentNode.classList.add('slide-up');
      parent.classList.remove('slide-up');
    }
  });
}

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
  refs.login.classList.remove('slide-up');
  //   refs.authorizationPage.classList.add('hidden');
  //   refs.form.classList.remove('hidden');

  //   const response = await (await fatchData()).data;
  //   console.log(response);
  //   findUser = response;
  //   console.log(findUser);
  //   renderToDoListNext();
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

refs.btn.addEventListener('click', renderToDoListNext);

async function renderToDoListNext(e) {
  counter2 += 1;
  let userInput = refs.form.input.value;
  if (!userInput) return;
  console.log(createObjDataToPost(userInput));
  findUser.userData.push(createObjDataToPost(userInput));
  refs.form.reset();
  console.log(findUser.userData);

  await putData(findUser.id, findUser);

  renderToDomm(findUser);
}

function renderToDomm(res) {
  try {
    const arrMarkup = res.userData.map(el => {
      return makeMarkup(el.text, el.idMessage, el.isDone);
    });
    renderToDom(arrMarkup.join(''));
    // refs.form.reset();
  } catch (error) {
    console.log('error');
  } finally {
    refs.title.innerHTML = '';
  }
}

refs.list.addEventListener('click', removeItemFromDomm);

async function removeItemFromDomm(e) {
  if (e.target.nodeName !== 'DIV') return;
  const elForDelete = e.target.parentElement;
  elForDelete.remove();
  console.log(e.target);
  const res = await (await fatchData()).data;
  console.log(res[0].id);
  console.log(findUser.id);
  console.log(elForDelete.id);

  const findToDel = res.find(el => el.id === findUser.id);
  console.log(findToDel.userData);
  const newDataToPost = findToDel.userData.filter(el => el.idMessage !== elForDelete.id);
  console.log(newDataToPost);
  findUser.userData = [...newDataToPost];
  console.log(findUser.userData);
  await putData(findUser.id, findUser);
}

refs.list.addEventListener('change', isChecked);

async function isChecked(e) {
  const elById = e.target.parentElement.id;
  findUser.userData.map(el =>
    el.idMessage === elById ? (el.isDone = e.target.checked) : console.log('ggg'),
  );
  await putData(findUser.id, findUser);
}

export { logInUser };
