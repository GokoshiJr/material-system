import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, TextField, Button } from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
// context
import { AppContext } from '../../../context/AppContext';
// api method


// ----------------------------------------------------------------------

ProjectionEditForm.propTypes = {
  projection: PropTypes.object
};

export default function ProjectionEditForm({
  projection
}) {
  const auth = useContext(AppContext);

  const ProjectionEditFormSchema = Yup.object().shape({
    campaignId: Yup.string()
    .required('El nombre es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      balances: [0],
      campaignId: 'Cargando...',
      clientId: 'Cargando...',
      link: 'Cargando...'
    },
    validationSchema: ProjectionEditFormSchema
  });

  const {
    getFieldProps,
    values,
    setValues,
    errors,
    touched,
    resetForm
  } = formik;

  const balance = projection.balances.map((balance, index) => 
    <li key={index}>{ balance }</li>
  )
  const handleUpdateEmployee = async () => {
    // const res = await updateClient(auth.token, id, values);
    // actualiza el empleado del state
    // showEmp()
    // Swal.fire({
    //   icon: res.icon,
    //   title: res.title,
    //   background: `rgba(210,210,210,1)`,
    //   backdrop: `rgba(0,0,0,0)`
    // })
  }

  const handleResetValues = () => {
    console.log(projection)
    setValues({
      // balances: projection.balances[0],
      clientId: `${projection.clientId.name} ${projection.clientId.lastName}`,
      campaignId: projection.campaignId,
      link: projection.link
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
    // if (client) setShowUpdateButton(true);
    // if (!client) setShowCreateButton(true);
  }

  /* create client */
  const handleCleanValues = () => {
    // resetForm()
    // setValues({
    //   name: '',
    //   lastName: '',
    //   email: '',
    //   phoneNumber: '',
    //   userAccount: '',
    //   password: '',
    //   socialPlatform: '',
    //   associated: ''
    // })
  }

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const errorsCount = Object.keys(errors)
    // if (errorsCount.length === 0) {
    //   console.log('create client')
    //   const res = await createClient(auth.token, values);
    //   Swal.fire({
    //     icon: res.icon,
    //     title: res.title,
    //     background: `rgba(210,210,210,1)`,
    //     backdrop: `rgba(0,0,0,0)`
    //   })
    //   handleCleanValues()
    // }
  }

  useEffect(() => {
    console.log('epa projection')
    if (projection) handleResetValues();
    // if (!client) {
    //   setValues({
    //     name: '',
    //     lastName: '',
    //     email: '',
    //     phoneNumber: '',
    //     userAccount: '',
    //     password: '',
    //     socialPlatform: '',
    //     associated: true
    //   })
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projection])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name='clientId'
            label='Cliente'
            {...getFieldProps('clientId')}
            inputProps={{readOnly: true}}
            error={Boolean(touched.clientId && errors.clientId)}
            helperText={touched.clientId && errors.clientId}
            onChange={handleChange}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='link'
              label='Limite inferior (años)'
              {...getFieldProps('link')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.link && errors.link)}
              helperText={touched.link && errors.link}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='link'
              label='Limite superior (años)'
              {...getFieldProps('link')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.link && errors.link)}
              helperText={touched.link && errors.link}
              onChange={handleChange}
            />
          </Stack>
          { balance }
        </Stack>
      </Form>
    </FormikProvider>
  );
}
