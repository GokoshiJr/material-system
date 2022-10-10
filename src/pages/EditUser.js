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
  employee: PropTypes.object,
  setEmployee: PropTypes.func,
  title: PropTypes.string
};

export default function Register({
  employee,
  setEmployee,
  title
}) {

  const [editEmployeeMode, setEditEmployeeMode] = useState(true);
  const [createEmployee, setCreateEmployee] = useState(true);

  return (
    <Page title="Empleado">
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
                {title} Empleado
              </Typography>
              <Button
                variant="contained" size="small"
                component={RouterLink} to={`/dashboard/user`}
              >Regresar</Button>
            </Stack>
            <ProfileForm
              employee={employee}
              setEmployee={setEmployee}
              editEmployeeMode={editEmployeeMode}
              setEditEmployeeMode={setEditEmployeeMode}
              createEmployee={createEmployee}
              setCreateEmployee={setCreateEmployee}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
