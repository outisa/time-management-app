import { Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const ProjectView = () => {
  const project = useSelector(state => state.project)
  if (!project) {
    return null
  }
  return (
    <>
      <Container>
        <Typography variant='h2'>
          {project.name}
        </Typography>
      </Container>
    </>
  )
}

export default ProjectView
