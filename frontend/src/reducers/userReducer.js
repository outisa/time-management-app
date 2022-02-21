import userService from './../services/userService'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'REGISTER': {
    return action.user
  }
  default: return state
  }
}

export const register = (username, email, password, history) => {
  return async (dispatch) => {
    let response = await userService.register({ username, email, password })
    if(response && !response.error) {
      dispatch(setNotification({ message: `Your are successfully registered ${username}`, type: 'success' }))
      history.push('/login')
    } else {
      dispatch({
        type: 'REGISTER',
        user: null
      })
      dispatch(setNotification({ message: response.error, type: 'error' }))
    }
  }
}

export default userReducer