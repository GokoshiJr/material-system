import PropTypes from 'prop-types';
import { Card, CardHeader } from '@mui/material';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';


AppCampaignPredictionScatterPlot.propTypes = {
  test: PropTypes.array,
  predData: PropTypes.array
};

export default function AppCampaignPredictionScatterPlot({test, predData}) {
  return (    
    <Card sx={{ p: 4 }}>
      <CardHeader
        title={'Curva de predicción'}
        subheader={'Pago por dia x Duracion de la campaña'}
      />
      <ResponsiveContainer width={'99%'} height={400}>
      <ScatterChart
        width={1000}
        height={500}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Días" unit="d" />
        <YAxis
          yAxisId="left"
          type="number"
          dataKey="y"
          name="Pago"
          unit="$"
          stroke="#8884d8"
          domain={[0, 60]}
        />
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
        <Legend
          verticalAlign="top"
          heigth={36}
        />
        <Scatter yAxisId="left" name="Campañas" data={test} fill="#8884d8" />
        <Scatter yAxisId="right" name="Predicción" data={predData} fill="#82ca9d" />
      </ScatterChart>
      </ResponsiveContainer>
    </Card>    
  );
}
