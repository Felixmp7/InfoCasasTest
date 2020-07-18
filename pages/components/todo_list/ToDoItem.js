import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent';
import styles from './css/ToDoItem.module.css'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@mdi/react";
import {
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxMarkedCircle,
} from "@mdi/js";

export const ToDoItem = ({data, updateTodo, deleteToDo}) => {
  return (
    <Card className={styles.cardContainer} variant="outlined">
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
            color="#34fcb9"
          />
        </div>
        <Typography className={styles.task} color="textSecondary" gutterBottom>
          {`task n° ${data.id}`}
        </Typography>
        <Typography
          className={styles.title}
          variant="h5"
          component="h2"
          gutterBottom
        >
          {data.title}
        </Typography>
        <Typography className={styles.completed} color="textSecondary">
          {`status: ${data.completed ? "completed" : "pending"}`}
        </Typography>
      </CardContent>
      <IconButton onClick={() => deleteToDo(data.id)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}
