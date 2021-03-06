import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Container, Button, TextField } from '@mui/material/'
import { register } from './../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(4, 'Username should be minimum of 4 charackters long')
    .max(20, 'Username should be maximum of 20 charackters long')
    .required('Username is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(10, 'Password should be minimum of 10 charackters long')
    .max(100, 'Password should be maximum of 100 charackters long')
    .required('Username is required'),
})

const UserRegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(register(values.username, values.email, values.password, history))
    }
  })

  return (
    <Container maxWidth='sm'>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='username'
          name='username'
          label='Username'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant='contained' id='register' fullWidth type='submit'>
          Register
        </Button>
      </form>
    </Container>
  )
}

export default UserRegisterForm