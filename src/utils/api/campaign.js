import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getCampaignUnasigned(token) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign/unasigned`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    return null;
  }
}

async function store(token, campaign) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign`,
      method: 'POST',
      data: campaign
    })
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
}
// return campaign types
async function getCampaignTypes(token, clientId) {
  try {
    const res = await axios({
      headers: {"x-access-token": token},
      url: `${API_URL}/campaign/campaignTypes`,
      method: 'GET'
    })
    return res;
  } catch (err) {
    console.log(err)
    if (err.response.status === 401) {
      console.log('logout')
    }
    return null;
  }
}

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
  getCampaignUnasigned,
  store,
  getCampaignTypes,
  clientCampaigns,
  updateBalanceInProjection,
  clientInCampaign,
  index,
  show
}
