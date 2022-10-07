import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils

// components
import Label from '../../../components/Label';


// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

CampaignCard.propTypes = {
  campaign: PropTypes.object,
  image: PropTypes.string
};

export default function CampaignCard({ campaign, image }) {
  const {
    _id,
    name,
    campaignTypeId,
    campaignState
  } = campaign;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {campaignState && (
          <Label
            variant="filled"
            color={(campaignState === 'finalized' && 'error') || 
            (campaignState === 'paused' && 'warning') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {campaignState}
          </Label>
        )}
          <ProductImgStyle alt={'name'} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`/dashboard/campaign/${_id}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name} 
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="string" sx={{ fontSize: 14 }}>
            {campaignTypeId.name}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
