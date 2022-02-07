import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
const reducer = combineReducers({
  userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store