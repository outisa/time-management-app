import React from 'react'
import { Typography, List,
  Box, ListItem, ListItemText, ListItemButton } from '@mui/material'


const ProjectList = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <Box>
        <Typography ml={6}>
          No projects added yet.
        </Typography>
      </Box>
    )
  }
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      { projects.map(project =>
        <ListItem key={project.id}>
          <ListItemText
            primary={project.name} secondary={project.startDay}
          />
          <ListItemButton>
            Show
          </ListItemButton>
          <ListItemButton>
            Remove
          </ListItemButton>
        </ListItem>
      )}
    </List>
  )
}

export default ProjectList