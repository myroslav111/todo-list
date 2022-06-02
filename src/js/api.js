import axios from 'axios';
const URL = 'https://62927bdf9d159855f08b4a6f.mockapi.io/todo';

function fatchData() {
  try {
    const response = axios.get(URL);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function postData(obj) {
  try {
    await axios.post(URL, obj);
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(id) {
  try {
    await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

async function patchData(id, obj) {
  try {
    await axios.put(`${URL}/${id}`, obj);
  } catch (error) {
    console.log(error);
  }
}

async function putData(id, obj) {
  try {
    await axios.put(`${URL}/${id}`, obj);
  } catch (error) {
    console.log(error);
  }
}

export { fatchData, postData, deleteData, patchData, putData };
