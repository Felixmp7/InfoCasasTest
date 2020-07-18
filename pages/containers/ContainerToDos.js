import React, { Component } from 'react'
import CreateTodo from "../components/create_todo/CreateTodo";
import {SearchBar} from "../components/search_bar/SearchBar";
import styles from './ContainerToDos.module.css'
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { ToDoItem } from "../components/todo_list/ToDoItem";

export default class ContainerToDos extends Component {
  state = {
    todos:[],
    lastTask: 0,
    searchInput: ''
  }

  componentDidMount(){
    // console.log(this.props)
    const { todos } = this.props;
    const idTasks = todos.map( todo => todo.id);
    const lastTask = Math.max(...idTasks);
    // console.log(lastTask)
    this.setState({todos, lastTask})
  }

  createToDo = (todoTitle) => {
    const {todos, lastTask} = this.state;
    console.log(lastTask)
    const newTodoData = {
      completed: false,
      title: todoTitle,
      userId: 1,
      id: lastTask +1
    };

    todos.push(newTodoData);
    this.setState({
      todos, 
      lastTask: lastTask +1
    }, () => console.log(this.state))
  }

  updateTodo = (id) => {
    const { todos } = this.state;
    const todosUpdated = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })
    this.setState({todos: todosUpdated});
  }

  deleteToDo = (id) => {
    const { todos } = this.state;
    const todoForDelete = todos.findIndex( todo => todo.id === id);
    todos.splice(todoForDelete, 1);
    // console.log(todos);
    this.setState({todos});
  }

  handleSearch = (e) => {
    this.setState({
      searchInput: e.target.value
    })
  }

  render() {
    const { todos, searchInput } = this.state;

    return (
      <div className={styles.todosContainer}>
        <CreateTodo updateToDoInState={this.createToDo} />
        <div className={styles.containerToDoList}>
          <Typography variant="h6">Todo List</Typography>
          <SearchBar value={searchInput} handleSearch={this.handleSearch}/>
          <List
            className={styles.todoList}
            component="nav"
            aria-label="main mailbox folders"
          >
            {todos.length > 0 &&
              todos.map((todo) => (
                <ToDoItem
                  key={todo.id}
                  data={todo}
                  updateTodo={this.updateTodo}
                  deleteToDo={this.deleteToDo}
                />
              ))}
          </List>
        </div>
      </div>
    );
  }
}
