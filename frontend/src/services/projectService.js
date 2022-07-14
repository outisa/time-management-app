import axios from 'axios'

const baseUrl = 'api/projects'

const getProjects = async (userId, token) => {
  const config = { headers: { Authorization: token } }
  try {
    return await axios.get(`${baseUrl}/myprojects/${userId}`, config)
  } catch (error) {
    return error.response.data
  }
}

const getProject = async (projectId, token) => {
  const config = { headers: { Authorization: token } }
  try {
    return await axios.get(`${baseUrl}/${projectId}`, config)
  } catch (error) {
    return error.response.data
  }
}

const createProject = async (name, startDay, endDay, projectDescription, token) => {
  const config = { headers: { Authorization: token } }
  const newProject = {
    name: name,
    startDay: startDay,
    endDay: endDay,
    projectDescription: projectDescription
  }
  try {
    return await axios.post(baseUrl, newProject, config)
  } catch (error) {
    return error.response.data
  }
}

const deleteProject = async (id, token) => {
  const config = { headers: { Authorization: token } }
  try {
    return axios.delete(`${baseUrl}/${id}`, config)
  } catch (error) {
    return error.response.data
  }
}

export default  { getProjects, getProject, createProject, deleteProject }
