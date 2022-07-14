import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, List,
  Box, ListItem, ListItemText, ListItemButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../reducers/projectsReducer'
import { getProject } from '../../reducers/projectReducer'
import moment from 'moment'

const ProjectList = () => {
  const loggedInUser = useSelector(state => state.loggedIn)
  const projects = useSelector(state => state.projects)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleShow = (projectId, token, history) => {
    console.log('muuu')
    dispatch(getProject(projectId, token, history))
  }
  const handleDelete = (projectId, token) => {
    dispatch(deleteProject(projectId, token))
  }
  if (projects.length === 0) {
    return (
      <Box>
        <Typography ml={6}>
          No projects added yet.
        </Typography>
      </Box>
    )
  }
  return (
    <List sx={{ width: '100%', maxWidth: 460, backgroundColor: '#e3fcf6' }}>
      { projects.map(project =>
        <ListItem key={project.id}>
          <ListItemText
            primary={project.name}
            secondary={`Project owner: ${project.projectOwner.username} Starting date: ${moment(project.startDay).format('DD.MM.YYYY')}`}
          />
          <ListItemButton
            onClick={() => handleShow(project.id, loggedInUser.token, history)}
            variant='contained'
            sx={{ width: '100%', maxWidth: 120, backgroundColor: '#c5f9d6' }}
          >
            Show project
          </ListItemButton>
          { project.projectOwner.userId === loggedInUser.id
            ? <ListItemButton
              variant='contained'
              sx={{ width: '100%', maxWidth: 100, backgroundColor: '#fc8179' }}
              onClick={() => { if (window.confirm('Are you sure you want to delete this project?')) { handleDelete(project.id, loggedInUser.token) } }}
            >
                Remove
            </ListItemButton>
            : null
          }
        </ListItem>
      )}
    </List>
  )
}

export default ProjectList