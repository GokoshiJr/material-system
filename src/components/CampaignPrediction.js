import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, TextField, Button, Card, CardHeader, Box } from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
// context
import { AppContext } from '../context/AppContext';
// api method
import { oneHotPrediction } from '../utils/ia';

// ----------------------------------------------------------------------

CampaignPrediction.propTypes = {};

export default function CampaignPrediction() {

  const auth = useContext(AppContext);

  const PredictFormSchema = Yup.object().shape({
    duration: Yup.number()
      .min(7, 'Minimo 7 dias')
      .max(120, 'Maximo 120 dias')
  });

  const formik = useFormik({
    initialValues: {
      duration: 0,
      pay: 0,
    },
    validationSchema: PredictFormSchema
  });

  const {
    getFieldProps,
    values,
    setValues,
    errors,
    touched,
    resetForm
  } = formik;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
  }

  const handleCleanValues = () => {
    resetForm()
    setValues({ duration: 1, pay: 1 })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsCount = Object.keys(errors)
    if (errorsCount.length === 0) {
      console.log('create employee')
      alert(values.duration)
      const res = await oneHotPrediction(auth.token, values.duration);

      Swal.fire({
        icon: 'success',
        title: res,
        background: `rgba(210,210,210,1)`,
        backdrop: `rgba(0,0,0,0)`
      })

      setValues({
        pay: 10
      })

    }
  }

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title={'Prediccion'}
        subheader={'Ingrese la duracion de la campaña para estimar la inversion por dia'}
      />
      <Box sx={{ p: 3, pb: 1, mb: 3 }} dir="ltr">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                <TextField
                  fullWidth
                  name='duration'
                  label='Duracion de la campaña'
                  {...getFieldProps('duration')}
                  error={Boolean(touched.duration && errors.duration)}
                  helperText={touched.duration && errors.duration}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  name='pay'
                  label='Pago por dia'
                  {...getFieldProps('pay')}
                  error={Boolean(touched.pay && errors.pay)}
                  helperText={touched.pay && errors.pay}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" color="error" onClick={handleCleanValues}>
                  Limpiar
                </Button>
                <Button variant="contained" type="submit">
                  Calcular
                </Button>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
