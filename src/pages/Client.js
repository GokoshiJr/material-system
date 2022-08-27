import { filter } from 'lodash';
import { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// sweetalert2
import Swal from 'sweetalert2';
// components
import EditClient from './EditClient';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
// import clientList from '../_mock/user';
// context
import { AppContext } from '../context/AppContext'
// api method
import { getClients, eliminateClient, showClient } from '../utils/api'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'lastName', label: 'Apellido', alignRight: false },
  { id: 'socialPlatform', label: 'Plataforma', alignRight: false },
  { id: 'phoneNumber', label: 'Telefono', alignRight: false },
  { id: 'associated', label: 'Asociado', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Client() {

  const auth = useContext(AppContext);

  const { id } = useParams();

  const [client, setClient] = useState({
    email: 'cargando...',
    name: 'cargando...',
    lastName: 'cargando...',
    phoneNumber: 'cargando...',
    socialId: 'cargando...',
    birthDate:  'cargando...',
    userId: 'cargando...'
  })

  const [clientList, setClientList] = useState([{_id: '1', name: 'epa Alex'}])

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const _getClients = async () => {
    const { data } = await getClients(auth.token);
    setClientList(data);
  }

  const showEmp = async () => {
    const { data } = await showClient(auth.token, id);
    setClient(data);
  }

  useEffect(() => {
    if (id && id !== "add") showEmp();
    if (!id) _getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const eliminateSelected = async () => {
    let title = '¿Desea eliminar estos clientes?';
    if (selected.length === 1) title = '¿Desea elimina este cliente?';

    Swal.fire({
      title,
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
        selected.map(async (element) => {
          await eliminateClient(auth.token, element);
        })
        setSelected([])
        _getClients()
        Swal.fire({
          icon: 'success',
          title: 'Empleado eliminado con exito',
          background: `rgba(210,210,210,1)`,
          backdrop: `rgba(0,0,0,0)`
        })

      }
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error',
        text: `Epa Alex`
      })
      console.log(err)
    })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log(event.target.checked)
    if (event.target.checked && selected.length === 0) {
      const newSelecteds = clientList.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientList.length) : 0;

  const filteredUsers = applySortFilter(clientList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  // tabla de empleados
  if (!id) {
    return (
      <Page title="Clientes">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Lista de Clientes
            </Typography>
            <Button variant="contained" component={RouterLink} to="add" startIcon={<Iconify icon="eva:plus-fill" />}>
              Crear Cliente
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              setFilterName={setFilterName}
              selected={selected}
              eliminateSelected={eliminateSelected}
            />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={clientList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        _id,
                        name,
                        lastName,
                        phoneNumber,
                        socialPlatform,
                        associated
                      } = row;
                      const isItemSelected = selected.indexOf(_id) !== -1;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none" >
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{lastName}</TableCell>
                          <TableCell align="left">{socialPlatform}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={associated ? 'success' : 'error'}>
                              {associated ? 'Si' :'No'}
                            </Label>
                          </TableCell>
                          {/* <TableCell align="left">
                            <Label variant="ghost" color={accessState ? 'success' : 'error'}>
                              {accessState ?'Activo' :'Baneado'}
                            </Label>
                          </TableCell> */}
                          <TableCell align="right">
                            <UserMoreMenu
                              elementId={_id}
                              getElements={getClients}
                              setElements={setClientList}
                              eliminateElement={eliminateClient}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={clientList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    );
  }

  // crear empleado
  if (id === "add") {
    return (
      <EditClient
        title={'Crear'}
      />
    )
  }

  // editar empleado por id
  return (
    <EditClient
      client={client}
      setClient={setClient}
      title={'Editar'}
    />
  )
}
