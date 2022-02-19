const reducer = (state = '', action) => {
  switch(action.type) {
  case 'NEW_NOTIFICATION': {
    return action.notification
  }
  default: return state
  }
}

let timer

export const setNotification = ( notification ) => {
  return async dispatch => {
    if(notification) {
      console.log(notification)
      clearTimeout(timer)
      timer = setTimeout(() => {
        dispatch(setNotification(''))
      }, 4000)
    }
    dispatch({
      type: 'NEW_NOTIFICATION',
      notification: notification
    })
  }
}

export default reducer