import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import Swal from 'sweetalert2';
import { AppContext } from '../context/AppContext';
// components
import { index, show, clientInCampaign, getCampaignUnasigned } from '../utils/api/campaign'
import ProjectionEditForm from '../sections/@dashboard/campaign/ProjectionEditForm';
import Page from '../components/Page';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'initial',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
}));

export default function EditCampaign() {
  const auth = useContext(AppContext);
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [campaign, setCampaign] = useState({
    _id: 0,
    name: '',
    audienceAge: [0, 1],
    audienceGender: '',
    campaignState: '',
    campaignTypeId: '',
    demographicsDataSegmentation: '',
    initDate: '',
    finalDate: '',
    interestSegmentation: '',
    isPost: '',
    isVideo: '',
    linkAPI: '',
    perDayBudget: 0,
    promotionDuration: 0,
    ubication: '',
    destination: ''
  })
  const [projection, setProjection] = useState({
    link: '',
    balances: [0],
    campaignId: '',
    clientId: ''
  })
  
const [projection2, setProjection2] = useState({
    link: '',
    balances: [0],
    campaignId: '',
    clientId: ''
  })
  const showClientInCampaign = async () => {
    // retorna la campaña por su id
    setIsLoading(true)
    const { data } = await clientInCampaign(auth.token, id);
    setProjection(data);
    setIsLoading(false)
  }

  useEffect(() => {
    showClientInCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page title="Proyección">
      <RootStyle>
        <Container>
          <ContentStyle>
          
          {!isLoading &&
            <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Typography variant="h4" gutterBottom>
                Proyección de la campaña {campaign.name}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>
              <Button
                variant="contained" 
                size="small"
                component={RouterLink} 
                to={`/dashboard/campaign/${id}`}
              >Regresar</Button>
              
              {projection.balances.length > 1 &&
                  <Button
                    variant="contained" 
                    size="small"
                    component={RouterLink} 
                    to={`/dashboard/report/${id}`}
                  >Enviar Reporte</Button>
              }
            </Stack>
            <ProjectionEditForm
              projection={projection}
              showClientInCampaign={showClientInCampaign}
            />
            </>
          }
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );

}