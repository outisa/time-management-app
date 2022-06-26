const router = require('express').Router()
const Project = require('../models/project')
const Marking = require('../models/marking')
const { response } = require('express')
const { tokenExtractor } = require('../utils/tokenExtractor')

router.get('/:id', tokenExtractor, async (req, res) => {
  if (req.user){
    const projectInfo = await Project
      .findById(req.params.id)
      .populate('projectOwner', { username: 1, id: 1 })
      .populate({
        path: 'members.user',
        model: 'User',
        select: { username: 1, id: 1 }
      })
      .populate({
        path: 'markings.marking',
        model: 'Marking',
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

    if (new Date(body.startDay).getTime() > new Date(body.endDay).getTime()) {
      return res.status(400).send({ error: 'Starting day must be before ending day.' })
    }

    const projectToAdd = {
      name: body.name,
      startDay: body.startDay,
      endDay: body.endDay,
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
      path: 'markings.marking',
      model: 'Marking',
      populate: {
        path: 'user',
        model: 'User',
        select: { username: 1, id: 1 }
      }
    })
  const member = projectToBeModified.members.find((member) => member.user.id === req.user.id)
  //console.log(member)
  if ((req.user.id === projectToBeModified.projectOwner.id)
        || (member && member.canEdit)) {
    const { day, hours, mins, description } = req.body
    // Save the time in seconds
    const timeInSeconds = 60*mins*hours
    // ToDo: Check total used time on this current project
    // ToDo: Check that day is within project window and does not exceed today's date
    const newMarking = {
      day: day,
      timeMarked: timeInSeconds,
      description: description,
      user: req.user
    }
    const createdMarking = new Marking(newMarking)
    await createdMarking.save()
    let changes = {
      markings: projectToBeModified.markings.concat(createdMarking),
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
        path: 'markings.marking',
        model: 'Marking',
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
    if (req.user.id === project.projectOwner.id){
      await Project.findByIdAndRemove(req.params.id)
      response.status(204).end()
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = router