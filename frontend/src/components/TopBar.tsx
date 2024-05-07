import React from 'react'
import { AppBar,Toolbar, Typography } from '@mui/material'

const TopBar = () => {
  return (
    <AppBar position="relative" sx={{
        bgcolor:'primary.dark'
      }}>
        <Toolbar>
          <Typography variant="h6">Basic notePad</Typography>
        </Toolbar>
      </AppBar>  )
}

export default TopBar