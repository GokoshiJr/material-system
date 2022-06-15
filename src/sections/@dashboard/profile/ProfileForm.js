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
  const { loggedUser, setLoggedUser } = auth
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: 
      Yup.string() 
      .min(2, 'Too Short!').max(50, 'Too Long!')
      .required('First name required'),  
    email: 
      Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    social_id: Yup.number().required('Social ID is required'),
    phone_number: Yup.string().required('Phone number is required'),
    direction: Yup.string().required('Direction is required'),
    password: Yup.string().min(8, 'Minimal eight characters').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      _id: '',
      username: 'Loading...',
      email: 'Loading...',
      social_id: 'Loading...',
      phone_number: 'Loading...',
      direction: 'Loading...',
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
    if (loggedUser) {
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
  }, [loggedUser])

  useEffect(() => {
    if (loggedUser && !isUpdateMode) {
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
  }, [isUpdateMode])

  const _updateLoggedUser = async (values) => {
    const {data} = await updateLoggedUser(auth.token, values)
    console.log(data.user)
    setLoggedUser(data.user)
    setIsUpdateMode(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(values)
    _updateLoggedUser(values)
    
    // auth.setLoggedUser(user)
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>            
            <TextField
              fullWidth
              name='username'
              label='UserName'
              {...getFieldProps('username')}
              onChange={handleChange}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              InputProps={{
                readOnly: !isUpdateMode,
              }}
            />

            <TextField
              fullWidth
              name='social_id'
              label="Social ID"
              {...getFieldProps('social_id')}
              onChange={handleChange}
              error={Boolean(touched.social_id && errors.social_id)}
              helperText={touched.social_id && errors.social_id}
              InputProps={{
                readOnly: !isUpdateMode,
              }}
            />            
          </Stack>

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

          <TextField
            fullWidth
            name='phone_number'
            label='Phone Number'
            {...getFieldProps('phone_number')}
            onChange={handleChange}
            error={Boolean(touched.phone_number && errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
            InputProps={{
              readOnly: !isUpdateMode,
            }}
          />

          <TextField
            fullWidth
            name='direction'
            label='Direction'
            {...getFieldProps('direction')}
            onChange={handleChange}
            error={Boolean(touched.direction && errors.direction)}
            helperText={touched.direction && errors.direction}
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
