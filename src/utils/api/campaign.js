import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// retorna todas las campañas
async function index(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign `,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

export {
  index
}
