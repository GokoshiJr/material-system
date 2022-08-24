import { useState, useEffect, useContext } from 'react';
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
// context
import { AppContext } from '../context/AppContext'
// api method
import { showEmployee } from '../utils/api';

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

export default function Register({
  employee,
  setEmployee,
  title
}) {

  const [editEmployeeMode, setEditEmployeeMode] = useState(true);
  const [createEmployee, setCreateEmployee] = useState(true);

  return (
    <Page title="User 2">
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
            </Stack>
            <ProfileForm
              employee={employee}
              setEmployee={setEmployee}
              editEmployeeMode={editEmployeeMode}
              createEmployee={createEmployee}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
