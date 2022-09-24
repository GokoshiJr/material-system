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


AppCampaignAudienceAgeScatterPlot.propTypes = {  
  data: PropTypes.array
};

export default function AppCampaignAudienceAgeScatterPlot({ data }) {
  return (    
    <Card sx={{ p: 4 }}>
      <CardHeader
        title={'Dispersión de la edad de la audiencia target'}
        subheader={'Edad inicio - Edad tope'}
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
        <XAxis 
          type="number" 
          dataKey="x" 
          name="Edad inicio" 
          unit=" años"
        />
        <YAxis
          yAxisId="left"
          type="number"
          dataKey="y"
          name="Edad tope"
          unit=" años"
          stroke="#8884d8"
          domain={[0, 80]}
        />        
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend
          verticalAlign="top"
          heigth={36}
        />
        <Scatter yAxisId="left" name="Age" data={data} fill="#8884d8" />
      </ScatterChart>
      </ResponsiveContainer>
    </Card>    
  );
}
