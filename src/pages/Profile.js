import { useContext } from 'react';
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
import ProfileForm from '../sections/@dashboard/profile/ProfileForm';
// context
import { AppContext } from '../context/AppContext'

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

export default function Register() {
  
  const auth = useContext(AppContext)
  const { loggedEmployee } = auth

  return (
    <Page title="Profile">
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
                Perfil del Empleado
              </Typography>
              <Button
                variant="contained" size="small"
                component={RouterLink} to={`/dashboard/app`}
              >Regresar</Button>
            </Stack>
            <ProfileForm
              employee={loggedEmployee}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
