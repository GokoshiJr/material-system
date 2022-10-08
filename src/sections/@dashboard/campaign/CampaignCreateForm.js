
import { useContext, useEffect, useState } from 'react';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import {
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,

  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
// date-fns
import { differenceInDays } from 'date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// context
import { AppContext } from '../../../context/AppContext';
// api method
import { getCampaignTypes, store } from '../../../utils/api/campaign';


// ----------------------------------------------------------------------

export default function CampaignCreateForm() {
  const auth = useContext(AppContext);

  const [audienceGenderArray, setAudienceGenderArray] = useState([
    'Mujeres', 'Hombres', 'Ambos'
  ])

  const [interestSegmentationArray, setInterestSegmentationArray] = useState([
    'Aficiones y Actividades', 'Comida y bebidas', 'Compras y Moda', 
    'Deportes', 'Entretenimiento', 'Familia', 'Fitness', 'Negocios', 'Tecnologia'
  ])

  const [destinationArray, setDestinationArray] = useState([
    'Tu perfil', 
    'Tu sitio web', 'Tus mensajes Directo. (MSN de IG & FB)', 
    'API o Link de WhatsApp'
  ])

  const [ubicationArray, setUbicationArray] = useState([
    'Carabobo', 'Lara', 'Aragua', 'Miranda',
    'Guarico', 'Distrito Capital'
  ])

  const [
    demographicsDataSegmentationArray, 
    setDemographicsDataSegmentationArray
  ] = useState(['Nivel de ingresos', 'Edad', 'Religion', 'Educacion'])

  const [campaignTypes, setCampaignTypes] = useState([])

  const [initDate, setInitDate] = useState(Date.now())

  const [finalDate, setFinalDate] = useState(Date.now())

  const [link, setLink] = useState('')

  const [isLinkError, setIsLinkError] = useState(false)

  const CampaignEditFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, '¡Muy corto!').max(30, '¡Muy largo!')
      .required('El nombre es requerido'),
    ageFloor: Yup.number()
      .required('El nombre es requerido'),
    ageTop: Yup.number()
      .required('El nombre es requerido'),
    

  });

  const formik = useFormik({
    initialValues: {
      
      name: '',
      isPost: '',
      isVideo: '',
      campaignTypeId: '',
      promotePostLink: [],
      destination: '',
      linkAPI: '',
      ubication: '',
      demographicsDataSegmentation: '',
      interestSegmentation: '',
      ageFloor: 0,
      ageTop: 0,
      audienceGender: '',
      perDayBudget: 0,
      promotionDuration: 0,
    },
    validationSchema: CampaignEditFormSchema
  });

  const {
    getFieldProps,
    values,
    setValues,
    errors,
    touched,
    resetForm,
    setErrors
  } = formik;

  const handleCleanValues = () => {
    resetForm()
    setInitDate(Date.now())
    setFinalDate(Date.now())
    setLink('')
    setValues({
      name: '',
      isPost: '',
      isVideo: '',
      campaignTypeId: '',
      promotePostLink: [],
      destination: '',
      linkAPI: '',
      ubication: '',
      demographicsDataSegmentation: '',
      interestSegmentation: '',
      ageFloor: 0,
      ageTop: 0,
      audienceGender: '',
      perDayBudget: 0,
      promotionDuration: 0
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
  }

  const handleChangeInitDate = (newValue) => {
    setInitDate(newValue);
  }

  const handleChangeFinalDate = (newValue) => {
    setFinalDate(newValue);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const campaign = {
      ...values,
      initDate,
      finalDate,
      audienceAge: [Number(values.ageFloor), Number(values.ageTop)],
      perDayBudget: Number(values.perDayBudget),
      promotionDuration: differenceInDays(finalDate, initDate),
      isPost: Boolean(values.isPost),
      isVideo: Boolean(values.isVideo)
    }

    const res = await store(auth.token, campaign)
    Swal.fire({
      icon: 'success',
      title: 'Campaña creada con éxito',
      background: `rgba(210,210,210,1)`,
      backdrop: `rgba(0,0,0,0)`
    })
    handleCleanValues() 
  }

  const _getCampaignTypes = async () => {
    const { data } = await getCampaignTypes(auth.token)    
    setCampaignTypes(data)
  }

  const handleLink = (event) => {
    const { name, value } = event.target;
    setLink(value)
  }

  const handleAddPromoteLink = async () => {
    if (link.length > 4) {
      setIsLinkError(false)
      values.promotePostLink.push(link)
      setLink('')
    }
    else {
      setIsLinkError(true)
    }
  }

  const linkList = values.promotePostLink.map((el, index) => 
    <ListItem disablePadding key={index} sx={{ 
      mt: 2,
      borderRadius: '10px', 
      border: '1px solid', 
    }}>
      <ListItemButton>
        <ListItemText primary={`${index+1}. $`} />
      </ListItemButton>
    </ListItem>
  )

  useEffect(() => {
    _getCampaignTypes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name='name'
            label='Nombre'
            {...getFieldProps('name')}
            inputProps={{readOnly: !true}}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            onChange={handleChange}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth>

              <InputLabel id="epa">Publicación de Posts</InputLabel>
              <Select
                name='isPost'
                labelId='isPost-label'
                id='isPost'
                {...getFieldProps('isPost')}
                label="Publicación de Posts"
                onChange={handleChange}
              >
                <MenuItem value={'true'}>Si</MenuItem>
                <MenuItem value={'false'}>No</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="epa">Publicación de Videos</InputLabel>
              <Select
                name='isVideo'
                labelId='isVideo-label'
                id='isVideo'
                {...getFieldProps('isVideo')}
                label="Publicación de Videos"
                onChange={handleChange}
              >
                <MenuItem value={'true'}>Si</MenuItem>
                <MenuItem value={'false'}>No</MenuItem>
              </Select>
            </FormControl>

          </Stack>

          <FormControl fullWidth>
            <InputLabel id="campaignTypeId-label">Tipo de Campaña</InputLabel>
            <Select
              name='campaignTypeId'
              labelId="campaignTypeId-label"
              id="campaignTypeId"
              {...getFieldProps('campaignTypeId')}
              label="Tipo de campaña"
              onChange={handleChange}
            >
              {campaignTypes.map((el) => 
                <MenuItem key={el._id} value={el._id}>{el.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de Inicio"
                inputFormat="dd/MM/yyyy"
                value={initDate}
                name='initDate'
                onChange={handleChangeInitDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de finalizacion"
                inputFormat="dd/MM/yyyy"
                value={finalDate}
                name='finalDate'
                onChange={handleChangeFinalDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='name'
              label='Links de promocion'
              value={link}
              inputProps={{readOnly: !true}}
              error={Boolean(isLinkError && 'errors.linkError')}
              helperText={isLinkError && 'Ingrese un link valido'}
              onChange={handleLink}
            />
            <Button variant="contained" color="primary" onClick={handleAddPromoteLink}>
              Añadir
            </Button>
          </Stack>

          {values.promotePostLink.map((el, index) => 
            <ListItem disablePadding key={index} 
              sx={{
                borderRadius: '10px', 
                border: '1px solid #D3D3D3', 
              }}
            >
              <ListItemButton>
                <ListItemText primary={`Link ${index+1}. ${el}`} />
              </ListItemButton>
            </ListItem>
          )}

          <FormControl fullWidth>
            <InputLabel id="destination-label">Destino de la Campaña</InputLabel>
            <Select
              name='destination'
              labelId="destination-label"
              id="destination"
              {...getFieldProps('destination')}
              label="Destino de la Campaña"
              onChange={handleChange}
            >
              {destinationArray.map((el, index) => 
                <MenuItem key={index} value={el}>{el}</MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            name='linkAPI'
            label='Link de la API (Opcional)'
            {...getFieldProps('linkAPI')}
            inputProps={{readOnly: !true}}
            error={Boolean(touched.linkAPI && errors.linkAPI)}
            helperText={touched.linkAPI && errors.linkAPI}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="ubication-label">Ubicación de la Campaña</InputLabel>
            <Select
              name='ubication'
              labelId="ubication-label"
              id="ubication"
              {...getFieldProps('ubication')}
              label="Ubicación de la Campaña"
              onChange={handleChange}
            >
              {ubicationArray.map((el, index) => 
                <MenuItem key={index} value={el}>{el}</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demographicsDataSegmentation-label">Segmentación Demográfica</InputLabel>
            <Select
              name='demographicsDataSegmentation'
              labelId="demographicsDataSegmentation-label"
              id="demographicsDataSegmentation"
              label="Segmentación Demográfica"
              {...getFieldProps('demographicsDataSegmentation')}
              onChange={handleChange}
            >
              {demographicsDataSegmentationArray.map((el, index) => 
                <MenuItem key={index} value={el}>{el}</MenuItem>
              )}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel id="interestSegmentation-label">Segmentación por Intereses</InputLabel>
            <Select
              name='interestSegmentation'
              labelId="interestSegmentation-label"
              id="interestSegmentation"
              label="Segmentación por Intereses"
              {...getFieldProps('interestSegmentation')}
              onChange={handleChange}
            >
              {interestSegmentationArray.map((el, index) => 
                <MenuItem key={index} value={el}>{el}</MenuItem>
              )}
            </Select>
          </FormControl>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              type="number"
              fullWidth
              name='ageFloor'
              label='Limite inferior (años)'
              {...getFieldProps('ageFloor')}
              inputProps={{readOnly: !true}}
              error={Boolean(touched.ageFloor && errors.ageFloor)}
              helperText={touched.ageFloor && errors.ageFloor}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name='ageTop'
              label='Limite superior (años)'
              {...getFieldProps('ageTop')}
              inputProps={{readOnly: !true}}
              error={Boolean(touched.ageTop && errors.ageTop)}
              helperText={touched.ageTop && errors.ageTop}
              onChange={handleChange}
            />
          </Stack>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="audienceGender-label">Género de la audiencia</InputLabel>
              <Select
                name='audienceGender'
                labelId="audienceGender-label"
                id="audienceGender"
                {...getFieldProps('audienceGender')}
                label="Género de la audiencia"
                onChange={handleChange}
              >
                {audienceGenderArray.map((el, index) => 
                  <MenuItem key={index} value={el}>{el}</MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              type='number'
              fullWidth
              name='perDayBudget'
              label='Inversion por día ($)'
              {...getFieldProps('perDayBudget')}
              inputProps={{readOnly: !true}}
              error={Boolean(touched.perDayBudget && errors.perDayBudget)}
              helperText={touched.perDayBudget && errors.perDayBudget}
              onChange={handleChange}
            />
          </Stack> 
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Registrar Campaña
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
