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
import { CampaignCreateForm } from '../sections/@dashboard/campaign';

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
  title: PropTypes.string
};

export default function Register({  
  title
}) {
  return (
    <Page title="Crear Campaña">
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
                Crear Campaña
              </Typography>
            </Stack>
            <CampaignCreateForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
