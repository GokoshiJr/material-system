import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Container,
  Stack,
  Typography,
  Button,
  Skeleton,
  Card,
  CardHeader,
  Grid,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import Iconify from '../components/Iconify';
// context
import { AppContext } from '../context/AppContext';
// components
import EditCampaign from './EditCampaign'
import Page from '../components/Page';
import {
  CampaignList,
  CampaignToolbar
} from '../sections/@dashboard/campaign';
// api
import { index, show, clientInCampaign, getCampaignUnasigned } from '../utils/api/campaign'
import CreateCampaign from './CreateCampaign'
// ----------------------------------------------------------------------

export default function Campaign() {
  const auth = useContext(AppContext);

  const { id } = useParams();

  const [campaigns, setCampaigns] = useState([]) // array original

  const [isLoading, setIsLoading] = useState(true)

  const [campaignSelectedArray, setCampaignSelectedArray] = useState([])

  const [showCampaign, setShowCampaign] = useState({
    name: 'Cargando...',
    audienceAge: [0, 1],
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
  })

  const [projection, setProjection] = useState({
    link: 'Cargando...',
    balances: [0],
    campaignId: 'Cargando...',
    clientId: 'Cargando...'
  })

  const formik = useFormik({
    initialValues: {
      campaignFilter: '',
    }
  });

  const {
    getFieldProps,
    values,
    setValues,
    errors,
    touched,
    resetForm
  } = formik;

  const getCampaigns = async () => {
    const { data } = await index(auth.token);
    setCampaigns(data);
    setCampaignSelectedArray(data);
    setIsLoading(false);
  }

  const showCamp = async () => {
    // retorna la campaña por su id
    const { data } = await show(auth.token, id);
    setShowCampaign(data);
  }

  const showClientInCampaign = async () => {
    // retorna la campaña por su id
    const { data } = await clientInCampaign(auth.token, id);
    setProjection(data);
  }

  const _getCampaignUnasigned = async () => {
    setIsLoading(true)
    const { data } = await getCampaignUnasigned(auth.token)
    setCampaignSelectedArray(data)
    setIsLoading(false)
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
    console.log(value)
    if (value === 'all') {
      setCampaignSelectedArray(campaigns)
    }
    if (value === 'on') {
      setCampaignSelectedArray(campaigns.filter((el) => el.campaignState === 'on'))
    }
    if (value === 'paused') {
      setCampaignSelectedArray(campaigns.filter((el) => el.campaignState === 'paused'))
    }
    if (value === 'finalized') {
      setCampaignSelectedArray(campaigns.filter((el) => el.campaignState === 'finalized'))
    }
    if (value === 'unasigned') {
      
      _getCampaignUnasigned()
      
      
    }
  }

  useEffect(() => {
    // para no ver la campaña vista anteriormente
    setShowCampaign({
      name: 'Cargando...',
      audienceAge: [0, 1],
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
    })
    setProjection({
      link: 'Cargando...',
      balances: [0],
      campaignId: 'Cargando...',
      clientId: 'Cargando...'
    })
    if (id && id !== "add") {
      showCamp();
      showClientInCampaign();
    }
    if (!id) getCampaigns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // cards de campañas
  if (!id) {
    return (
      <Page title="Campañas">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Lista de Campañas
            </Typography>
            <Button variant="contained" component={RouterLink} to="add" startIcon={<Iconify icon="eva:plus-fill" />}>
              Crear Campaña
            </Button>
            <CampaignToolbar />            
          
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="campaignFilter">Filtrar campañas</InputLabel>
              <Select
                name='campaignFilter'
                labelId='campaignFilter'
                id='campaignFilter'
                {...getFieldProps('campaignFilter')}
                label="Publicación de Posts"
                onChange={handleChange}
              >
                <MenuItem value={'all'}>Todas</MenuItem>                
                <MenuItem value={'on'}>Activas</MenuItem>
                <MenuItem value={'paused'}>Pausadas</MenuItem>
                <MenuItem value={'finalized'}>Finalizadas</MenuItem>
                <MenuItem value={'unasigned'}>Sin Asignar</MenuItem>
              </Select>
            </FormControl>


          </Stack>
          {!isLoading
            ?
            <CampaignList campaigns={campaignSelectedArray} />
            :
            <Grid container spacing={3}>
              {[0,1,2,3].map((el, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <Card>
                    <Skeleton
                      variant="rectangular"
                      height={220}
                      sx={{ bgcolor: 'grey.400'}}
                    />
                    <CardContent>
                      <Typography variant="subtitle2" noWrap>
                        {`Campaña ${index+1}`}
                      </Typography>
                      <Typography variant="string" sx={{ fontSize: 14 }}>
                        {`Cargando...`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          }
        </Container>
      </Page>
    );
  }

  // crear campaña
  if (id === "add") {
    return (
      <CreateCampaign />
    )
  }

  // editar y ver campaña por id
  return (
    <EditCampaign
      campaign={showCampaign}
      projection={projection}
      showClientInCampaign={showClientInCampaign}
      title={'Ver'}
    />
  )

}
