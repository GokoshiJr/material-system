import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import {
  Container,
  Stack,
  Typography,
  Button,
  Skeleton,
  Card,
  CardHeader,
  Grid,
  CardContent
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
// api
import { index, show, clientInCampaign } from '../utils/api/campaign'
// ----------------------------------------------------------------------

export default function Campaign() {
  const auth = useContext(AppContext);

  const { id } = useParams();

  const [campaigns, setCampaigns] = useState([])

  const [isLoading, setIsLoading] = useState(true)

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
    setIsLoading(false)
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
    if (id && id !== "add") {
      showCamp();
      showClientInCampaign();
    }
    if (!id) getCampaigns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // cards de campañas
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
          {!isLoading
            ?
            <CampaignList campaigns={campaigns} />
            :
            <Grid container spacing={3}>
              {[0,1,2,3].map((el, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <Card>
                    <Skeleton
                      variant="rectangular"
                      height={220}
                      sx={{ bgcolor: 'grey.400'}}
                    />
                    <CardContent>
                      <Typography variant="subtitle2" noWrap>
                        {`Campaña ${index+1}`}
                      </Typography>
                      <Typography variant="string" sx={{ fontSize: 14 }}>
                        {`Cargando...`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          }
        </Container>
      </Page>
    );
  }

  // crear campaña
  if (id === "add") {
    return (
      'todo'
    )
  }

  // editar y ver campaña por id
  return (
    <EditCampaign
      campaign={showCampaign}
      projection={projection}
      showClientInCampaign={showClientInCampaign}
      title={'Ver'}
    />
  )

}
