import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createNewTodo } from "../../../../api/jsonApi";
import styles from './css/CreateTodo.module.css'

const CreateTodo = ({updateToDoInState}) => {
  const [title, setTitle] = useState('');
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // console.log(event.target.value);
  }

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') sendData();
  }

  const sendData = async () => {
    setTitle('');
    const response = await createNewTodo(title);
    if (response == 'SUCCESS') {
      updateToDoInState(title);
      console.log(title)
      
    } else {
      setTitle(title);
      console.log('Error in create new todo api method')
    }
  }

  return (
    <div className={styles.createToDoContainer}>
      <Typography variant="h6">Create Todo</Typography>
      <div className={styles.inputContainer}>
        <div className={styles.inputBox}>
          <TextField
            fullWidth
            size="small"
            id="standard-basic1"
            label="Enter your todo title"
            placeholder="eg: implement header section"
            value={title}
            onKeyUp={handleKeyPressed}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles.button}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            onClick={sendData}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo
