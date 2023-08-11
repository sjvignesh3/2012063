import React from 'react'
import {AppBar, Box, Typography} from '@mui/material';

const Header = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{background: '#123sfx', position: 'static', padding: 15}}>
          <Typography variant='h4' color={'black'} fontWeight="bold">Train Central</Typography>
        </AppBar>
      </Box>
    </div>
  )
}

export default Header;