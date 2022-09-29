import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Stack
} from '@mui/material';
// components
import Page from '../components/Page';
// sections
import {
  CampaignEditForm
} from '../sections/@dashboard/campaign';
import ProjectionEditForm from '../sections/@dashboard/campaign/ProjectionEditForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'initial',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
}));

// ----------------------------------------------------------------------

Register.propTypes = {
  campaign: PropTypes.object,
  projection: PropTypes.object,
  title: PropTypes.string,
  showClientInCampaign: PropTypes.func
};

export default function Register({
  campaign,
  projection,
  title,
  showClientInCampaign
}) {
  return (
    <Page title="Campaña">
      <RootStyle>
        <Container>
          <ContentStyle>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                {title} Campaña
              </Typography>
            </Stack>
            <CampaignEditForm
              campaign={campaign}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={5}
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Proyección
              </Typography>
            </Stack>
            <ProjectionEditForm
              projection={projection}
              showClientInCampaign={showClientInCampaign}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
