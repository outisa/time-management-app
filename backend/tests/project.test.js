const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Project = require('../models/project')
const Marking = require('../models/marking')


beforeEach(async () => {
  await Marking.deleteMany({})
  await Project.deleteMany({})
  await User.deleteMany({})
  const password = await bcrypt.hash('very_tentative',10)
  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    passwordHash: password
  })
  await user.save()
  await api.post('/api/user/')
    .send(user)
})
describe('Projects can be added',  () => {
  test('Valid project can be added', async () => {
    const loggendInUser = await api.post('/api/user/login')
      .send({
        username: 'testuser',
        password: 'very_tentative'
      })
    const start = new Date('2022-06-01')
    const end = new Date('2022-09-01')

    const newProject = {
      name: 'My studies: summer period',
      startDay: start,
      endDay: end,
      projectDescription: 'Time accounting for summer period.'
    }
    const response = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(201)
    expect(response.body.name).toContain('My studies: summer period')
  })

  test('Project with missing dates cannot be added', async () => {
    const loggendInUser = await api.post('/api/user/login')
      .send({
        username: 'testuser',
        password: 'very_tentative'
      })
    const start = ''
    const end = ''
    const newProject = {
      name: 'My studies: summer period',
      startDay: start,
      endDay: end,
      projectDescription: 'Time accounting for summer period.'
    }
    const response = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(400)

    expect(response.body.error).toContain('Project must have start and end days.')
  })

  test('Project with invalid dates cannot be added', async () => {
    const loggendInUser = await api.post('/api/user/login')
      .send({
        username: 'testuser',
        password: 'very_tentative'
      })
    const start = new Date('2022-09-01')
    const end = new Date('2022-05-01')
    const newProject = {
      name: 'My studies: summer period',
      startDay: start,
      endDay: end,
      projectDescription: 'Time accounting for summer period.'
    }

    const response = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(400)

    expect(response.body.error).toContain('Starting day must be before ending day.')
  })
})
// describe('Projects can be updated', () =>{

//})

afterAll(() => {
  mongoose.connection.close()
})