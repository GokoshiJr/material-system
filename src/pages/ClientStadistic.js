import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, CardHeader, Skeleton, Button } from '@mui/material';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
  BarChart,
  Bar
} from 'recharts';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import CampaignPrediction from '../components/CampaignPrediction';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppCampaignTypesBarChart,
  AppCampaignPredictionScatterPlot,
  AppCampaignAudienceAgeScatterPlot
} from '../sections/@dashboard/app';
import { CampaignTimeline } from '../sections/@dashboard/campaign'
import { showClient, clientStadistic } from '../utils/api';
// context
import { AppContext } from '../context/AppContext';

// ----------------------------------------------------------------------

export default function ClientStadistic() {
  const theme = useTheme();

  const auth = useContext(AppContext);  

  const { id } = useParams()

  const [client, setClient] = useState({})

  const [clientStads, setClientStads] = useState({})

  const getClient = async () => {
    const { data } = await showClient(auth.token, id)
    setClient(data)
  }

  const getClientStadistic = async () => {
    const { res } = await clientStadistic(auth.token, id)
    console.log(res.data)
    setClientStads(res.data)
  }

  useEffect(() => {
    getClientStadistic()
    getClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page title="Estadísticos del Cliente">
      <Container maxWidth="xl">

        <Typography variant="h4" sx={{ mb: 5 }}>
          Datos estadísticos del cliente {client.name}
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={6}>
            {clientStads.audienceGender
              ?
              <AppCurrentVisits
                title="Porcentaje campañas por género"
                chartData={clientStads.audienceGender}
                chartColors={[
                  theme.palette.chart.violet[0],
                  theme.palette.chart.yellow[0],
                  theme.palette.chart.blue[0]
                ]}
              />
              :
              <Card>
                <CardHeader title={"Porcentaje campañas por género"} />
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
                title={'Segmentación Demográfica'}
                subtitle={'Type'}
                chartData={clientStads.demographicsDataSegmentation}
              />
              :
              <Card>
                <CardHeader title={"Segmentación Demográfica"} />
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
                  title="Línea de tiempo (Fecha de inicio)"
                  list={clientStads.timeline.map((el, index) => ({
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
                  <CardHeader title={"Segmentación Demográfica"} />
                  <Skeleton
                    variant="rectangular"
                    height={480}
                    sx={{ bgcolor: 'grey.400', m: 3 }}
                  />
                </Card>
            }
          </Grid> 

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History','History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [1,80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [1,20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [1,44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Campañas"
              subheader="Prediccion de inversion por dia"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                /* {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                }
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                }, */
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
              ]}
            />
          </Grid>

          

        </Grid>
      </Container>
    </Page>
  );
}
