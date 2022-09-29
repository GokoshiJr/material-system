import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import {
  Stack,
  TextField,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography
} from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
import Iconify from '../../../components/Iconify';
// context
import { AppContext } from '../../../context/AppContext';
// api method
import { updateBalanceInProjection } from '../../../utils/api/campaign'

// ----------------------------------------------------------------------

ProjectionEditForm.propTypes = {
  projection: PropTypes.object,
  showClientInCampaign: PropTypes.func
};

export default function ProjectionEditForm({
  projection,
  showClientInCampaign
}) {
  const auth = useContext(AppContext);

  const [balanceTotal, setBalanceTotal] = useState(0)

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
    <ListItem disablePadding key={index} sx={{ 
      mt: 2,
      borderRadius: '10px', 
      border: '1px solid', 
      borderColor: balance>0 ? '#FF0000' : '#00FF00' 
    }}>
      <ListItemButton>
        <ListItemText primary={`${index+1}. ${balance} $`} />
      </ListItemButton>
    </ListItem>
  )

  const handleResetValues = () => {
    setValues({
      // balances: projection.balances[0],
      clientId: `${projection.clientId.name} ${projection.clientId.lastName}`,
      campaignId: projection.campaignId,
      link: projection.link
    })
    const total = projection.balances.reduce((a, b) => a + b)
    setBalanceTotal(total)
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

  const handleAddBalance = async () => {
    const balanceArray = projection.balances.map((balance) => balance)
    Swal.fire({
      title: 'Ingrese el pago en dolares ($) ejemplo: -100',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (balance) => {
        balanceArray.push(Number(balance))
        return updateBalanceInProjection(auth.token, 
          projection._id, 
          balanceArray)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((res, err) => {
      showClientInCampaign()
      if (res.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pago agregado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }

    }).catch((err) => {
      console.log(err)
    })

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
              label='API Link'
              {...getFieldProps('link')}
              inputProps={{readOnly: true}}
              error={Boolean(touched.link && errors.link)}
              helperText={touched.link && errors.link}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'column' }} spacing={0}>
            <Typography variant="h4" gutterBottom>
              Balance Actual
            </Typography>
            <Button variant="outlined" size='small'
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAddBalance}
              sx={{ mt:2 }}
            >
              Añadir pago
            </Button>
            <nav aria-label="secondary mailbox folders">
              <List>
                { balance }
              </List>
              <List>
                <ListItem 
                  disablePadding 
                  sx={{
                    borderRadius: '10px', 
                    border: '1px solid',
                    borderColor: balanceTotal ? '#FF0000' : '#00FF00'
                  }}
                >
                  <ListItemButton>
                    <ListItemText 
                      primary={`Deuda Total: ${balanceTotal} $`}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
