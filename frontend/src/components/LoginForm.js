import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { Container, TextField, Button } from '@mui/material'
import { loginUser } from './../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
})

const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values.username, values.password, history))
    }
  })
  return (
    <Container maxWidth='sm' >
      <form
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          id='login-username'
          label='Username'
          name='username'
          variant='outlined'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id='login-password'
          label='Password'
          name='password'
          type='password'
          variant='outlined'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          id='login'
          type='submit'
          variant='contained'
          color='primary'
        >
          Login
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm