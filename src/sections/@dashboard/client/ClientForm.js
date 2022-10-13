import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
// context
import { AppContext } from '../../../context/AppContext';
// api method
import { updateClient, showClient, createClient } from '../../../utils/api';

// ----------------------------------------------------------------------

ClientForm.propTypes = {
  client: PropTypes.object,
  editClientMode: PropTypes.bool,
  setClient: PropTypes.func
};

export default function ClientForm({
  client,
  setClient,
  editClientMode
}) {
  const { id } = useParams();
  const auth = useContext(AppContext);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(false);

  const ClientFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, '¡Muy corto!').max(30, '¡Muy largo!')
      .required('El nombre es requerido'),
    lastName: Yup.string()
      .min(2, '¡Muy corto!').max(30, '¡Muy largo!')
      .required('El apellido es requerido'),
    email:
      Yup.string()
      .email('Ingresa un correo valido')
      .required('El correo es requerido'),
    phoneNumber: Yup.string()
      .required('El telefono es requerido'),
    socialPlatform:Yup.string()
      .required('La plataforma en requerida')
  });

  const formik = useFormik({
    initialValues: {
      name: 'Cargando...',
      lastName: 'Cargando...',
      email: 'Cargando...',
      phoneNumber: 'Cargando...',
      userAccount: 'Cargando...',
      password: 'Cargando...',
      socialPlatform: 'Cargando...'
    },
    validationSchema: ClientFormSchema
  });

  const {
    getFieldProps,
    values,
    setValues,
    errors,
    touched,
    resetForm
  } = formik;

  const showEmp = async () => {
    const { data } = await showClient(auth.token, id)
    setClient(data)
  }

  const handleUpdateEmployee = async () => {
    const res = await updateClient(auth.token, id, values);
    // actualiza el empleado del state
    showEmp()
    Swal.fire({
      icon: res.icon,
      title: res.title,
      background: `rgba(210,210,210,1)`,
      backdrop: `rgba(0,0,0,0)`
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.href = `/dashboard/client`    
      }
    })
  }

  const handleResetValues = () => {
    setValues({
      email: client.email,
      name: client.name,
      lastName: client.lastName,
      phoneNumber: client.phoneNumber,
      userAccount: client.userAccount,
      password: client.password,
      socialPlatform: client.socialPlatform,
    })
    setShowUpdateButton(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
    if (client) setShowUpdateButton(true);
    if (!client) setShowCreateButton(true);
  }

  /* create client */
  const handleCleanValues = () => {
    resetForm()
    setValues({
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      userAccount: '',
      password: '',
      socialPlatform: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsCount = Object.keys(errors)
    if (errorsCount.length === 0) {
      const res = await createClient(auth.token, values);
      Swal.fire({
        icon: res.icon,
        title: res.title,
        background: `rgba(210,210,210,1)`,
        backdrop: `rgba(0,0,0,0)`
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.href = `/dashboard/client`    
        }
      })
      handleCleanValues()
    }
  }

  useEffect(() => {
    if (client) handleResetValues();
    if (!client) {
      setValues({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userAccount: '',
        password: '',
        socialPlatform: ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, setValues])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name='email'
            label='Correo'
            {...getFieldProps('email')}
            inputProps={{readOnly: !editClientMode}}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            onChange={handleChange}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='name'
              label='Nombre'
              {...getFieldProps('name')}
              inputProps={{readOnly: !editClientMode}}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='lastName'
              label='Apellido'
              {...getFieldProps('lastName')}
              inputProps={{readOnly: !editClientMode}}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              onChange={handleChange}
            />
          </Stack>
          <TextField
            fullWidth
            name='phoneNumber'
            label='Teléfono'
            {...getFieldProps('phoneNumber')}
            inputProps={{readOnly: !editClientMode}}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='userAccount'
            label='Cuenta de Usuario'
            {...getFieldProps('userAccount')}
            inputProps={{readOnly: !editClientMode}}
            error={Boolean(touched.userAccount && errors.userAccount)}
            helperText={touched.userAccount && errors.userAccount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='password'
            label='Contraseña'
            {...getFieldProps('password')}
            inputProps={{readOnly: !editClientMode}}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="socialPlatform-label">Plataforma</InputLabel>
            <Select
              name='socialPlatform'
              labelId="socialPlatform-label"
              id="socialPlatform"
              label="Plataforma"
              {...getFieldProps('socialPlatform')}
              onChange={handleChange}
            >
              <MenuItem disable={"true"} key={''} value={''}>Seleccione una plataforma</MenuItem>
              <MenuItem key={'Facebook'} value={'Facebook'}>Facebook</MenuItem>
              <MenuItem key={'Instagram'} value={'Instagram'}>Instagram</MenuItem>
              <MenuItem key={'Youtube'} value={'Youtube'}>Youtube</MenuItem>
            </Select>
          </FormControl>

          {showUpdateButton &&
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" onClick={handleUpdateEmployee}>
                Actualizar
              </Button>
              <Button variant="contained" color="error" onClick={handleResetValues}>
                Cancelar
              </Button>
            </Stack>
          }
          {showCreateButton &&
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" color="error" onClick={handleCleanValues}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Crear
              </Button>
            </Stack>
          }
        </Stack>
      </Form>
    </FormikProvider>
  );
}
