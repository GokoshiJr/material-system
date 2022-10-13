import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// sweetalert2
import Swal from 'sweetalert2';
// context
import { AppContext } from '../../../context/AppContext';
// api method
import { updateEmployee, showEmployee, createEmployee } from '../../../utils/api';

// ----------------------------------------------------------------------

ProfileForm.propTypes = {
  employee: PropTypes.object,
  editEmployeeMode: PropTypes.bool,
  setEmployee: PropTypes.func
};

export default function ProfileForm({
  employee,
  editEmployeeMode,
  setEmployee
}) {
  const { id } = useParams();

  const auth = useContext(AppContext);

  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const [showCreateButton, setShowCreateButton] = useState(false);

  const [initDate, setInitDate] = useState(Date.now())

  const ProfileFormSchema = Yup.object().shape({
    email:
      Yup.string()
      .email('Ingresa un correo válido')
      .required('El correo es requerido'),
    name: Yup.string()
      .min(2, '¡Muy corto!').max(30, '¡Muy largo!')
      .required('El nombre es requerido'),
    lastName: Yup.string()
      .min(2, '¡Muy corto!').max(30, '¡Muy largo!')
      .required('El apellido es requerido'),
    phoneNumber: Yup.string()
      .min(12, '¡Muy corto!').max(20, '¡Muy largo!')
      .required('El teléfono es requerido'),
    socialId: Yup.string()
      .min(8, '¡Muy corto!').max(10, '¡Muy largo!')
      .required('La cédula es requerida')
  });

  const formik = useFormik({
    initialValues: {
      email: 'Cargando...',
      name: 'Cargando...',
      lastName: 'Cargando...',
      phoneNumber: 'Cargando...',
      socialId: 'Cargando...'
    },
    validationSchema: ProfileFormSchema
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
    const { data } = await showEmployee(auth.token, id)
    data.userId = data.userId.email
    setEmployee(data)
    if (id === auth.loggedEmployee._id) auth.setLoggedEmployee(data)
  }

  const handleChangeInitDate = (newValue) => {
    setInitDate(newValue);
    if (employee) setShowUpdateButton(true);
    if (!employee) setShowCreateButton(true);
  }
  const handleUpdateEmployee = async () => {
    const res = await updateEmployee(auth.token, id, {...values, birthDate: initDate});
    // actualiza el empleado del state
    showEmp()
    Swal.fire({
      icon: res.icon,
      title: res.title,
      background: `rgba(210,210,210,1)`,
      backdrop: `rgba(0,0,0,0)`
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        window.location.href = `/dashboard/user`    
      }
    })
    
  }

  const handleResetValues = () => {
    // const birthDate = new Date();
    setValues({
      email: employee.userId,
      name: employee.name,
      lastName: employee.lastName,
      phoneNumber: employee.phoneNumber,
      socialId: employee.socialId
    })
    if (employee.birthDate) setInitDate(new Date(employee.birthDate))
    if (!employee.birthDate) setInitDate(Date.now())
    setShowUpdateButton(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
    if (employee) setShowUpdateButton(true);
    if (!employee) setShowCreateButton(true);
  }

  /* create employee */
  const handleCleanValues = () => {
    resetForm()
    setValues({
      email: '',
      name: '',
      lastName: '',
      phoneNumber: '',
      socialId: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsCount = Object.keys(errors)
    if (errorsCount.length === 0) {
      const res = await createEmployee(auth.token, {
        ...values,
        birthDate: initDate
      });
      Swal.fire({
        icon: res.icon,
        title: res.title,
        background: `rgba(210,210,210,1)`,
        backdrop: `rgba(0,0,0,0)`
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.href = `/dashboard/user`    
        }
      })
      handleCleanValues()
    }
  }

  useEffect(() => {
    if (employee) handleResetValues()
    if (!employee) {
      setValues({
        email: '',
        name: '',
        lastName: '',
        phoneNumber: '',
        socialId: ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee, setValues])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name='email'
            label='Correo'
            {...getFieldProps('email')}
            inputProps={{readOnly: !editEmployeeMode}}
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
              inputProps={{readOnly: !editEmployeeMode}}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='lastName'
              label='Apellido'
              {...getFieldProps('lastName')}
              inputProps={{readOnly: !editEmployeeMode}}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              onChange={handleChange}
            />
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Fecha de nacimiento"
              inputFormat="dd/MM/yyyy"
              readOnly={!editEmployeeMode}
              value={initDate}
              name='initDate'
              onChange={handleChangeInitDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            name='phoneNumber'
            label='Teléfono'
            {...getFieldProps('phoneNumber')}
            inputProps={{readOnly: !editEmployeeMode}}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='socialId'
            label='Cédula'
            {...getFieldProps('socialId')}
            inputProps={{readOnly: !editEmployeeMode}}
            error={Boolean(touched.socialId && errors.socialId)}
            helperText={touched.socialId && errors.socialId}
            onChange={handleChange}
          />
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
