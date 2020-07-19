import React from 'react'
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent';
import InputBase from "@material-ui/core/InputBase";
import styles from './css/ToDoItem.module.css'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@mdi/react";
import {
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxMarkedCircle,
} from "@mdi/js";

export const ToDoItem = ({data, updateTodo, deleteToDo, editToDo}) => {
  return (
    <div className={styles.cardContainer}>
      <CardContent>
        <div
          className={styles.containerButton}
          onClick={() => updateTodo(data.id)}
        >
          <Icon
            path={
              data.completed
                ? mdiCheckboxMarkedCircle
                : mdiCheckboxBlankCircleOutline
            }
            size={1}
            color="#414288"
          />
        </div>
        <Typography className={styles.task} color="textSecondary" gutterBottom>
          {`task n° ${data.id}`}
        </Typography>
        <div className={styles.title}>
          <InputBase
            id={String(data.id)}
            value={data.title}
            onChange={(event) => editToDo(event.target.value, data.id)}
          />
        </div>
        <Typography className={styles.completed} color="textSecondary">
          {`status: ${data.completed ? "completed" : "pending"}`}
        </Typography>
      </CardContent>
      <IconButton onClick={() => deleteToDo(data.id)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
