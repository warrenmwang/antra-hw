import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import useMySelector from "../redux/useMySelector";
import useMyDispatch from "../redux/useMyDispatch";
import { v4 as uuidv4 } from "uuid";

export default function TodoApp() {
  const [inputText, setInputText] = useState("");

  // Redux
  // const todos = useSelector((state) => state.todos);
  // const dispatch = useDispatch();

  // using custom "Provider" and "useSelector"
  const todos = useMySelector((state) => state.todos, {
    equalityFn: (a, b) => a == b,
  });
  const dispatch = useMyDispatch();

  const handleTextInput = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const todoDeleteHandler = (id) => {
    dispatch({
      type: "TODOS_DELETE",
      payload: id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { id: uuidv4(), content: inputText };
    dispatch({
      type: "TODOS_ADD",
      payload: todo,
    });
  };

  return (
    <div>
      <form className="horizontal" onSubmit={handleSubmit}>
        <div className="vertical">
          <label htmlFor="addTodo">Add a Todo</label>
          <input id="addTodo" type="text" onChange={handleTextInput} />
        </div>
        <button>Add</button>
      </form>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} deleteHandler={todoDeleteHandler} />
      ))}
    </div>
  );
}
