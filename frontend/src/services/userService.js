import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/user'

const register = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, credentials)
    return response
  } catch (error) {
    return error.response.data
  }
}

export default { register }