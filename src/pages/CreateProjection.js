import { Link as RouterLink, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
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
import { ProjectionCreateForm } from '../sections/@dashboard/campaign';
// context
import { AppContext } from '../context/AppContext'
import { show } from '../utils/api/campaign'
import { getClients } from '../utils/api'
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

export default function Projection() {  
  const auth = useContext(AppContext)

  const { id } = useParams();

  const [campaign, setCampaign] = useState({
    _id: 'Cargando...',
    name: 'Cargando...'
  })

  const [clients, setClients] = useState([{_id: ''}])

  const _getCampaign = async () => {
    const { data } = await show(auth.token, id)
    setCampaign(data)
  }

  const _getClients = async () => {
    const { data } = await getClients(auth.token)
    setClients(data)
  }

  useEffect(() => {
    _getCampaign()
    _getClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page title="Proyeccion">
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
                Crear Proyección
              </Typography>
            </Stack>
            <ProjectionCreateForm 
              campaign={campaign}
              clients={clients}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
