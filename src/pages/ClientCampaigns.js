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
import { clientCampaigns } from '../utils/api/campaign'

// ----------------------------------------------------------------------

export default function ClientCampaigns() {
  const auth = useContext(AppContext);

  const { id } = useParams();

  const [campaigns, setCampaigns] = useState([])

  const [clientName, setClienName] = useState('')

  const [isLoading, setIsLoading] = useState(true)  

  const getClientCampaigns = async () => {
    const { data } = await clientCampaigns(auth.token, id);
    setCampaigns(data.campaigns);
    setClienName(data.clientName.name)
    setIsLoading(false)
  }

  const showCamp = async () => {
    // retorna la campaña por su id
    // const { data } = await show(auth.token, id);
    // setShowCampaign(data);
  }

  const showClientInCampaign = async () => {
    // retorna la campaña por su id
    // const { data } = await clientInCampaign(auth.token, id);
    // setProjection(data);
  }

  useEffect(() => {
    if (id && id !== "add") {
      getClientCampaigns()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Page title="Campañas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {clientName
              ? `Campañas de ${clientName}`
              : 'Cargando...'
            }
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/campaign/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >

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
