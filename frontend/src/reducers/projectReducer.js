import projectService from '../services/projectService'
import { setNotification } from './notificationReducer'

const ProjectReducer = (state = null, action ) => {
  switch(action.type) {
  case 'GET_PROJECT': {
    return action.project
  }
  default: return state
  }
}

export const getProject = (projectId, token, history) => {
  return async (dispatch) => {
    const project = await projectService.getProject(projectId, token)
    if (project.error) {
      dispatch(setNotification({ message: project.error, type: 'error' }))
    } else {
      dispatch({
        type: 'GET_PROJECT',
        project: project.data
      })
      history.push('/projectinfo')
    }
  }
}

export default ProjectReducer