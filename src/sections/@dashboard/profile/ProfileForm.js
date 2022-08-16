import { useContext, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
// context
import { AppContext } from '../../../context/AppContext'

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const auth = useContext(AppContext)
  const {
    loggedEmployee,
    loggedUser
  } = auth

  const formik = useFormik({
    initialValues: {
      email: 'Cargando...',
      name: 'Cargando...',
      lastName: 'Cargando...',
      phoneNumber: 'Cargando...',
      socialId: 'Cargando...',
      birthDate: 'Cargando...'
    }
  });

  const {
    getFieldProps,
    setValues
  } = formik;

  /*
  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({...formik.values, [name]: value});
  }
  */

  useEffect(() => {
    if (loggedEmployee) {
      const birthDate = new Date(loggedEmployee.birthDate);
      setValues({
        email: loggedUser.email,
        name: loggedEmployee.name,
        lastName: loggedEmployee.lastName,
        phoneNumber: loggedEmployee.phoneNumber,
        socialId: loggedEmployee.socialId,
        birthDate:  birthDate.toLocaleDateString()
      })
    }
  }, [loggedEmployee, loggedUser, setValues])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name='email'
            label='Correo'
            {...getFieldProps('email')}
            inputProps={{readOnly: true}}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='name'
              label='Nombre'
              {...getFieldProps('name')}
              inputProps={{readOnly: true}}
            />
            <TextField
              fullWidth
              name='lastName'
              label='Apellido'
              {...getFieldProps('lastName')}
              inputProps={{readOnly: true}}
            />
          </Stack>
          <TextField
            fullWidth
            name='birthDate'
            label='Fecha de Nacimiento'
            {...getFieldProps('birthDate')}
            inputProps={{readOnly: true}}
          />
          <TextField
            fullWidth
            name='phoneNumber'
            label='Telefono'
            {...getFieldProps('phoneNumber')}
            inputProps={{readOnly: true}}
          />
          <TextField
            fullWidth
            name='socialId'
            label='Cedula'
            {...getFieldProps('socialId')}
            inputProps={{readOnly: true}}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
