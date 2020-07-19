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
    todosFiltered:[],
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
    const { todos, todosFiltered, searchInput } = this.state;

    if (searchInput) {
      console.log('Con Búsqueda')
      const todosFilteredUpdated = todosFiltered.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      this.setState({
        todosFiltered: todosFilteredUpdated,
      });
    } 
    else {
      console.log("Sin Búsqueda");

      const todosUpdated = todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
      this.setState({
        todos: todosUpdated,
      });
    }
  }

  deleteToDo = (id) => {
    const { todos, todosFiltered } = this.state;
    const todoForDelete = todos.findIndex( todo => todo.id === id);
    todos.splice(todoForDelete, 1);

    const todoFilteredForDelete = todosFiltered.findIndex( todo => todo.id === id);
    todosFiltered.splice(todoFilteredForDelete, 1);

    // console.log(todos);
    this.setState({todos, todosFiltered});
  }

  handleSearch = (e) => {
    const text = e.target.value
    // console.log(e.target.value)
    this.setState({
      searchInput: text
    }, () => {
      const { todos } = this.state;
      const todosFiltered = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({ todosFiltered });
    })
  }

  render() {
    const { todos, searchInput, todosFiltered } = this.state;

    return (
      <div className={styles.todosContainer}>
        <div className={styles.leftColumnContainer}>
          <SearchBar value={searchInput} handleSearch={this.handleSearch} />
          <CreateTodo updateToDoInState={this.createToDo} />
        </div>
        <div className={styles.containerToDoList}>
          <Typography variant="h6">Todo List</Typography>

          <List
            className={styles.todoList}
            component="nav"
            aria-label="main mailbox folders"
          >
            {todosFiltered.length > 0
              ? todosFiltered.map((todo) => (
                  <ToDoItem
                    key={todo.id}
                    data={todo}
                    updateTodo={this.updateTodo}
                    deleteToDo={this.deleteToDo}
                  />
                ))
              : searchInput == '' 
                ? todos.map((todo) => (
                    <ToDoItem
                      key={todo.id}
                      data={todo}
                      updateTodo={this.updateTodo}
                      deleteToDo={this.deleteToDo}
                    />
                  ))
                :
                  <Typography align='center'>Not Todos</Typography>
            }
          </List>
        </div>
      </div>
    );
  }
}
