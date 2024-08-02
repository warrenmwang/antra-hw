import React from "react";

// takes 1 prop: createTodo
export default class CreateTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
    };
  }

  handleInputText = (e) => {
    this.setState({ inputText: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText === "") {
      return;
    }
    this.props.createTodo(this.state.inputText);
  };

  render() {
    return (
      <form className="todo__createForm" onSubmit={this.handleSubmit}>
        <input value={this.state.inputText} onChange={this.handleInputText} />
        <button className="todo__addBtn" type="submit">
          Add
        </button>
      </form>
    );
  }
}
