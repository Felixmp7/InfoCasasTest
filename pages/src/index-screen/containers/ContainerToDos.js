// Dependencies
import React, { Component } from 'react'
// Components
import CreateTodo from "../components/create_todo/CreateTodo";
import {SearchBar} from "../components/search_bar/SearchBar";
import { ToDoItem } from "../components/todo_list/ToDoItem";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
// Methods
import { deleteTodo, updateStatusTodo } from "../../../api/jsonApi";
// CSS
import styles from './ContainerToDos.module.css'

export default class ContainerToDos extends Component {
  state = {
    todos:[],
    todosFiltered:[],
    lastTask: 0,
    searchInput: '',
    completedTodos: [],
    completedTodosFiltered : [],
    pendingTodos: [],
    pendingTodosFiltered: [],
    completedStatus: false,
    pendingStatus: false
  }

  componentDidMount(){
    this.handleInitialActions();
  }

  handleInitialActions = () => {
    // console.log(this.props)
    const { todos } = this.props;
    const idTasks = todos.map( todo => todo.id);
    const lastTask = Math.max(...idTasks);
    // // console.log(lastTask)
    this.setState({
      todos,
      lastTask
    });
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
      lastTask: lastTask +1,
      searchInput: '',
      completedStatus: false,
      pendingStatus: false
    }, () => console.log(this.state))
  }

  updateInArray = async (id) => {
    const { 
      todos,
      todosFiltered,
      searchInput,
    } = this.state;
    let status;

    try {
      if (searchInput) {
        console.log('Con Búsqueda')
        const todosFilteredUpdated = todosFiltered.map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
            status = todo.completed;
          }
          return todo;
        });

        const response = await updateStatusTodo(status,id);
        console.log(response)
        if (response == "SUCCESS") {
          // todosFilteredUpdated.sort((a, b) => b.completed - a.completed);

          this.setState({
            todosFiltered: todosFilteredUpdated,
          });
        } else {
          console.log("Error in api updateTodo method");
        }

      } 
      else {
        console.log("Sin Búsqueda");

        const todosUpdated = todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
            status = todo.completed
          }
          return todo;
        })

        const response = await updateStatusTodo(status, id);
        console.log(response);

        if (response == 'SUCCESS') {
          // todosUpdated.sort((a, b) => b.completed - a.completed);
          this.setState({
            todos: todosUpdated,
          });
          
        }
        else {
          console.log('Error in api updateTodo method');
        }
      }
      
    } catch (error) {
      console.log(error)
    }


    
  }

  deleteToDo = (id) => {
    const { 
      todos,
      todosFiltered,
      lastTask,
      completedTodos,
      completedTodosFiltered,
      pendingTodos,
      pendingTodosFiltered
    } = this.state;
    const todoForDelete = todos.findIndex( todo => todo.id === id);
    todos.splice(todoForDelete, 1);

    const todoFilteredForDelete = todosFiltered.findIndex( todo => todo.id === id);
    todosFiltered.splice(todoFilteredForDelete, 1);

    const completeTodoToDelete = completedTodos.findIndex( todo => todo.id === id);
    completedTodos.splice(completeTodoToDelete, 1);

    const completeTodoFilterToDelete = completedTodosFiltered.findIndex( todo => todo.id === id);
    todosFiltered.splice(completeTodoFilterToDelete, 1);

    const pendingTodoToDelete = pendingTodos.findIndex((todo) => todo.id === id);
    pendingTodos.splice(pendingTodoToDelete, 1);

    const pendingTodoFilteredToDelete = pendingTodosFiltered.findIndex( todo => todo.id === id);
    pendingTodosFiltered.splice(pendingTodoFilteredToDelete, 1);

    // console.log(todos);
    this.setState({
      todos,
      todosFiltered,
      completedTodos,
      completedTodosFiltered,
      pendingTodos,
      pendingTodosFiltered,
      lastTask: todos.length == 0 ? 0 : lastTask
    });
  }

  handleSearch = (e) => {
    const text = e.target.value;
    
    const {
      todos,
      completedTodos,
      pendingTodos,
      completedStatus,
      pendingStatus,
    } = this.state;

    if (completedStatus) {
      const completedTodosFiltered = completedTodos.filter((todo) => {
        return todo.title.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({ completedTodosFiltered });
    } else if (pendingStatus) {
      const pendingTodosFiltered = pendingTodos.filter((todo) => {
        return todo.title.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({ pendingTodosFiltered });
    } else {
      const todosFiltered = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({ todosFiltered });
    }
    // console.log(e.target.value)
    this.setState({searchInput: text})
  }

  editToDo = (text,id) => {
    const { todos, todosFiltered, searchInput } = this.state;

    if (searchInput) {
      console.log("Con Búsqueda");
      const todosFilteredUpdated = todosFiltered.map((todo) => {
        if (todo.id === id) {
          todo.title = text;
        }
        return todo;
      });

      todosFilteredUpdated.sort((a, b) => b.completed - a.completed);

      this.setState({
        todosFiltered: todosFilteredUpdated,
      });
    } else {
      console.log("Sin Búsqueda");

      const todosUpdated = todos.map((todo) => {
        if (todo.id === id) {
          todo.title = text;
        }
        return todo;
      });

      todosUpdated.sort((a, b) => b.completed - a.completed);
      this.setState({
        todos: todosUpdated,
      });
    }
    // console.log(text,id)
  }

  showCompletedOnly = () => {
    const { todos } = this.state;
    const completedTodos = todos.filter( todo => todo.completed);
    this.setState({ 
      completedStatus: true,
      pendingStatus: false,
      completedTodos: [...completedTodos],
      searchInput: ''
    }, () =>
      console.log(this.state)
    );
  }

  showPendingOnly = () => {
    const { todos } = this.state;
    const pendingTodos = todos.filter( todo => todo.completed == false);
    this.setState({ 
      pendingStatus: true,
      completedStatus: false,
      pendingTodos: [...pendingTodos],
      searchInput: ''
    }, () =>
      console.log(this.state)
    );
  }


  render() {
    const { 
      todos,
      searchInput,
      todosFiltered,
      completedStatus,
      pendingStatus,
      completedTodos,
      completedTodosFiltered,
      pendingTodos,
      pendingTodosFiltered,
    } = this.state;

    const completedArray = completedTodosFiltered.length > 0
      ? completedTodosFiltered
      : searchInput == ''
        ? completedTodos.length > 0
          ? completedTodos
          : 'Not Results'
        : 'Not Results'

    const pendingsArray = pendingTodosFiltered.length > 0
      ? pendingTodosFiltered
      : searchInput == ''
        ? pendingTodos.length > 0
          ? pendingTodos
          : 'Not Results'
        : 'Not Results'

    const allArray = todosFiltered.length > 0
      ? todosFiltered
      : searchInput == ''
        ? todos
        : 'Not Results'

      // console.log(completedArray);



    return (
      <div className={styles.todosContainer}>
        <div className={styles.leftColumnContainer}>
          <SearchBar value={searchInput} handleSearch={this.handleSearch} />
          <CreateTodo updateToDoInState={this.createToDo} />
        </div>
        <div className={styles.containerToDoList}>
          <div className={styles.containerHeader}>
            <Typography variant="h6">Todo List</Typography>
            <div className={styles.containerButtons}>
              <input
                className={
                  completedStatus
                    ? styles.completeButtonSelected
                    : styles.completeButton
                }
                type="button"
                value="COMPLETED"
                onClick={this.showCompletedOnly}
              />
              <input
                className={
                  pendingStatus
                    ? styles.pendingButtonSelected
                    : styles.pendingButton
                }
                type="button"
                value="PENDING"
                onClick={this.showPendingOnly}
              />
            </div>
          </div>

          <List
            className={styles.todoList}
            component="nav"
            aria-label="main mailbox folders"
          >
            {completedStatus === true ? (
              completedArray == "Not Results" ? (
                <Typography align="center">Not Todos</Typography>
              ) : (
                completedArray.map((todo) => {
                  return (
                    <ToDoItem
                      key={todo.id}
                      data={todo}
                      updateTodo={this.updateInArray}
                      deleteToDo={this.deleteToDo}
                      editToDo={this.editToDo}
                    />
                  );
                })
              )
            ) : pendingStatus === true ? (
              pendingsArray == "Not Results" ? (
                <Typography align="center">Not Todos</Typography>
              ) : (
                pendingsArray.map((todo) => {
                  return (
                    <ToDoItem
                      key={todo.id}
                      data={todo}
                      updateTodo={this.updateInArray}
                      deleteToDo={this.deleteToDo}
                      editToDo={this.editToDo}
                    />
                  );
                })
              )
            ) : allArray == "Not Results" ? (
              <Typography align="center">Not Todos</Typography>
            ) : (
              allArray.map((todo) => (
                <ToDoItem
                  key={todo.id}
                  data={todo}
                  updateTodo={this.updateInArray}
                  deleteToDo={this.deleteToDo}
                  editToDo={this.editToDo}
                />
              ))
            )}
          </List>
        </div>
      </div>
    );
  }
}

{/* <Typography align="center">Not Todos</Typography> */}