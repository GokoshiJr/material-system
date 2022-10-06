import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { 
  Grid, 
  Container, 
  Typography, 
  Card, 
  CardHeader, 
  Skeleton 
} from '@mui/material';
import { format } from 'date-fns';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppCampaignTypesBarChart
} from '../sections/@dashboard/app';
import { CampaignTimeline } from '../sections/@dashboard/campaign';
import { showClient, clientStadistic } from '../utils/api';
// context
import { AppContext } from '../context/AppContext';

// ----------------------------------------------------------------------

export default function ClientStadistic() {
  const theme = useTheme();

  const auth = useContext(AppContext);  

  const { id } = useParams();

  const [client, setClient] = useState({});

  const [clientStads, setClientStads] = useState({});

  const getClient = async () => {
    const { data } = await showClient(auth.token, id);
    setClient(data);
  }

  const getClientStadistic = async () => {
    const { res } = await clientStadistic(auth.token, id);
    setClientStads(res.data);
  }

  useEffect(() => {
    getClientStadistic();
    getClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page title="Estadísticos del Cliente">
      <Container maxWidth="xl">

        <Typography variant="h4" sx={{ mb: 5 }}>
          Visualización de las campañas del cliente {client.name}
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.audienceGender
              ?
              <AppCurrentVisits
                title="Campañas por Género"
                chartData={clientStads.audienceGender}
                chartColors={[
                  theme.palette.chart.violet[0],
                  theme.palette.chart.yellow[0],
                  theme.palette.chart.blue[0]
                ]}
              />
              :
              <Card>
                <CardHeader title={"Campañas por Género"} />
                <Skeleton
                  variant="rectangular"
                  height={368}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
            }
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.demographicsDataSegmentation
              ?
              <AppCampaignTypesBarChart
                title={'Campañas por Segmentación Demográfica'}
                subtitle={'Type'}
                chartData={clientStads.demographicsDataSegmentation}
              />
              :
              <Card>
                <CardHeader title={"Campañas por Segmentación Demográfica"} />
                <Skeleton
                  variant="rectangular"
                  height={368}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
            }
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.timeline
              ?
                <CampaignTimeline
                  title="Línea de tiempo (por fecha de inicio)"
                  list={clientStads.timeline.map((el) => ({
                    id: el.id,
                    title: el.title,
                    type: (el.campaignState === "on" && "order2") ||
                    (el.campaignState === "paused" && "order1") || 
                    (el.campaignState === "finalized" && "order4"),
                    time: new Date(el.time),
                  }))}
                />
              :
                <Card>
                  <CardHeader title={"Línea de tiempo (por fecha de inicio)"} />
                  <Skeleton
                    variant="rectangular"
                    height={520}
                    sx={{ bgcolor: 'grey.400', m: 3 }}
                  />
                </Card>
            }
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.campaignState
              ?
              <AppCampaignTypesBarChart
                title={'Campañas por estado actual'}
                subtitle={'Type'}
                chartData={clientStads.campaignState.map((el) => ({
                  ...el,
                  label: (el.label === "finalized" && "Finalizada") ||
                  (el.label === "paused" && "Pausada") ||
                  (el.label === "on" && "Activa")
                }))}
              />
              :
              <Card>
                <CardHeader title={"Campañas por estado actual"} />
                <Skeleton
                  variant="rectangular"
                  height={368}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
            }
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.ubication
              ?
            <AppCurrentSubject
              title="Campañas por ubicación"
              chartLabels={clientStads.ubication.map((el) => el.label)}
              chartData={[
                { name: 'Ubicación', data: clientStads.ubication.map((el) => el.value) }
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
            :
              <Card>
                <CardHeader title={"Campañas por ubicación"} />
                <Skeleton
                  variant="rectangular"
                  height={368}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
            }
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.campaignType
              ?
              <AppCampaignTypesBarChart
                title={'Campañas por tipo'}
                subtitle={'Type'}
                chartData={clientStads.campaignType}
              />
              :
              <Card>
                <CardHeader title={"Campañas por tipo"} />
                <Skeleton
                  variant="rectangular"
                  height={368}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
            }
          </Grid>


          <Grid item xs={12} md={12} lg={12}>
          {clientStads.campaignType
            ?
              <AppWebsiteVisits
              title="Inversiones"
              subheader="Prediccion de inversion por dia"
              chartLabels={
                clientStads.timeline.map((el) => (format(new Date(el.time), 'dd-MMM-yy')))
              }
              chartData={[
                {
                  name: 'Inversión por día ($)',
                  type: 'column',
                  fill: 'solid',
                  data: clientStads.timeline.map((el) => el.perDayBudget),
                },
                {
                  name: 'Duración de la campaña (días)',
                  type: 'line',
                  fill: 'solid',
                  data: clientStads.timeline.map((el) => el.promotionDuration),
                }
              ]}
            />
              :
              <Card>
                <CardHeader title={"Prediccion de inversion por dia"} />
                <Skeleton
                  variant="rectangular"
                  height={382}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
          }
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.display
              ?
              <AppCurrentVisits
                title="Campañas por tipo de publicación"
                chartData={clientStads.display}
                chartColors={[
                  theme.palette.chart.violet[0],
                  theme.palette.chart.yellow[0],
                  theme.palette.chart.blue[0]
                ]}
              />
              :
              <Card>
                <CardHeader title={"Campañas por tipo de publicación"} />
                <Skeleton
                  variant="rectangular"
                  height={368}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
            }
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
          {clientStads.interestSegmentation
            ?
            <AppTrafficBySite
              title="Campañas por segmentación de intereses"
              list={
                clientStads.interestSegmentation.map((el) => ({
                  name: el.label,
                  value: el.value,
                  icon: <Iconify icon={
                    'eva:facebook-fill'
                    
                  } color="#1877F2" width={32} height={32} />,
                }))
              }
            />
            :
            <Card>
                <CardHeader title={"Campañas por segmentación de intereses"} />
                <Skeleton
                  variant="rectangular"
                  height={368}
                  sx={{ bgcolor: 'grey.400', m: 3 }}
                />
              </Card>
          }
          
            
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
