import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import {
  Checkbox,
  TablePagination,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Grid,
  Divider,
  CardHeader,
  Card,
  Stack,
  TextField,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography
} from '@mui/material';
import { format } from 'date-fns'
// sweetalert2
import Swal from 'sweetalert2';
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppCampaignTypesBarChart
} from '../app';
import { UserListHead } from '../user';
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

const TABLE_HEAD = [
  { id: '_id', label: 'ID', alignRight: false },
  { id: 'value', label: 'Monto', alignRight: false },
  { id: 'date', label: 'Fecha', alignRight: false }
];

export default function ProjectionEditForm({
  projection,
  showClientInCampaign
}) {
  const auth = useContext(AppContext);

  const [balanceTotal, setBalanceTotal] = useState(0)

  const [showBalanceArray, setShowBalanceArray] = useState([{value: 1, date: Date.now()}])

  const ProjectionEditFormSchema = Yup.object().shape({
    campaignId: Yup.string()
    .required('El nombre es requerido'),
  });

  

const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('value');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


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
    setValues,
    errors,
    touched,
  } = formik;

const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projection.balances.length) : 0;
  const handleResetValues = () => {
    setValues({
      // balances: projection.balances[0],
      clientId: `${projection.clientId.name} ${projection.clientId.lastName}`,
      campaignId: projection.campaignId,
      link: projection.link
    })
    const total = projection.balances.reduce((a, b) => ({value: a.value + b.value}))
    setBalanceTotal(total)
    const aux = [...projection.balances]
    aux.pop() // eliminamos el monto inicial a pagar
    aux.reverse() // reverse para mostrar bien el gráfico
    setShowBalanceArray(aux)
    
  }

const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log(event.target.checked)
    if (event.target.checked && selected.length === 0) {
      const newSelecteds = projection.balances.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...formik.values, [name]: value});
    // if (client) setShowUpdateButton(true);
    // if (!client) setShowCreateButton(true);
  }

  const handleAddBalance = async () => {
    const balanceArray = projection.balances.map((balance) => balance)
    Swal.fire({
      background: `rgba(210,210,210,1)`,
      backdrop: `rgba(0,0,0,0)`,
      title: 'Ingrese el pago en dolares ($) ejemplo: -100',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (balance) => {
        balanceArray.unshift({value: Number(balance), date: Date.now() })
        return updateBalanceInProjection(auth.token,
          projection._id,
          balanceArray)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((res) => {
      showClientInCampaign()
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Pago agregado con éxito',
          showConfirmButton: false,
          timer: 1500,
          background: `rgba(210,210,210,1)`,
          backdrop: `rgba(0,0,0,0)`
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    console.log(projection)
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
      <Form autoComplete="off" noValidate>

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

          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="start"
              mt={2}
            >
              <Typography variant="h5" sx={{ ml:2 }}>
                Balance de pagos 
              </Typography>
              <Button variant="outlined" size='small'
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleAddBalance}
                sx={{ ml:2 }}
              >
                Añadir pago
              </Button>
            </Stack>

            <List>
              <Divider />
              <TableContainer sx={{ minWidth: 480 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={projection.balances.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <TableBody>
                    {projection.balances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        _id,
                        value,
                        date
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
                          <TableCell align="left">{_id.slice(18, 24)}</TableCell>
                          <TableCell component="th" scope="row" padding="none" align="left">
                            <Typography variant="subtitle2" noWrap>
                              {value}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{format(new Date(date), 'dd-MM-yy')}</TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <ListItemButton>
                  <ListItemText primary={`Deuda Total: ${balanceTotal.value} $`} />
                </ListItemButton>
                <Divider />
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={projection.balances.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={'Filas por página:'}
              />
            </List>
          </Card>
          {projection &&
            <AppWebsiteVisits
              title="Registro de pagos del Cliente"
              subheader="Balance en el tiempo"
              chartLabels={
                showBalanceArray.map((el) => (format(new Date(el.date), 'dd-MMM-yy')))
              }
              chartData={[
                {
                  name: 'Inversión por día ($)',
                  type: 'line',
                  fill: 'solid',
                  data: showBalanceArray.map((el) => -el.value),
                }
              ]}
            />
          }
        </Stack>
      </Form>
    </FormikProvider>
  );
}
