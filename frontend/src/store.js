import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import ProjectsReducer from './reducers/projectsReducer'
import ProjectReducer from './reducers/projectReducer'

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  loggedIn: loginReducer,
  projects: ProjectsReducer,
  project: ProjectReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store