import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
// Context
import { AppContext } from '../../../context/AppContext'
// ----------------------------------------------------------------------

const API_URL = process.env.REACT_APP_API_URL;

export default function LoginForm() {
  const Auth = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8,'Must be almost 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      login();
    },
  });

  const {
    setErrors,
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  const login = () => {
    // form values
    const { email, password } = values
    // api sync
    axios.post(`${API_URL}/auth/signin`, { email, password })
    .then(({data}) => {
      localStorage.setItem("token", data.token);
      Auth.setToken(data.token)
      navigate('/dashboard/app', { replace: true });
    })
    .catch((err) => {
      setSubmitting(false);
      const { status: text, type } = err.response.data;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text
      });
      if (type === 'email') setErrors({ email: text })
      if (type === 'password') setErrors({ password: text })
    })
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
