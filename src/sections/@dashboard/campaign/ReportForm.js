import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
import { LoadingButton } from '@mui/lab' 
// sweetalert2
import Swal from 'sweetalert2';
import Iconify from '../../../components/Iconify';
// context
import { AppContext } from '../../../context/AppContext';
// api method
import { sendReport } from '../../../utils/api/campaign'

// ----------------------------------------------------------------------

ReportForm.propTypes = {
  campaign: PropTypes.object
};

export default function ReportForm({ campaign, projection }) {
  const auth = useContext(AppContext);
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const ReportFormSchema = Yup.object().shape({
    campaignId: Yup.string()
      .required('El campaignId es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      campaignId: 'Cargando...',
      deposits: [],
      promotedPostLink: [],
      totalInvoiced: 0,
      balance: 0,
      percentageCommission: 0,
      commission: 0,
      check: 0
    },
    validationSchema: ReportFormSchema
  });

  const {
    getFieldProps,
    setValues,
    values,
    errors,
    touched,
  } = formik;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
    if (name === 'percentageCommission') {
      const aux = (value * campaign.perDayBudget * campaign.promotionDuration) / 100
      setValues({...values, percentageCommission: value, commission: aux})
      const commission = campaign.perDayBudget * campaign.promotionDuration
    }
  }

  const handleSubmit = async () => {
    setIsLoadingButton(true)
    const { data } = await sendReport(auth.token, values)
    setIsLoadingButton(false)
    Swal.fire({
      icon: 'success',
      title: 'Reporte enviado con éxito',
      background: `rgba(210,210,210,1)`,
      backdrop: `rgba(0,0,0,0)`,
      confirmButtonText: 'Regresar a campaña',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      footer:`<a href=${data.url} target="_blank" style="text-decoration: none">Ver reporte en EtherEmail</a>`
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/dashboard/campaign/${values.campaignId}`
      }
      
    })
    // window.location.href = `/dashboard/campaign/${values.campaignId}`
  }

  useEffect(() => {
    if (campaign && projection) {
      // totalInvoiced
      let totalInvoicedAux = projection.balances.filter(el => el.value < 0)
      totalInvoicedAux = totalInvoicedAux.map(el => el.value)
      totalInvoicedAux = totalInvoicedAux.reduce((a,b) => a + b)
      // balance
      const balanceAux = projection.balances.map((el) => el.value)
      const array = [...projection.balances]
      const auxCheck = array.pop()

      setValues({
        ...values,
        campaignId: campaign._id,
        promotedPostLink: campaign.promotePostLink,
        totalInvoiced: totalInvoicedAux,
        balance: balanceAux.reduce((a, b) => a + b),
        percentageCommission: 0,
        check: auxCheck.value,
        commission: 0,
        deposits: projection.balances.filter(el => el.value < 0)
      })

    }
  }, [campaign, projection])

  return(
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={2}>

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

          <List>
            <Typography variant="h5" sx={{ mb:1 }}>
              Links de Promoción
            </Typography>
            {values.promotedPostLink.length > 0
              ?
              values.promotedPostLink.map((balance, index) =>
                <ListItem disablePadding key={index} sx={{
                  mt:2,
                  borderRadius: '10px', 
                  border: '1px solid black', 
                  borderColor: '#D7D7D7' 
                }}>
                  <ListItemButton>
                    <ListItemText primary={`${index+1}. ${balance} $`} />
                  </ListItemButton>
                </ListItem>
              )
              : 
              <ListItemButton sx={{ 
                mt:2,
                borderRadius: '10px', 
                border: '1px solid black', 
                borderColor: '#D7D7D7' 
               }}>
              <ListItemText primary={`Este campaña no posee links de promoción...`} />
              </ListItemButton>
            }
          </List>

          

          <Typography variant="h5" sx={{ mb:1 }}>
            Inversión Total ($)
          </Typography>

          <TextField
            fullWidth
            name='totalInvoiced'
            {...getFieldProps('totalInvoiced')}
            inputProps={{readOnly: true}}
          />

        

          <Typography variant="h5" sx={{ mb:1 }}>
            Balance Actual ($)
          </Typography>
          <TextField
            fullWidth
            name='balance'
            {...getFieldProps('balance')}
            inputProps={{readOnly: true}}
          />

<Typography variant="h5" sx={{ mb:1 }}>
            Coste de la Campaña ($)
          </Typography>
          <TextField
            fullWidth
            name='check'
            {...getFieldProps('check')}
            inputProps={{readOnly: true}}
          />

          <Typography variant="h5" sx={{ mb:1 }}>
            Porcentaje de la comisión (%)
          </Typography>
          <TextField
            fullWidth
            name='percentageCommission'
            {...getFieldProps('percentageCommission')}
            inputProps={{readOnly: false}}
            error={Boolean(touched.campaignId && errors.campaignId)}
            helperText={touched.campaignId && errors.campaignId}
            onChange={handleChange}
          />

          <Typography variant="h5" sx={{ mb:1 }}>
            Comisión ($)
          </Typography>
          <TextField
            fullWidth
            name='commission'
            {...getFieldProps('commission')}
            inputProps={{readOnly: false}}
            error={Boolean(touched.campaignId && errors.campaignId)}
            helperText={touched.campaignId && errors.campaignId}
            onChange={handleChange}
          />
          <LoadingButton variant="contained" loading={isLoadingButton} onClick={handleSubmit}>Enviar Reporte</LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
