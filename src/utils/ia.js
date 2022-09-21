import axios from 'axios';

// importamos la url de la api rest del backend y de python
const API_URL = process.env.REACT_APP_API_URL; // express
const IA_URL = process.env.REACT_APP_IA_URL; // fastapi

/*
  Realiza una prediccion de un valor numerico

  params
  token (jwt): string
  x: number

  return
  res: number
*/
async function oneHotPrediction(token, x) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${IA_URL}/ia`,
      method: 'POST',
      data: { x }
    })
    return { res };
  } catch (err) {
    console.log(err)
    return { title: err.response.statusText, icon: 'error' } ;
  }
}

/*
  Retorna el contador de cada estado de las campañas

  params
  token (jwt): string

  return
  obj
*/
async function stadisticsCampaign(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign/stadistics`,
      method: 'GET'
    })
    return { res };
  } catch (err) {
    console.log(err)
    return { title: err.response.statusText, icon: 'error' } ;
  }
}

/*
  Retorna la predicciones de un array lineal

  params
  token (jwt): string

  return
  number[]
*/
async function getPredictions(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${IA_URL}/ia`,
      method: 'GET'
    })
    return { res };
  } catch (err) {
    console.log(err)
    return { title: err.response.statusText, icon: 'error' } ;
  }
}

export {
  oneHotPrediction,
  stadisticsCampaign,
  getPredictions
}
