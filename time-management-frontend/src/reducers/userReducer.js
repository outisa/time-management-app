import userService from './../services/userService'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'REGISTER': {
    return action.data
  }
  default: return state
  }
}

export const register = (username, email, password) => {
  return async (dispatch) => {
    let response = await userService.register({ username, email, password })
    if (response && !response.error) {
      console.log(`Registration successful ${username}`)
    } else {
      dispatch({
        type: 'REGISTER',
        data: null
      })
      console.log(response.error)
    }
  }
}

export default userReducer