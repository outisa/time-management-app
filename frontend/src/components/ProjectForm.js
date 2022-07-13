import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { Container, TextField, Button } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { createProject } from '../reducers/projectReducer'

const validationSchema = yup.object().shape({
  name: yup
    .string('Enter project name')
    .min(7, 'Project name should be minimum of 7 charachters long.')
    .max(27, 'Project name should be maximum of 27 characters long.')
    .required('Project name is required.'),
  startDay: yup
    .date()
    .transform((_value, originalValue) => {
      const correctDay = moment(originalValue, 'YYYY-MM-DD', true).toDate()
      return correctDay
    })
    .required('Starting day is required'),
  endDay: yup
    .date()
    .transform((_value, originalValue) => {
      const correctDay = moment(originalValue, 'YYYY-MM-DD', true).toDate()
      return correctDay
    })
    .min(yup.ref('endDay'), 'End date must be later than the start date'),
  projectDescription: yup.string().notRequired()
})

const ProjectForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const formik =  useFormik({
    initialValues: {
      name: '',
      startDay: '',
      endDay: '',
      projectDescription: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createProject(values.name, values.startDay, values.endDay, values.projectDescription, user.token))
    }
  })
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='name'
          label='Project name'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id='description'
          label='Project description'
          value={formik.values.projectDescription}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            id='startDate'
            label='Start Date'
            value={formik.values.startDay}
            onChange={(value) => {
              formik.setFieldValue('startDay', Date.parse(value))
            }}
            renderInput={(params) => <TextField {...params} />}
            error={formik.touched.startDay && Boolean(formik.errors.startDay)}
            helperText={formik.touched.startDay && formik.errors.startDay}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            id='EndDate'
            label='End Date'
            value={formik.values.endDay}
            onChange={(value) => {
              formik.setFieldValue('endDay', Date.parse(value))
            }}
            renderInput={(params) => <TextField {...params} />}
            error={formik.touched.endDay && Boolean(formik.errors.endDay)}
            helperText={formik.touched.endDay && formik.errors.endDay}
          />
        </LocalizationProvider>
        <Button color="primary" variant='contained' id='createProject' fullWidth type='submit'>
          Create new project
        </Button>
      </form>
    </Container>
  )
}

export default ProjectForm
