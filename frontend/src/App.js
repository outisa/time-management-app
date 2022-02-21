import React from 'react'
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material'
import {
  Switch, Route, Link, useHistory
} from 'react-router-dom'
import UserRegisterForm from './components/UserRegistForm'
import Home from './components/Home'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { logout  } from './reducers/loginReducer'

const App = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const logoutUser = async () => {
    dispatch(logout(history))
  }
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
          </IconButton>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          {user
            ? null :
            <Button color='inherit' component={Link} to='/register'>
              Register
            </Button>
          }
          {user
            ? <em>{user.username} logged in</em>
            : <Button color='inherit' component={Link} to='/login'>
                Login
            </Button>
          }
          {user
            ? <Button id='logout' onClick={logoutUser} color='inherit' component={Link} to='/'>
              Logout
            </Button>
            : null
          }
        </Toolbar>
      </AppBar>
      <Container>
        <Notification />
        <Switch>
          <Route path='/register'>
            <UserRegisterForm />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App
