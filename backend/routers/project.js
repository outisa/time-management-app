const router = require('express').Router()
const Project = require('../models/project')
const User = require('../models/user')
const TimeMarking = require('../models/marking')
const { tokenExtractor } = require('../utils/tokenExtractor')

// NOT YET CHECKED WHETHER IT WORKS WITH MEMBERS
router.get('/myprojects/:id', tokenExtractor, async (req, res) => {
  if (req.user && (req.user.id === req.params.id)) {
    const user = await User.findById(req.params.id)
    const projectInfo = await Project
      .find({ projectOwner: user,  'members.member': user })
      .populate('projectOwner', { username: 1, id: 1 })
      .populate({
        path: 'members.user',
        model: 'User',
        select: { username: 1, id: 1 }
      })
      .populate({
        path: 'markings.timeMarking',
        model: 'TimeMarking',
        populate: {
          path: 'user',
          model: 'User',
          select: { username: 1, id: 1 }
        }
      })
    res.send(projectInfo)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

router.get('/:id', tokenExtractor, async (req, res) => {
  if (req.user) {
    const projectInfo = await Project
      .findById(req.params.id)
      .populate('projectOwner', { username: 1, id: 1 })
      .populate({
        path: 'members.user',
        model: 'User',
        select: { username: 1, id: 1 }
      })
      .populate({
        path: 'markings.timeMarking',
        model: 'TimeMarking',
        populate: {
          path: 'user',
          model: 'User',
          select: { username: 1, id: 1 }
        }
      })
    res.send(projectInfo)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  if (req.user) {
    const body = req.body

    if (!body.startDay || !body.endDay) {
      return res.status(400).send({ error: 'Project must have start and end days.' })
    }
    const start = new Date(body.startDay)
    const end = new Date(body.endDay)
    if (start.getTime() > end.getTime()) {
      return res.status(400).send({ error: 'Starting day must be before ending day.' })
    }

    const projectToAdd = {
      name: body.name,
      startDay: start,
      endDay: end,
      members: [],
      projectOwner: req.user,
      markings: [],
      projectDescription: body.description
    }
    const createdProject = new Project(projectToAdd)
    await createdProject.save()
    res.status(201).json(createdProject)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }

})

// router for modify project info also here-> add new members, change their rights
// TODO
// Add a new markings FUNCTIONALITY NOT YET TESTED
router.put('/addmarkings/:id', tokenExtractor, async (req, res) => {
  let projectToBeModified = await Project
    .findById(req.params.id)
    .populate('projectOwner', { username: 1, id: 1 })
    .populate({
      path: 'members.user',
      model: 'User',
      select: { username: 1, id: 1 }
    })
    .populate({
      path: 'markings.timeMarking',
      model: 'TimeMarking',
      populate: {
        path: 'user',
        model: 'User',
        select: { username: 1, id: 1 }
      }
    })

  const member = projectToBeModified.members.find((member) => member.user.id === req.user.id)

  if ((req.user.id === projectToBeModified.projectOwner.id)
        || (member && member.canEdit)) {
    const { day, hours, mins, description } = req.body
    // Save the time in seconds
    const timeInSeconds = 60*mins*hours
    // ToDo: Check total used time on this current project
    // ToDo: Check that day is within project window and does not exceed today's date
    const newMarking = {
      day: new Date(day),
      timeMarked: timeInSeconds,
      description: description,
      user: req.user
    }
    const createdMarking = new TimeMarking(newMarking)

    await createdMarking.save()
    let changes = {
      markings: projectToBeModified.markings.concat({ 'timeMarking': createdMarking }),
    }
    const updatedProject = await Project
      .findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true, context: 'query' })
      .populate('projectOwner', { username: 1, id: 1 })
      .populate({
        path: 'members.user',
        model: 'User',
        select: { username: 1, id: 1 }
      })
      .populate({
        path: 'markings.timeMarking',
        model: 'TimeMarking',
        populate: {
          path: 'user',
          model: 'User',
          select: { username: 1, id: 1 }
        }
      })

    res.status(200).json(updatedProject)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  if (req.user) {
    const project = await Project
      .findById(req.params.id)
      .populate('projectOwner', { id: 1 })
    if (!project) {
      res.status(404).json({ error: 'Project does not exists' })
    }
    if (req.user.id === project.projectOwner.id){
      await Project.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = router