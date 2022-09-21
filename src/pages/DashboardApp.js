import { useState, useContext, useEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, CardHeader } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
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
} from '../sections/@dashboard/app';
import { getPredictions, stadisticsCampaign } from '../utils/ia';
// context
import { AppContext } from '../context/AppContext';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const auth = useContext(AppContext);

  const [test, setTest] = useState([
    {x: 0, y: 0},
    {x: 1, y: 1}
  ])

  const [predData, setPredData] = useState([
    {x: 0, y: 0},
    {x: 1, y: 1}
  ])

  const [stads, setStads] = useState({
    'total': 0,
    'on': 0,
    'paused': 0,
    'finalized': 0
  })
  const [data, setData] = useState({})

  const getPred = async () => {
    const pred = await getPredictions(auth.token);
    const a = pred.res.data
    setTest(a.test)
    setPredData(a.prediction)
    console.log(a)
    console.log(test)
  }
  console.log(test)
  const getStad = async () => {
    const res = await stadisticsCampaign(auth.token)
    setStads(res.res.data);
    console.log(res.res.data)
  }

  useEffect(() => {
    getStad()
    getPred();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ]; */

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">

        <Typography variant="h4" sx={{ mb: 5 }}>
          Datos estadísticos de las campañas de Ads
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total de Campañas" total={stads.total} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Campañas Activas" total={stads.on} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Campañas Pausadas" total={stads.paused} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Campañas Finalizadas" total={stads.finalized} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>

        <Card sx={{ mb: 4 }}>
          <CardHeader title={'Predicciones'} subheader={'Pago por dia x Duracion de la campaña'} />

            <ScatterChart
              width={800}
              height={500}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Dias" unit="d" />
              <YAxis yAxisId="left" type="number" dataKey="y" name="Pago" unit="$" stroke="#8884d8" />
              <YAxis
                yAxisId="right"
                type="number"
                dataKey="y"
                name="Pago(p)"
                unit="$"
                orientation="right"
                stroke="#82ca9d"
                domain={[0, 60]}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />

              <Scatter yAxisId="left" name="A school" data={test} fill="#8884d8" />
              <Scatter yAxisId="right" name="A school" data={predData} fill="#82ca9d" />
            </ScatterChart>

        </Card>



        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <CampaignPrediction />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
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
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Campañas"
              subheader="Prediccion de inversion por dia"
              chartLabels={[44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]}
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

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
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

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
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

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
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
        </Grid>
      </Container>
    </Page>
  );
}
