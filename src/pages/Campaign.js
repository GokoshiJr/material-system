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
  CampaignToolbar,
  CampaignEditForm
} from '../sections/@dashboard/campaign';
// mock
import PRODUCTS from '../_mock/products';
// api
import { index, show, clientInCampaign } from '../utils/api/campaign'
// ----------------------------------------------------------------------

export default function Campaign() {
  const auth = useContext(AppContext);

  const { id } = useParams();

  const [campaigns, setCampaigns] = useState([])

  const [showCampaign, setShowCampaign] = useState({
    name: 'Cargando...',
    audienceAge: [0, 1],
    audienceGender: 'Cargando...',
    campaignState: 'Cargando...',
    campaignTypeId: {
      name: 'Cargando...'
    },
    demographicsDataSegmentation: 'Cargando...',
    initDate: 'Cargando...',
    finalDate: 'Cargando...',
    interestSegmentation: 'Cargando...',
    isPost: 'Cargando...',
    isVideo: 'Cargando...',
    linkAPI: 'Cargando...',
    perDayBudget: 0,
    promotionDuration: 0,
    ubication: 'Cargando...'
  })

  const [projection, setProjection] = useState({
    link: 'Cargando...',
    balances: [0],
    campaignId: 'Cargando...',
    clientId: 'Cargando...'
  })

  const getCampaigns = async () => {
    const { data } = await index(auth.token);
    setCampaigns(data);
  }

  const showCamp = async () => {
    // retorna la campaña por su id
    const { data } = await show(auth.token, id);
    setShowCampaign(data);
  }

  const showClientInCampaign = async () => {
    // retorna la campaña por su id
    const { data } = await clientInCampaign(auth.token, id);
    console.log(data)
    setProjection(data);
  }

  useEffect(() => {
    // para no ver la campaña vista anteriormente
    setShowCampaign({
      name: 'Cargando...',
      audienceAge: [0, 1],
      audienceGender: 'Cargando...',
      campaignState: 'Cargando...',
      campaignTypeId: {
        name: 'Cargando...'
      },
      demographicsDataSegmentation: 'Cargando...',
      initDate: 'Cargando...',
      finalDate: 'Cargando...',
      interestSegmentation: 'Cargando...',
      isPost: 'Cargando...',
      isVideo: 'Cargando...',
      linkAPI: 'Cargando...',
      perDayBudget: 0,
      promotionDuration: 0,
      ubication: 'Cargando...'
    })
    setProjection({
      link: 'Cargando...',
      balances: [0],
      campaignId: 'Cargando...',
      clientId: 'Cargando...'
    })
    console.log('ya renderizo')
    if (id && id !== "add") {
      showCamp();
      showClientInCampaign();
    }
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
      projection={projection}
      title={'Ver'}
    />
  )

}
