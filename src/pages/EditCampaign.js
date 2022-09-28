import PropTypes from 'prop-types';
import { useState } from 'react';
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
import ProfileForm from '../sections/@dashboard/profile/ProfileForm';

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
  setCampaign: PropTypes.func,
  title: PropTypes.string
};

export default function Register({
  campaign,
  setCampaign,
  title
}) {

  const [editEmployeeMode, setEditEmployeeMode] = useState(true);
  const [createEmployee, setCreateEmployee] = useState(true);

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
            CampaignForm
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
