import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
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
import Page from '../components/Page';

// sections
import {
  CampaignEditForm,
  CampaignCreateForm
} from '../sections/@dashboard/campaign';
import ProjectionEditForm from '../sections/@dashboard/campaign/ProjectionEditForm';
import { deleteCampaign } from '../utils/api/campaign';
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

EditCampaign.propTypes = {
  campaign: PropTypes.object,
  projection: PropTypes.object,
  title: PropTypes.string,
  showClientInCampaign: PropTypes.func
};

export default function EditCampaign({
  campaign,
  projection,
  title,
  showClientInCampaign
}) {
  const auth = useContext(AppContext);
  const [showProjectionView, setShowProjectionView] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)
  const handleUpdateMode = () => {
    setUpdateMode(!updateMode)
  }

  const _deleteCampaign = async (id) => {
    
    Swal.fire({
      title: '¿Desea eliminar esta campaña?',
      text: 'Eliminar campaña',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      background: `rgba(210,210,210,1)`,
      backdrop: `rgba(0,0,0,0)`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCampaign(auth.token, id)
        Swal.fire({
          icon: res.icon,
          title: res.title,
          background: `rgba(210,210,210,1)`,
          backdrop: `rgba(0,0,0,0)`
        })
        window.location.href = '/dashboard/campaign'    
      }
    })
  }

  const handleDeleteCampaign = (id) => {
    _deleteCampaign(id)
  }

  if (!showProjectionView) {
    return (
      <Page title="Campaña">
        <RootStyle>
          <Container>
            <ContentStyle>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="h4" gutterBottom>
                  {title} Campaña
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>

                {projection !== null &&
                  <Button
                    variant="outlined" size="small"
                    onClick={() => setShowProjectionView(true)}
                  >Proyección</Button>
                }

                <Button onClick={() => setUpdateMode(!updateMode)} color='success' variant="outlined" size="small">Editar</Button>
                <Button onClick={() => handleDeleteCampaign(campaign._id)} color='error' variant="outlined" size="small">Eliminar</Button>
              </Stack>

              
              <CampaignCreateForm 
                campaign={campaign}
                updateMode={updateMode}
              />

              {(projection === null || projection.link === 'Cargando...')
                &&
                <Box sx={{ width: '100%', mt: 4 }} textAlign="center">
                  <Typography variant="h6" gutterBottom textAlign="center" sx={{ mb: 3 }}>
                    ¡Esta campaña no está asignada a un cliente!
                  </Typography>

                  <Button component={RouterLink} to={`/dashboard/projection/${campaign._id}`}
                    variant="outlined" size="small">Crear Proyección</Button>

                </Box>
              }
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    );
  }


  if (showProjectionView) {
    return (
      <Page title="Proyección">
        <RootStyle>
          <Container>
            <ContentStyle>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                mb={2}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Proyección de la campaña {campaign.name}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>
                <Button
                  variant="outlined" size="small"
                  onClick={() => setShowProjectionView(false)}
                >Regresar</Button>

                {projection.balances.length > 1 &&
                    <Button
                      variant="outlined" size="small"
                      component={RouterLink} 
                      to={`/dashboard/report/${campaign._id}`}
                    >Enviar Reporte</Button>
                }
              </Stack>
              <ProjectionEditForm
                projection={projection}
                showClientInCampaign={showClientInCampaign}
              />
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    );
  }
}
