// Dependencies
import React from 'react'
// Components
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";


export const SearchBar = ({title, handleSearch}) => {
  return (
    <div>
      <Typography variant="h6">Search Todo</Typography>
      <TextField
        fullWidth
        id="standard-basic3"
        label="Search..."
        value={title}
        onChange={handleSearch}
      />
    </div>
  );
}
