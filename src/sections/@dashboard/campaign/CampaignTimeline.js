import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { 
  Card, 
  Typography, 
  CardHeader, 
  CardContent, 
  Link,
  Divider,
  Box,
  Button 
} from '@mui/material';

import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

// @mui
import { alpha, styled } from '@mui/material/styles';

import SimpleBarReact from 'simplebar-react';
import Iconify from '../../../components/Iconify';

// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: 480,
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 2,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  const { id } = useParams()
  return (
    <Card {...other} sx={{ maxHeight: 800}}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
      <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} {...other}>
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      </SimpleBarStyle>
    </RootStyle>
        <Divider />

      <Box sx={{ mt:2, textAlign: 'right' }}>
        <Link to={`/dashboard/clientCampaign/${id}`} 
          color="inherit" 
          underline="hover" 
          component={RouterLink}
        >
          <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            Ver todas las campañas
          </Button>
        </Link>
      </Box>
      
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { type, title, time, id } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'warning') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'error') ||
            'primary'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>

        <Link to={`/dashboard/campaign/${id}`} 
          color="inherit" 
          underline="hover" 
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            { title }
          </Typography>
        </Link>


        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
