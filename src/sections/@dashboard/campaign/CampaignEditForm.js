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
import { updateClient, showClient, createClient } from '../../../utils/api';

// ----------------------------------------------------------------------

CampaignEditForm.propTypes = {
  campaign: PropTypes.object
};

export default function CampaignEditForm({
  campaign
}) {
  const auth = useContext(AppContext);

  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const [showCreateButton, setShowCreateButton] = useState(false);

  const CampaignEditFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, '¡Muy corto!').max(30, '¡Muy largo!')
      .required('El nombre es requerido'),
    ageFloor: Yup.number()
      .required('El nombre es requerido'),
    ageTop: Yup.number()
      .required('El nombre es requerido')
  });

  const formik = useFormik({
    initialValues: {
      name: 'Cargando...',
      ageFloor: 0,
      ageTop: 0,
      audienceGender: 'Cargando...',
      campaignState: 'Cargando...',
      campaignTypeId: {
        name: 'Cargando...'
      },
      demographicsDataSegmentation: 'Cargando...',
      initDate: 'Cargando...',
      finalDate: 'Cargando...',
      interestSegmentation: 'Cargando...',
      isPost: 'Cargando...',
      isVideo: 'Cargando...',
      linkAPI: 'Cargando...',
      perDayBudget: 0,
      promotionDuration: 0,
      ubication: 'Cargando...'
    },
    validationSchema: CampaignEditFormSchema
  });

  const {
    getFieldProps,
    values,
    setValues,
    errors,
    touched,
    resetForm
  } = formik;

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
    setValues({
      name: campaign.name,
      ageFloor: campaign.audienceAge[0],
      ageTop: campaign.audienceAge[1],
      audienceGender: campaign.audienceGender,
      campaignState: campaign.campaignState,
      campaignTypeId: campaign.campaignTypeId.name,
      demographicsDataSegmentation: campaign.demographicsDataSegmentation,
      initDate: campaign.initDate,
      finalDate: campaign.finalDate,
      interestSegmentation: campaign.interestSegmentation,
      isPost: campaign.isPost,
      isVideo: campaign.isVideo,
      linkAPI: campaign.linkAPI,
      perDayBudget: campaign.perDayBudget,
      promotionDuration: campaign.promotionDuration,
      ubication: campaign.ubication
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
    console.log('epa')
    if (campaign) handleResetValues();
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
  }, [campaign])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name='name'
            label='Nombre'
            {...getFieldProps('name')}
            inputProps={{readOnly: true}}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            onChange={handleChange}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='ageFloor'
              label='Limite inferior (años)'
              {...getFieldProps('ageFloor')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.ageFloor && errors.ageFloor)}
              helperText={touched.ageFloor && errors.ageFloor}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='ageTop'
              label='Limite superior (años)'
              {...getFieldProps('ageTop')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.ageTop && errors.ageTop)}
              helperText={touched.ageTop && errors.ageTop}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='audienceGender'
              label='Genero de la audiencia'
              {...getFieldProps('audienceGender')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.audienceGender && errors.audienceGender)}
              helperText={touched.audienceGender && errors.audienceGender}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='campaignState'
              label='Estado actual de la campaña'
              {...getFieldProps('campaignState')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.campaignState && errors.campaignState)}
              helperText={touched.campaignState && errors.campaignState}
              onChange={handleChange}
            />
          </Stack>
          <TextField
            fullWidth
            name='campaignTypeId'
            label='Tipo de campaña'
            {...getFieldProps('campaignTypeId')}
            inputProps={{readOnly: true}}
            error={Boolean(touched.campaignTypeId && errors.campaignTypeId)}
            helperText={touched.campaignTypeId && errors.campaignTypeId}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='demographicsDataSegmentation'
            label='Segmentacion demográfica'
            {...getFieldProps('demographicsDataSegmentation')}
            inputProps={{readOnly: true}}
            error={Boolean(touched.demographicsDataSegmentation && errors.demographicsDataSegmentation)}
            helperText={touched.demographicsDataSegmentation && errors.demographicsDataSegmentation}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='interestSegmentation'
            label='Segmentacion por intereses'
            {...getFieldProps('interestSegmentation')}
            inputProps={{readOnly: true}}
            error={Boolean(touched.interestSegmentation && errors.interestSegmentation)}
            helperText={touched.interestSegmentation && errors.interestSegmentation}
            onChange={handleChange}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='isPost'
              label='Publicacion de Posts'
              {...getFieldProps('isPost')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.isPost && errors.isPost)}
              helperText={touched.isPost && errors.isPost}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='isVideo'
              label='Publicacion de videos'
              {...getFieldProps('isVideo')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.isVideo && errors.isVideo)}
              helperText={touched.isVideo && errors.isVideo}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='perDayBudget'
              label='Inversion por día ($)'
              {...getFieldProps('perDayBudget')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.perDayBudget && errors.perDayBudget)}
              helperText={touched.perDayBudget && errors.perDayBudget}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='promotionDuration'
              label='Duracion de la campaña (días)'
              {...getFieldProps('promotionDuration')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.promotionDuration && errors.promotionDuration)}
              helperText={touched.promotionDuration && errors.promotionDuration}
              onChange={handleChange}
            />
          </Stack>

            <TextField
              fullWidth
              name='ubication'
              label='Ubicacion'
              {...getFieldProps('ubication')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.ubication && errors.ubication)}
              helperText={touched.ubication && errors.ubication}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='linkAPI'
              label='Link de la API'
              {...getFieldProps('linkAPI')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.linkAPI && errors.linkAPI)}
              helperText={touched.linkAPI && errors.linkAPI}
              onChange={handleChange}
            />

        </Stack>
      </Form>
    </FormikProvider>
  );
}
