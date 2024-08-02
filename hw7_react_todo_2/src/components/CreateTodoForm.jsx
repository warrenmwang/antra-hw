import { useState } from "react";

export default function CreateTodoForm({ createTodo }) {
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
