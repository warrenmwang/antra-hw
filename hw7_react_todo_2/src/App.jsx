import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const checkFetch = (resp) => {
  if (!resp.ok) {
    throw new Error("response not ok");
  }
  return resp;
};

function Todo({ todoObj, deleteTodo, editTodo }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState(todoObj.content);

  const handleInputText = (e) => {
    setEditText(e.target.value);
  };

  const handleToggleEdit = (e) => {
    setEditText(todoObj.content); // reset edit text
    setShowEdit(!showEdit);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    editTodo(todoObj.id, editText);
    setShowEdit(!showEdit);
  };

  return (
    <li className="todo__item">
      {showEdit ? (
        <form onSubmit={handleEditSave}>
          <input type="text" value={editText} onChange={handleInputText} />
          <button className="todo__saveBtn" type="submit">
            Save Changes
          </button>
        </form>
      ) : (
        <p className="todo__content">{`> ${todoObj.content}`}</p>
      )}
      <button className="todo__editBtn" onClick={handleToggleEdit}>
        Edit
      </button>
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
    if (inputText === "") {
      return;
    }
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
  const dbURL = "http://localhost:3001/todos";
  const [todos, setTodos] = useState([]);

  const createTodo = (inputText) => {
    const newTodo = { id: uuidv4(), content: inputText };

    fetch(dbURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then(checkFetch)
      .then((resp) => resp.json())
      .then((_) => {
        setTodos((prev) => [...prev, newTodo]);
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id) => {
    fetch(`${dbURL}/${id}`, {
      method: "DELETE",
    })
      .then(checkFetch)
      .then(() => {
        let newTodos = todos.filter((val) => val.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => console.error(err));
  };

  const editTodo = (id, newContent) => {
    const updatedTodo = { id: id, content: newContent };
    fetch(`${dbURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(checkFetch)
      .then(() => {
        const idx = todos.findIndex((val) => val.id === id);
        if (idx === -1) {
          console.error("updated todo not in list");
        }
        todos[idx] = updatedTodo;
        setTodos([...todos]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch(dbURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkFetch)
      .then((resp) => resp.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <CreateTodoForm createTodo={createTodo} />
      <ul>
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

export default App;
