import projectService from '../services/projectService'
import { setNotification } from './notificationReducer'

const ProjectsReducer = (state = [], action ) => {
  switch(action.type) {
  case 'ALL_PROJECTS': {
    return action.data
  }
  case 'CREATE_PROJECT' : {
    return [...state, action.data]
  }
  case 'DELETE_PROJECT' : {
    return state.filter(project => project.id !== action.data)
  }
  default: return state
  }
}

export const getProjects = (userId, token) => {
  return async (dispatch) => {
    const response = await projectService.getProjects(userId, token)
    if(response.error) {
      dispatch(setNotification({ message: response.error, type: 'error' }))
    } else {
      dispatch({
        type: 'ALL_PROJECTS',
        data: response.data
      })
    }
  }
}

export const createProject = (name, startDay, endDay, projectDescription, token) => {
  return async (dispatch) => {
    const response = await projectService.createProject(name, startDay, endDay, projectDescription, token)
    if (response.error) {
      dispatch(setNotification({ message: response.error, type: 'error' }))
    } else {
      dispatch({
        type: 'CREATE_PROJECT',
        data: response.data
      })
      dispatch(setNotification({ message: `New project ${name} created`, type: 'success' }))
    }
  }
}

export const deleteProject = (projectId, token) => {
  return async (dispatch) => {
    const response = await projectService.deleteProject(projectId, token)
    if (response.status !== 204) {
      dispatch(setNotification({ message: response.error, type: 'error' }))
    } else {
      dispatch({
        type: 'DELETE_PROJECT',
        data: projectId
      })
      dispatch(setNotification({ message: 'Project deleted successfully', type: 'success' }))
    }
  }
}

export default ProjectsReducer