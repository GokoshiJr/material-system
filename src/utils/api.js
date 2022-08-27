import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* actualiza un empleado */
async function updateClient(token, id, client) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/client/${id}`,
      method: 'PUT',
      data: client
    })
    return { title: res.data.status, icon: 'success' };
  } catch (err) {
    console.log(err)
    return { title: err.response.statusText, icon: 'error' } ;
  }
}

/* muestra un empleado por su id */
async function showClient(token, id) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/client/${id}`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

/* crea un empleado y su usuario */
async function createClient(token, client) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/client`,
      method: 'POST',
      data: client
    });
    return { title: res.data.status, icon: 'success' };
  } catch (err) {
    console.log(err)
    return { title: err.response.statusText, icon: 'error' }
  }
}

/* elimina un client por su id */
async function eliminateClient(token, id) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/client/${id}`,
      method: 'DELETE'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

/* retorna una lista de todos los clients */
async function getClients(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/client`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

/* crea un empleado y su usuario */
async function createEmployee(token, employee) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/user/createUserEmployee`,
      method: 'POST',
      data: employee
    });
    return { title: res.data.status, icon: 'success' };
  } catch (err) {
    console.log(err)
    return { title: err.response.statusText, icon: 'error' }
  }
}

/* actualiza un empleado */
async function updateEmployee(token, id, employee) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/employee/${id}`,
      method: 'PUT',
      data: employee
    })
    return { title: res.data.status, icon: 'success' };
  } catch (err) {
    console.log(err)
    return { title: err.response.statusText, icon: 'error' } ;
  }
}

/* muestra un empleado por su id */
async function showEmployee(token, id) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/employee/${id}`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

/* elimina un empleado por su id */
async function eliminateEmployee(token, id) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/employee/${id}`,
      method: 'DELETE'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

/* retorna una lista de todos los empleados */
async function getEmployees(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/employee`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

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
  updateClient,
  showClient,
  createClient,
  eliminateClient,
  getClients,
  createEmployee,
  updateEmployee,
  showEmployee,
  eliminateEmployee,
  getEmployees,
  getMe,
  getUsers,
  updateLoggedUser
}
