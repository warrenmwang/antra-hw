import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function Todo({ todoObj, deleteTodo }) {
  return (
    <li className="todo__item">
      <p className="todo__content">{`> ${todoObj.content}`}</p>
      <button
        className="todo__deleteBtn"
        onClick={() => deleteTodo(todoObj.id)}
      >
        Delete
      </button>
    </li>
  );
}

function CreateTodoForm({ createTodo }) {
  const [inputText, setInputText] = useState("");

  const handleInputText = (e) => {
    let inputText = e.target.value;
    setInputText(inputText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(inputText);
  };

  return (
    <form className="todo__createForm" onSubmit={handleSubmit}>
      <input value={inputText} onChange={handleInputText} />
      <button className="todo__addBtn" type="submit">
        Add
      </button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const createTodo = (inputText) => {
    setTodos((prev) => [...prev, { id: uuidv4(), content: inputText }]);
  };

  const deleteTodo = (id) => {
    let newTodos = todos.filter((val) => val.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <h1>Todos</h1>
      <CreateTodoForm createTodo={createTodo} />
      <ul>
        {todos.map((todo) => {
          return <Todo key={todo.id} todoObj={todo} deleteTodo={deleteTodo} />;
        })}
      </ul>
    </>
  );
}

export default App;
