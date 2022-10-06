import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import {
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
import Iconify from '../../../components/Iconify';
// context
import { AppContext } from '../../../context/AppContext';
// api method
import { createProjection } from '../../../utils/api'

// ----------------------------------------------------------------------

ProjectionCreateForm.propTypes = {
  campaign: PropTypes.object,
  clients: PropTypes.array
};

export default function ProjectionCreateForm({ campaign, clients }) {
  const auth = useContext(AppContext);

  const ProjectionCreateFormSchema = Yup.object().shape({
    campaignId: Yup.string()
    .required('El nombre es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      campaignId: '',
      name: '',
      clientId: '',
      link: '',
      balances: []
    },
    validationSchema: ProjectionCreateFormSchema
  });

  const {
    getFieldProps,
    values,
    setValues,
    errors,
    touched
  } = formik;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createProjection(auth.token, values)
    Swal.fire({
      icon: "success",
      title: "Proyección creada con éxito",
      background: `rgba(210,210,210,1)`,
      backdrop: `rgba(0,0,0,0)`
    })
  }

  useEffect(() => {
    if (campaign) {
      setValues({
        ...values,
        campaignId: campaign._id,
        name: campaign.name,
        balances: [campaign.perDayBudget * campaign.promotionDuration]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name='campaignId'
            label='ID de la campaña'
            {...getFieldProps('campaignId')}
            inputProps={{readOnly: true}}
            error={Boolean(touched.campaignId && errors.campaignId)}
            helperText={touched.campaignId && errors.campaignId}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='name'
            label='Nombre de la campaña'
            {...getFieldProps('name')}
            inputProps={{readOnly: true}}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='link'
            label='Link'
            {...getFieldProps('link')}
            inputProps={{readOnly: !true}}
            error={Boolean(touched.link && errors.link)}
            helperText={touched.link && errors.link}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="clientId-label">Cliente</InputLabel>
            <Select
              name='clientId'
              labelId='clientId-label'
              id='clientId'
              {...getFieldProps('clientId')}
              label="Publicación de Posts"
              onChange={handleChange}
            >
              {clients.map((el) =>
                <MenuItem key={el._id} value={el._id}>{el.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button 
              variant="outlined" 
              size="small"
              type="submit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              sx={{ mt:2 }}
            >
              Crear Proyección
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
