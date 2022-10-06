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
import EditUser from './EditUser';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// context
import { AppContext } from '../context/AppContext';
// api methods
import { getEmployees, showEmployee, eliminateEmployee, updateEmployee, updateUser } from '../utils/api';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'lastName', label: 'Apellido', alignRight: false },
  { id: 'socialId', label: 'Cedula', alignRight: false },
  { id: 'phoneNumber', label: 'Telefono', alignRight: false },
  { id: 'userId._id', label: 'Rol', alignRight: false },
  { id: 'accessState', label: 'Estatus', alignRight: false },
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

export default function User() {

  const auth = useContext(AppContext);

  const { id } = useParams();

  const [employee, setEmployee] = useState({
    email: 'cargando...',
    name: 'cargando...',
    lastName: 'cargando...',
    phoneNumber: 'cargando...',
    socialId: 'cargando...',
    birthDate:  'cargando...',
    userId: 'cargando...'
  })

  const [USERLIST, setUSERLIST] = useState([{
    _id: '1', 
    name: 'Cargando...',
    lastName: 'Cargando...',
    socialId: '20000000',
    phoneNumber: '+584140000000',
    userId: {
      accessState: true,
      roles: [{name: "user"}]
    }
  }])

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getEmp = async () => {
    const { data } = await getEmployees(auth.token);
    setUSERLIST(data);
  }

  const showEmp = async () => {
    const { data } = await showEmployee(auth.token, id);
    data.userId = data.userId.email;
    setEmployee(data);
  }

  useEffect(() => {
    if (id && id !== "add") showEmp();
    if (!id) getEmp(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const eliminateSelected = async () => {
    let title = '¿Desea eliminar estos usuarios?';
    if (selected.length === 1) title = '¿Desea elimina este usuario?';
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        selected.map(async (element) => {
          await eliminateEmployee(auth.token, element);
          /* actualiza los empleados de ultimo para evitar el 304 */
          if (element === selected[selected.length-1]) await getEmp();
        })
        setSelected([])
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
        text: `Error`
      })
    })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && selected.length === 0) {
      /* evita seleccionar a los admin, cuando se escogen a todos los registros */
      const newSelecteds = USERLIST.filter((n) => n.userId.roles[0].name !== 'admin');
      const select = newSelecteds.map((n) => n._id);
      setSelected(select);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  // tabla de empleados
  if (!id) {
    return (
      <Page title="Empleados">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Lista de Empleados
            </Typography>
            <Button variant="contained" component={RouterLink} to="add" startIcon={<Iconify icon="eva:plus-fill" />}>
              Crear Empleado
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
                    rowCount={USERLIST.length}
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
                        socialId,
                        phoneNumber,
                        userId,
                        accessState,
                        avatarUrl
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
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{lastName}</TableCell>
                          <TableCell align="left">{socialId}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">{userId
                            ? userId.roles[0].name
                            : 'cargando...'
                          }</TableCell>
                          <TableCell align="left">
                            {userId.accessState !== undefined
                              ?
                              <Label variant="ghost" color={userId.accessState ? 'success' : 'error'}>
                                {userId.accessState ? 'Activo' :'Baneado'}
                              </Label>
                              :
                              <Label variant="ghost" color='success'>
                                {"Cargando..."}
                              </Label>
                            }
                          </TableCell> 
                          <TableCell align="right">
                            <UserMoreMenu
                              elementId={_id}
                              getElements={getEmployees}
                              setElements={setUSERLIST}
                              updateElement={updateUser}
                              eliminateElement={eliminateEmployee}
                              accessState={userId.accessState}
                              userId={userId._id}
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
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={'Filas por página:'}
            />
          </Card>
        </Container>
      </Page>
    );
  }

  // crear empleado
  if (id === "add") {
    return (
      <EditUser
        title={'Crear'}
      />
    )
  }

  // editar empleado por id
  return (
    <EditUser
      employee={employee}
      setEmployee={setEmployee}
      title={'Editar'}
    />
  )
}
