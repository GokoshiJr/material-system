import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';

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
    isPost,
    isVideo,
    campaignTypeId,
    campaignState,
    promotedPostLink,
    linkAPI,
    ubication,
    demographicsDataSegmentation,
    interestSegmentation,
    behaviorSegmentation,
    audienceAge,
    audienceGender,
    perDayBudget,
    promotionDuration
  } = campaign;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
      {/*
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
          */}
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
