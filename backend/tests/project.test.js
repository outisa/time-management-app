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
  await api.post('/api/user/').send(user)
})

const logIn = async () => {
  const loggendInUser = await api.post('/api/user/login')
    .send({
      username: 'testuser',
      password: 'very_tentative'
    })
  return loggendInUser
}
describe('Projects can be added', () => {
  test('Valid project can be added', async () => {
    const loggendInUser = await logIn()

    const newProject = {
      name: 'My studies: summer period',
      startDay: '2022-06-01',
      endDay: '2022-09-01',
      projectDescription: 'Time accounting for summer period.'
    }
    const response = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(201)
    expect(response.body.name).toContain('My studies: summer period')
  })

  test('Project with missing dates cannot be added', async () => {
    const loggendInUser = await logIn()
    const newProject = {
      name: 'My studies: summer period',
      startDay: '',
      endDay: '',
      projectDescription: 'Time accounting for summer period.'
    }
    const response = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(400)

    expect(response.body.error).toContain('Project must have start and end days.')
  })

  test('Project with invalid dates cannot be added', async () => {
    const loggendInUser = await logIn()
    const newProject = {
      name: 'My studies: summer period',
      startDay: '2022-09-01',
      endDay: '2022-06-01',
      projectDescription: 'Time accounting for summer period.'
    }

    const response = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(400)

    expect(response.body.error).toContain('Starting day must be before ending day.')
  })
})

describe('Projects can be updated with a marking', () => {
  test('A valid marking can be added', async () => {
    const loggendInUser = await logIn()

    const newProject = {
      name: 'Project 1',
      startDay: '2022-06-01',
      endDay: '2022-09-10',
      projectDescription: 'Time accounting for summer period.'
    }
    const createdProject = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(201)
    const newMarking = {
      day: '2022-09-02',
      hours: 2,
      mins:27,
      description: 'Wrote testing scenarios'
    }

    const response = await api.put(`/api/projects/addmarkings/${createdProject.body.id}`)
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newMarking)
      .expect(200)
    const time = 60*27*2
    expect(response.body.markings[0].timeMarking.description).toContain('Wrote testing scenarios')
    expect(response.body.markings[0].timeMarking.timeMarked).toBeCloseTo(time, 0)
  })
})

describe('Projects can be deleted', () => {
  test('A valid marking can be added', async () => {
    const loggendInUser = await logIn()

    const newProject = {
      name: 'Project 1',
      startDay: '2022-06-01',
      endDay: '2022-09-10',
      projectDescription: 'Time accounting for summer period.'
    }
    const createdProject = await api.post('/api/projects')
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send(newProject)
      .expect(201)

    await api.delete(`/api/projects/${createdProject.body.id}`)
      .set('Authorization', `bearer ${loggendInUser.body.token}`)
      .send({})
      .expect(204)
  })
})
afterAll(() => {
  mongoose.connection.close()
})