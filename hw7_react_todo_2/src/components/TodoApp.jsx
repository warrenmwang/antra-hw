import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  apiCreatePost,
  apiDeletePost,
  apiEditPost,
  apiFetchPosts,
} from "../api";
import CreateTodoForm from "./CreateTodoForm";
import Todo from "./Todo";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  const createTodo = (inputText) => {
    const newTodo = { id: uuidv4(), content: inputText };
    apiCreatePost(newTodo)
      .then((resp) => resp.json())
      .then(() => {
        setTodos((prev) => [...prev, newTodo]);
      });
  };

  const deleteTodo = (id) => {
    apiDeletePost(id).then(() => {
      let newTodos = todos.filter((val) => val.id !== id);
      setTodos(newTodos);
    });
  };

  const editTodo = (id, newContent) => {
    const updatedTodo = { id: id, content: newContent };
    apiEditPost(id, updatedTodo).then(() => {
      const idx = todos.findIndex((val) => val.id === id);
      if (idx === -1) {
        console.error("updated todo not in list");
      }
      todos[idx] = updatedTodo;
      setTodos([...todos]);
    });
  };

  useEffect(() => {
    apiFetchPosts()
      .then((resp) => resp.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <CreateTodoForm createTodo={createTodo} />
      <ul className="todo__list">
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todoObj={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          );
        })}
      </ul>
    </>
  );
}
