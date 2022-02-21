import loginService from '../services/loginService'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN': {
    return action.data
  }
  case 'LOGOUT': {
    return action.data
  }
  default: return state
  }
}

export const loginUser = (username, password, history) => {
  return async (dispatch) => {
    let user = await loginService.loginUser({ username, password })
    if(user && !user.error) {
      user.token = `bearer ${user.token}`
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        data: user
      })
      dispatch(setNotification({ message: `Welcome ${username}!` , type: 'success' }))
      history.push('/')
    } else {
      dispatch({
        type: 'LOGIN',
        data: null
      })
      dispatch(setNotification({ message: `${user.error}` , type: 'error' }))
    }
  }
}

export const logout = (history) => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT',
      data: null
    })
    dispatch(setNotification({ message: 'You are now successfully logged out!' , type: 'success' }))
    history.push('/')
  }
}

export default reducer