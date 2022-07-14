import React from 'react'
import { Typography,
  Box } from '@mui/material'

import ProjectList from './project/Projects'
import ProjectModal from './project/ProjectModal'

const Home = () => {
  return (
    <>
      <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
        <Box gridColumn='span 8'>
          <Typography variant='h2' mt={4} ml={8}>
            My Projects
          </Typography>
        </Box>
        <Box gridColumn='span 4'>
          <ProjectModal />
        </Box>
        <Box gridColumn='span 8'>
          <ProjectList />
        </Box>
      </Box>
    </>
  )
}

export default Home