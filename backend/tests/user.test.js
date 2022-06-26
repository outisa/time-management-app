const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('./../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const password = await bcrypt.hash('very_tentative',10)
  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    passwordHash: password
  })
  await user.save()
})

describe('register', () => {
  test('A valid user can register', async () => {
    const user = {
      username: 'new_user',
      email: 'new_user@example.com',
      password: 'very_secret'
    }
    await api.post('/api/user/')
      .send(user)
      .expect(200)
  })
  test('A invalid user cannot register', async () => {
    const users =[{
      username: 'new',
      email: 'new_user@example.com',
      password: 'very_secret'
    },
    {
      username: 'newuserrrrrrrrrrrrrrrrrr',
      email: 'new_user@example.com',
      password: 'very_secret'
    },
    {
      username: 'testuser',
      email: 'new_user@example.com',
      password: 'very_secret'
    },
    {
      username: 'new_user',
      email: 'testuser@example.com',
      password: 'very_secret'
    },
    {
      username: 'new_user',
      email: 'example.com',
      password: 'very_secret'
    },
    {
      username: 'new_user',
      email: '',
      password: 'very_secret'
    },
    {
      username: 'newUser',
      email: 'new_user@example.com',
      password: 'yhdeksan9'
    },
    {
      username: 'newUser',
      email: 'new_user@example.com',
      password: 'qwuoipnty5gv4fedqwr5bn5y6mnu7uhe6yvgw5cd45bv4ertf345qwuoipnty5gv4fedqwr5bn5y6mnu7uhe6yvgw5cd45bv4ertf34'
    }]
    let response = await api.post('/api/user/')
      .send(users[7])
      .expect(400)
    expect(response.body.error).toContain('Password length must be between 10 and 100 characters.')

    response = await api.post('/api/user/')
      .send(users[6])
      .expect(400)
    expect(response.body.error).toContain('Password length must be between 10 and 100 characters.')

    response = await api.post('/api/user/')
      .send(users[5])
      .expect(400)
    expect(response.body.error).toContain('A valid email address is required.')

    response = await api.post('/api/user/')
      .send(users[4])
      .expect(400)
    expect(response.body.error).toContain('Check that the typed email address is valid.')

    response = await api.post('/api/user/')
      .send(users[3])
      .expect(400)
    expect(response.body.error).toContain('User validation failed: email: Username and email should be unique.')

    response = await api.post('/api/user/')
      .send(users[2])
      .expect(400)
    expect(response.body.error).toContain('User validation failed: username: Username and email should be unique.')

    response = await api.post('/api/user/')
      .send(users[1])
      .expect(400)
    expect(response.body.error).toContain('Username should be between 4 and 20 characters long.')

    response = await api.post('/api/user/')
      .send(users[0])
      .expect(400)
    expect(response.body.error).toContain('Username should be between 4 and 20 characters long.')
  })
})

describe('User can log in', () => {
  test('User can register and log in with valid credentials', async () => {
    const user = {
      username: 'new_user',
      email: 'new_user@example.com',
      password: 'very_secret'
    }
    await api.post('/api/user/')
      .send(user)
      .expect(200)
    await api.post('/api/user/login')
      .send({
        username: 'new_user',
        password: 'very_secret'
      })
      .expect(200)
  })
  test('User can log in with valid credentials', async () => {
    await api.post('/api/user/login')
      .send({
        username: 'testuser',
        password: 'very_tentative'
      })
      .expect(200)
  })
  test('User cannot log in with invalid credentials', async () => {
    // Invalid username
    let response = await api.post('/api/user/login')
      .send({
        username: 'testUser',
        password: 'very_tentative'
      })
      .expect(400)
    expect(response.body.error).toContain('Invalid username or password.')
    // Invalid password
    response = await api.post('/api/user/login')
      .send({
        username: 'testuser',
        password: 'verytentative'
      })
      .expect(400)
    expect(response.body.error).toContain('Invalid username or password.')
  })
})

afterAll(() => {
  mongoose.connection.close()
})