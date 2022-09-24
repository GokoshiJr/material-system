import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';

// ----------------------------------------------------------------------

AppCampaignTypesBarChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppCampaignTypesBarChart({ title, subheader, chartData, ...other }) {
  const [state, setState] = useState({
  	options: {
  		chart: {
  			id: "basic-bar"
  		},
  		xaxis: {
  			categories: ['1991', '1992', '1993']
  		}
  	},
  	series: [{
  		name: 'series-1',
  		data: [30, 40, 45]
  	}]
  })  
  
  useEffect(() => {	
		if (chartData) {
			setState({			
				options: {
			  	chart: {
			  		id: "basic-bar"		  			
			  	},
			  	xaxis: {
			  		categories: chartData.map(el => el.label)
			  	}
			 	},
			  series: [{
			  	name: 'series-1',
			  	data: chartData.map(el => el.value)
		  	}]
			})
		}
  }, [chartData])

  return (
    <Card {...other}>
    	<CardHeader title={title} subheader={subheader} />
    	<Box sx={{ mx: 3 }} dir="ltr">
        <Chart
        	options={state.options}
        	series={state.series}
        	type="bar"
        	width="99%"
        	height="400"
        	sx={{ p: 4 }}
        />
    	</Box>
    </Card>
  );
}
