import React, { useEffect } from 'react'
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material'
import {
  Switch, Route, Link, useHistory, Redirect
} from 'react-router-dom'
import UserRegisterForm from './components/UserRegistForm'
import Home from './components/Home'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { getLoggedInUser, logout  } from './reducers/loginReducer'
import ProjectView from './components/project/ProjectView'

const App = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedIn)
  useEffect(() => {
    dispatch(getLoggedInUser())
  },[dispatch, history])

  const logoutUser = async () => {
    dispatch(logout(history))
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
          </IconButton>
          {user
            ? <Button color='inherit' component={Link} to='/'>
                Home
            </Button>
            : null
          }
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
      <Container sx={{ backgroundColor: '#f2f2f2' }}>
        <Notification />
        { user ?
          <Switch>
            <Route path='/projectinfo'>
              <ProjectView />
            </Route>
            <Route path='/'>
              < Home />
            </Route>
          </Switch>
          :
          <Switch>
            <Route path='/register'>
              <UserRegisterForm />
            </Route>
            <Route path='/login'>
              <LoginForm />
            </Route>
            <Route path='/'>
              <Redirect to='/login' />
            </Route>
          </Switch>
        }
      </Container>
    </div>
  )
}

export default App
