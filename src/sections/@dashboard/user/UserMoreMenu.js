import PropTypes from 'prop-types';
import { useRef, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
// component
import Iconify from '../../../components/Iconify';
// context
import { AppContext } from '../../../context/AppContext';
// api method

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  elementId: PropTypes.string,
  getElements: PropTypes.func,
  setElements: PropTypes.func,
  updateElement: PropTypes.func,
  eliminateElement: PropTypes.func,
  accessState: PropTypes.bool,
  userId: PropTypes.string
};

export default function UserMoreMenu({
  elementId,
  getElements,
  setElements,
  updateElement,
  eliminateElement,
  accessState,
  userId
}){

  const auth = useContext(AppContext)

  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to={`${elementId}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {accessState !== undefined &&
          <MenuItem
            sx={{ color: 'text.secondary' }}
            onClick={() =>
            {
              Swal.fire({
              title: `¿Desea cambiar el acceso de este empleado?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar',
              background: `rgba(210,210,210,1)`,
              backdrop: `rgba(0,0,0,0)`
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await updateElement(
                  auth.token,
                  userId,
                  { accessState: !accessState }
                );
                const { data } = await getElements(auth.token);
                setElements(data);
                Swal.fire({
                  icon: 'success',
                  title: 'Acceso actualizado con éxito',
                  background: `rgba(210,210,210,1)`,
                  backdrop: `rgba(0,0,0,0)`
                })
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
                text: `Error`
              })
              console.log(err)
            })
            setIsOpen(false)
            }}
          >
            <ListItemIcon>
              <Iconify icon="eva:lock-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Acceso" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        }
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() =>
          {
            Swal.fire({
            title: `¿Desea eliminar este empleado?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            background: `rgba(210,210,210,1)`,
            backdrop: `rgba(0,0,0,0)`
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await eliminateElement(auth.token, elementId);
              const { data } = await getElements(auth.token);
              setElements(data);
              Swal.fire({
                icon: 'success',
                title: 'Empleado eliminado con éxito',
                background: `rgba(210,210,210,1)`,
                backdrop: `rgba(0,0,0,0)`
              })
            }
          }).catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un error',
              text: `Error`
            })
            console.log(err)
          })
          setIsOpen(false)
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Eliminar"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
