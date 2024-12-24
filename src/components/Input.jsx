import React, { Component } from "react";

export default class Input extends Component {
  inputRef = React.createRef();
  componentDidUpdate() {
    this.inputRef.current.value = "";
  }
  state = {
    todos: [],
    newTodo: "",
    editId: null,
    editText: "",
  };

  handleChangeSubmit = () => {
    this.setState((prev) => {
      return {
        todos: [
          ...prev.todos,
          {
            id:
              prev.todos.length > 0
                ? prev.todos[prev.todos.length - 1].id + 1
                : 1,
            text: this.inputRef.current.value,
            date: new Date().toLocaleDateString(),
            isCompleted: false,
          },
        ],
      };
    });
  };

  checkedInput = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    }));
  };

  deleteTodo = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.filter((todo) => todo.id !== id),
    }));
  };

  uptadeTodo = () => {
    const { editId, editText, todos } = this.state;
    this.setState({
      todos: todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      ),
      editId: null,
      editText: "",
    });
  };

  handleEditchange = (id, value) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, text: value } : todo
      ),
    }));
  };

  handleUpdate = (id) => {
    const updatedText = prompt(
      "Yangi matnni kiriting:",
      this.state.todos.find((todo) => todo.id === id).text
    );
    if (updatedText) {
      this.setState((prev) => ({
        todos: prev.todos.map((todo) =>
          todo.id === id ? { ...todo, text: updatedText.trim() } : todo
        ),
      }));
    }
  };
  render() {
    const { inputRef, handleChangeSubmit, state, deleteTodo } = this;
    console.log(this.state.todos);
    return (
      <div className="container">
        <div className="row">
          <div className="offset-2 col-md-8 border border-4">
            <div className="d-flex justify-content-between m-3">
              <input type="text" ref={inputRef} className="w-100" />
              <button
                onClick={handleChangeSubmit}
                className="btn btn-outline-success"
              >
                onClick
              </button>
            </div>
            <div className="border border-2">
              {state.todos.map((todo, index) => {
                return (
                  <div
                    className="d-flex justify-content-between py-2"
                    key={todo.id}
                  >
                    <div key={index}>
                      {todo.text} <em>{todo.date}</em>
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={this.checkedInput}
                      />
                    </div>

                    {todo.editId === todo.id ? (
                      <>
                        <input
                          type="text"
                          value={todo.editText}
                          onChange={this.handleEditchange}
                        />
                        <button
                          className="btn btn-success"
                          onClick={this.uptadeTodo}
                        >
                          save
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              this.handleUpdate(todo.id, todo.text)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-info"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
