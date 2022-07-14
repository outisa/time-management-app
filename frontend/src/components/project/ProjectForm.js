import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { Container, TextField, Button } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { createProject } from '../../reducers/projectsReducer'

const validationSchema = yup.object().shape({
  name: yup
    .string('Enter project name')
    .min(7, 'Project name should be minimum of 7 charachters long.')
    .max(27, 'Project name should be maximum of 27 characters long.')
    .required('Project name is required.'),
  projectDescription: yup
    .string()
    .max(2000, 'Maximum length of the project description is 2000 characters')
    .notRequired(),
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
      console.log(correctDay)
      return correctDay
    })
    .min(yup.ref('startDay'), 'End date must be later than the start date')
    .required('Ending date is required'),
})

const ProjectForm = ({ handleClose }) => {
  const loggedInUser = useSelector(state => state.loggedIn)
  const dispatch = useDispatch()
  const formik =  useFormik({
    initialValues: {
      name: '',
      projectDescription: '',
      startDay: '',
      endDay: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const endDay = moment(values.endDay).format('YYYY-MM-DD')
      const startDay = moment(values.startDay).format('YYYY-MM-DD')
      dispatch(createProject(values.name, startDay, endDay, values.projectDescription, loggedInUser.token))
      handleClose()
    }
  })
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='name'
          label='Project name'
          margin='normal'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id='projectDescription'
          label='Project description'
          margin='normal'
          value={formik.values.projectDescription}
          onChange={formik.handleChange}
          error={formik.touched.projectDescription && Boolean(formik.errors.projectDescription)}
          helperText={formik.touched.projectDescription && formik.errors.projectDescription}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={formik.values.startDay}
            onChange={(value) => {
              formik.setFieldValue('startDay', value, true)
            }}
            renderInput={(params) =>
              <TextField
                error={formik.touched.startDay && Boolean(formik.errors.startDay)}
                helperText={formik.touched.startDay && formik.errors.startDay}
                id='startDay'
                label='Start Date'
                margin='normal'
                name='startDay'
                variant='standard'
                fullWidth
                {...params}
              />
            }
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={formik.values.endDay}
            onChange={(value) => {
              formik.setFieldValue('endDay', value, true)
            }}
            renderInput={(params) =>
              <TextField
                error={formik.touched.endDay && Boolean(formik.errors.endDay)}
                helperText={formik.touched.endDay && formik.errors.endDay}
                id='endDay'
                label='End Date'
                margin='normal'
                name='endDay'
                variant='standard'
                fullWidth
                {...params}
              />
            }
          />
        </LocalizationProvider>
        <Button
          color='primary'
          variant='contained'
          id='createProject'
          type='submit'>
          Create new project
        </Button>
      </form>
    </Container>
  )
}

export default ProjectForm
