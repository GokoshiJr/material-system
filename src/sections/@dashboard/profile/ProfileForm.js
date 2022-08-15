import * as Yup from 'yup';
import { useState, useContext, useEffect } from 'react';
import { useFormik, Form, FormikProvider, setNestedObjectValues } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
// context
import { AppContext } from '../../../context/AppContext'
import { updateLoggedUser, getMe } from '../../../utils/api'
// ----------------------------------------------------------------------

export default function ProfileForm({
  isUpdateMode,
  setIsUpdateMode
}) {

  const auth = useContext(AppContext)
  const {
    loggedEmployee,
    setLoggedEmployee,
    loggedUser
  } = auth

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
    name:
      Yup.string()
      .min(2, 'Too Short!').max(50, 'Too Long!')
      .required('First name required'),
    lastName:
      Yup.string()
      .min(2, 'Too Short!').max(50, 'Too Long!')
      .required('First name required'),
    socialId: Yup.number().required('Social ID is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().min(8, 'Minimal eight characters').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: 'Loading...',
      name: 'Loading...',
      lastName: 'Loading...',
      phoneNumber: 'Loading...',
      socialId: 'Loading...',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {}
  });

  const {
    errors,
    touched,
    isSubmitting,
    getFieldProps,
    setValues,
    values
  } = formik;

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({...formik.values, [name]: value});
  }

  useEffect(() => {
    if (loggedEmployee) {
      setValues({
        email: loggedUser.email,
        name: loggedEmployee[0].name,
        lastName: loggedEmployee[0].lastName,
        phoneNumber: loggedEmployee[0].phoneNumber,
        socialId: loggedEmployee[0].socialId
      })
    }
  }, [loggedEmployee])

  /* useEffect(() => {
    if (loggedEmployee && !isUpdateMode) {
      setValues({
        _id: loggedUser._id,
        username: loggedUser.username,
        email: loggedUser.email,
        social_id: loggedUser.social_id,
        phone_number: loggedUser.phone_number,
        direction: loggedUser.direction,
        password: ''
      })
    }
  }, [isUpdateMode]) */

  /* const _updateLoggedUser = async (values) => {
    const {data} = await updateLoggedUser(auth.token, values)
    console.log(data.user)
    setLoggedUser(data.user)
    setIsUpdateMode(false)
  } */

  /* const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(values)
    _updateLoggedUser(values)

    // auth.setLoggedUser(user)
  } */

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>

        <Stack spacing={3}>
          <TextField
            fullWidth
            name='email'
            label='Email'
            {...getFieldProps('email')}
            onChange={handleChange}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name='name'
              label='Name'
              {...getFieldProps('name')}
              onChange={handleChange}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              InputProps={{
                readOnly: !isUpdateMode,
              }}
            />

            <TextField
              fullWidth
              name='lastName'
              label="Last Name"
              {...getFieldProps('lastName')}
              onChange={handleChange}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              InputProps={{
                readOnly: !isUpdateMode,
              }}
            />
          </Stack>

          <TextField
            fullWidth
            name='phoneNumber'
            label='Phone Number'
            {...getFieldProps('phoneNumber')}
            onChange={handleChange}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            InputProps={{
              readOnly: !isUpdateMode,
            }}
          />

          <TextField
            fullWidth
            name='socialId'
            label='Social Id'
            {...getFieldProps('socialId')}
            onChange={handleChange}
            error={Boolean(touched.socialId && errors.socialId)}
            helperText={touched.socialId && errors.socialId}
            InputProps={{
              readOnly: !isUpdateMode,
            }}
          />

          {
            isUpdateMode
            ?
            <>
              <TextField
                fullWidth
                name='password'
                label='Password'
                {...getFieldProps('password')}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <LoadingButton
                fullWidth size="large"
                type="submit"
                variant="contained"
              >
                Save
              </LoadingButton>
            </>
            : ''
          }

        </Stack>
      </Form>
    </FormikProvider>
  );
}
