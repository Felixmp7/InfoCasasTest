import React from 'react'
import TextField from "@material-ui/core/TextField";


export const SearchBar = ({title, handleSearch}) => {
  return (
    <TextField
      fullWidth
      id="standard-basic3"
      label="Search..."
      // placeholder="eg: implement header section"
      value={title}
      onChange={handleSearch}
    />
  );
}
