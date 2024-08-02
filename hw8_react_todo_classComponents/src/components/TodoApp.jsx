import React from "react";
import {
  apiCreateTodo,
  apiDeleteTodo,
  apiEditTodo,
  apiFetchTodos,
} from "../api";
import CreateTodoForm from "./CreateTodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

export default class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  createTodo = (inputText) => {
    const newTodo = { id: uuidv4(), content: inputText };
    apiCreateTodo(newTodo).then(() => {
      this.setState({ todos: [...this.state.todos, newTodo] });
    });
  };

  editTodo = (id, newContent) => {
    const updatedTodo = { id: id, content: newContent };
    apiEditTodo(id, updatedTodo).then(() => {
      const idx = this.state.todos.findIndex((val) => val.id === id);
      if (idx === -1) {
        console.error("updated todo not in list");
      }
      this.state.todos[idx] = updatedTodo;
      this.setState({ todos: [...this.state.todos] });
    });
  };

  deleteTodo = (id) => {
    apiDeleteTodo(id).then(() => {
      let newTodos = this.state.todos.filter((val) => val.id !== id);
      this.setState({ todos: newTodos });
    });
  };

  render() {
    return (
      <>
        <h1>Todos</h1>
        <CreateTodoForm createTodo={this.createTodo} />
        <ul className="todo__list">
          {this.state.todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todoObj={todo}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
              />
            );
          })}
        </ul>
      </>
    );
  }

  componentDidMount() {
    apiFetchTodos()
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ todos: data });
      });
  }
}
