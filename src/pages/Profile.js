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

export default function Register() {


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
            </Stack>
            <ProfileForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
