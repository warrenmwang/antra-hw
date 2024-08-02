import { useState } from "react";

export default function Todo({ todoObj, deleteTodo, editTodo }) {
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
    if (todoObj.content !== editText) {
      editTodo(todoObj.id, editText); // commit changes if actually diff
    }
    setShowEdit(!showEdit);
  };

  return (
    <li className="todo__item">
      {showEdit ? (
        <form onSubmit={handleEditSave}>
          <input type="text" value={editText} onChange={handleInputText} />
          {todoObj.content !== editText && (
            <button className="todo__saveBtn" type="submit">
              Save Changes
            </button>
          )}
        </form>
      ) : (
        <p className="todo__content">{`> ${todoObj.content}`}</p>
      )}
      <button className="todo__editBtn" onClick={handleToggleEdit}>
        {showEdit ? "Cancel" : "Edit"}
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
