import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// components
import Page from '../components/Page';
// sections
import ClientForm from '../sections/@dashboard/client/ClientForm';

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

EditClient.propTypes = {
  client: PropTypes.object,
  setClient: PropTypes.func,
  title: PropTypes.string
};

export default function EditClient({
  client,
  setClient,
  title
}) {

  const [editClientMode, setEditClientMode] = useState(true);
  const [createClient, setCreateClient] = useState(true);

  return (
    <Page title="Cliente">
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
                {title} Cliente
              </Typography>
              <Button
                variant="contained" size="small"
                component={RouterLink} to={`/dashboard/client`}
              >Regresar</Button>
            </Stack>
            <ClientForm
              client={client}
              setClient={setClient}
              editClientMode={editClientMode}
              setEditClientMode={setEditClientMode}
              createClient={createClient}
              setCreateClient={setCreateClient}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
