import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import { 
  Container,
  Stack, 
  Typography,
  Button 
} from '@mui/material';
import Iconify from '../components/Iconify';
// context
import { AppContext } from '../context/AppContext';
// components
import EditCampaign from './EditCampaign'
import Page from '../components/Page';
import { 
  CampaignList,
  CampaignToolbar 
} from '../sections/@dashboard/campaign';
// mock
import PRODUCTS from '../_mock/products';
// api
import { index } from '../utils/api/campaign'
// ----------------------------------------------------------------------

export default function Campaign() {
  const auth = useContext(AppContext);

  const { id } = useParams();

  const [campaigns, setCampaigns] = useState([])

  const [showCampaign, setShowCampaign] = useState({})
  
  const getCampaigns = async () => {
    const { data } = await index(auth.token);
    setCampaigns(data);
  }

  const showCamp = async () => {
    // const { data } = await showCampaign(auth.token, id);
    // setCampaign(data);
  }

  useEffect(() => {
    if (id && id !== "add") showCamp();
    if (!id) getCampaigns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // tabla de empleados
  if (!id) {
    return (
      <Page title="Campañas">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Lista de Campañas
            </Typography>
            <Button variant="contained" component={RouterLink} to="add" startIcon={<Iconify icon="eva:plus-fill" />}>
              Crear Campaña
            </Button>
            <CampaignToolbar />
          </Stack>
          <CampaignList campaigns={campaigns} />
        </Container>
      </Page>
    );
  }

  // crear campaña
  if (id === "add") {
    return (
      <EditCampaign
        title={'Crear'}
      />
    )
  }
 
  // editar y ver campaña por id
  return (
    <EditCampaign
      campaign={showCampaign}
      setCampaign={setShowCampaign}
      title={'Editar'}
    />
  )

}
