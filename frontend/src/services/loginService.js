import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/user'

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export default { loginUser }