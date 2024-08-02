import React from "react";

// takes 3 props:
// todoObj, deleteTodo, editTodo
export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      editText: props.todoObj.content,
    };
  }

  handleInputText = (e) => {
    this.setState({ editText: e.target.value });
  };

  handleToggleEdit = (e) => {
    this.setState({ editText: this.props.todoObj.content });
    this.setState({ showEdit: !this.state.showEdit });
  };

  handleEditSave = (e) => {
    e.preventDefault();
    if (this.props.todoObj.content !== this.state.editText) {
      this.props.editTodo(this.props.todoObj.id, this.state.editText); // commit changes if actually diff
    }
    this.setState({ showEdit: !this.state.showEdit });
  };

  render() {
    return (
      <li className="todo__item">
        {this.state.showEdit ? (
          <form onSubmit={this.handleEditSave}>
            <input
              type="text"
              value={this.state.editText}
              onChange={this.handleInputText}
            />
            {this.props.todoObj.content !== this.state.editText && (
              <button className="todo__saveBtn" type="submit">
                Save Changes
              </button>
            )}
          </form>
        ) : (
          <p className="todo__content">{`> ${this.props.todoObj.content}`}</p>
        )}
        <button className="todo__editBtn" onClick={this.handleToggleEdit}>
          {this.state.showEdit ? "Cancel" : "Edit"}
        </button>
        <button
          className="todo__deleteBtn"
          onClick={() => this.props.deleteTodo(this.props.todoObj.id)}
        >
          Delete
        </button>
      </li>
    );
  }
}
