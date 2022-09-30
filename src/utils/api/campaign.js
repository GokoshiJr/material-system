import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// return client by campaign id
async function clientCampaigns(token, clientId) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign/clientCampaigns/${clientId}`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

// return client by campaign id
async function updateBalanceInProjection(token, projectionId, balances) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/projection/${projectionId}`,
      method: 'PUT',
      data: {
        balances
      }
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

// return client by campaign id
async function clientInCampaign(token, campaignId) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign/clientInCampaign/${campaignId}`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

// retorna todas las campañas
async function index(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

// retorna la campaña por su id
async function show(token, id) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign/${id}`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}

export {
  clientCampaigns,
  updateBalanceInProjection,
  clientInCampaign,
  index,
  show
}
