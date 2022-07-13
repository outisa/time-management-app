import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import ProjectReducer from './reducers/projectReducer'

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  loggedIn: loginReducer,
  projects: ProjectReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store