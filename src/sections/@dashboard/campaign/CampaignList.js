import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import CampaignCard from './CampaignCard';

// ----------------------------------------------------------------------

CampaignList.propTypes = {
  campaigns: PropTypes.array.isRequired
};

export default function CampaignList({ campaigns, ...other }) {
  const getImage = () => {
    let url = ''
    const select = Math.floor(Math.random() * 2)
    // product
    if (select === 0) {
      const index = Math.floor(Math.random() * 24) + 1
      url = `/static/mock-images/products/product_${index}.jpg`;
    }
    // cover
    if (select === 1) {
      const index = Math.floor(Math.random() * 24) + 1
      url = `/static/mock-images/covers/cover_${index}.jpg`;
    }
    url = `/static/mock-images/box_1.jpg`;
    return url
  }

  return (
    <Grid container spacing={3} {...other}>
      {campaigns.map((campaign) => (
        <Grid key={campaign._id} item xs={12} sm={6} md={3}>
          <CampaignCard campaign={campaign} image={getImage()} />
        </Grid>
      ))}
    </Grid>
  );
}
