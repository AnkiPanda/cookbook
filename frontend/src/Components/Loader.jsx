import React from 'react'
//import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import "./Loader.css"

const Loader = () => {
  return (
   
     <div className='loader'>
      <CircularProgress color="secondary" />
      </div>
  
  )
}

export default Loader
