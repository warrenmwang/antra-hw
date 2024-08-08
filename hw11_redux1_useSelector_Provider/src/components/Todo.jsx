import React from "react";

export default function Todo({ todo, deleteHandler }) {
  return (
    <div>
      <div>{todo.content}</div>
      <button
        onClick={() => {
          deleteHandler(todo.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
