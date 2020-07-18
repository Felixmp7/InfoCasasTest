import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createNewTodo } from "../api/jsonApi";

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // console.log(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
    // console.log(event.target.value);
  }

  const sendData = () => {
    createNewTodo(title,content);
    console.log(title,content)
  }

  return (
    <div style={{marginBottom: 20}}>
      <Typography variant="h6">Create your first todo</Typography>
      <TextField
        id="standard-basic"
        label="Enter your todo title"
        placeholder="eg: implement header section"
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        id="standard-basic"
        label="Describe your todo"
        // placeholder="eg: implement header section"
        value={content}
        onChange={handleContentChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendData}
      >
        Send
      </Button>
    </div>
  );
}

export default CreateTodo
