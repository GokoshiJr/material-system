import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function updateLoggedUser(token, user) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/user/updateLoggedUser`,
      method: 'POST',
      data: user
    })
    return res; 
  } catch (err) {
    console.log(err)
    return null;
  }
}

async function getMe(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/user/getMe`,
      method: 'POST'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

async function getUsers(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/user `,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}


export {
  getMe,
  getUsers,
  updateLoggedUser
}