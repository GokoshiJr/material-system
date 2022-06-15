import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react'; 
// @mui
import { styled } from '@mui/material/styles';
import { 
  Card, 
  Link, 
  Container, 
  Typography, 
  Button,
  Stack 
} from '@mui/material';
import Iconify from '../components/Iconify';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import ProfileForm from '../sections/@dashboard/profile/ProfileForm';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
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
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleUpdate = () => {
    setIsUpdateMode(!isUpdateMode)
  }

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
                User Data
              </Typography>
              {
                isUpdateMode
                ?
                <Button 
                  variant="contained" 
                  onClick={handleUpdate} 
                  startIcon={<Iconify icon="eva:close-outline" />}
                  color="error"
                >
                  Cancel
                </Button>
                :
                <Button 
                  variant="contained" 
                  onClick={handleUpdate} 
                  startIcon={<Iconify icon="eva:edit-outline" />}
                >
                  Update
                </Button>
              }
            </Stack>
            <ProfileForm
              setIsUpdateMode={setIsUpdateMode}
              isUpdateMode={isUpdateMode}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
