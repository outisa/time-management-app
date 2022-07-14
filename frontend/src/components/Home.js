import React, { useState } from 'react'
import { Typography,
  Box, Button, Modal } from '@mui/material'
import { useSelector } from 'react-redux'
import ProjectForm  from './ProjectForm'
import ProjectList from './Projects'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const NewProjectModule = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={handleOpen}>Add New Project</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Create new project
          </Typography>
          <ProjectForm handleClose={handleClose}/>
        </Box>
      </Modal>
    </>
  )
}
const Home = () => {
  const projects = useSelector(state => state.projects)
  return (
    <>
      <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
        <Box gridColumn='span 8'>
          <Typography variant='h2' mt={4} ml={8}>
            My Projects
          </Typography>
        </Box>
        <Box gridColumn='span 4'>
          <NewProjectModule />
        </Box>
        <Box gridColumn='span 8'>
          <ProjectList projects = {projects} />
        </Box>
      </Box>
    </>
  )
}

export default Home