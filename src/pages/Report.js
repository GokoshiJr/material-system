import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  ButtonGroup
} from '@mui/material';
// context
import { AppContext } from '../context/AppContext';
// components
import Page from '../components/Page';
// api method
import { show, clientInCampaign } from '../utils/api/campaign'
// sections

import ReportForm from '../sections/@dashboard/campaign/ReportForm';

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

export default function Report() {
  const auth = useContext(AppContext);

  const { id } = useParams();

  const [projection, setProjection] = useState({
    balances: [-1,-2,3]
  })

  const [campaign, setCampaign] = useState({
    _id: 'Cargando...',
    promotePostLink: ['Cargando...'],
    perDayBudget: 1,
    promotionDuration: 1
  })

  const getProjection = async () => {
    // retorna la campaña por su id
    const { data } = await clientInCampaign(auth.token, id);
    setProjection(data);
  }

  const getCampaign = async () => {
    // retorna la campaña por su id
    const { data } = await show(auth.token, id);
    setCampaign(data);
  }

  useEffect(() => {
    getProjection()
    getCampaign()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Page title="Reporte de Campaña">
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
                Reporte de Campaña
              </Typography>
            </Stack>
            <ReportForm
              campaign={campaign}
              projection={projection}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
