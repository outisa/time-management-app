import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/user'

const register = (credentials) => {
  return axios.post(`${baseUrl}/register`, credentials)
    .then(response => response)
    .catch(error => error.data)
}

export default { register }