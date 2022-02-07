import React from 'react'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import {
  BrowserRouter as Router, Switch,
  Route, Link
} from 'react-router-dom'
import UserRegisterForm from './components/UserRegistForm'
import Home from './components/Home'

const App = () => {
  const user = null
  return (
    <Router>
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
            ? <em>{user} logged in</em>
            : <Button color='inherit' component={Link} to='/login'>
                Login
            </Button>
          }
          {user
            ? <Button color='inherit' component={Link} to='/login'>
              Logout
            </Button>
            : null
          }
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path='/register'>
          <UserRegisterForm />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
