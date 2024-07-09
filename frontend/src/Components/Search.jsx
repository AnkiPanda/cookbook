import React from 'react'
import { TextField, InputAdornment, IconButton, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"
import AddIcon from '@mui/icons-material/Add';

const Search = () => {
  return (
   
    <Box display="flex" alignItems="center" sx={{ width: "70%", margin:"auto", mt: 3, mb:2 }}>
     <TextField
        variant="outlined"
        fullWidth
        placeholder="Search Recipes..."
        className='searchInput'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#8b0000cf',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8b0000cf',
              },
            },
           
          }}
      />
      <Button
       variant="outlined"
       color="error"
       sx={{ height:"45px", width: "200px",  ml: 2 }}>

         Add A Recipe
      </Button>
    </Box>
   
  )
}

export default Search
