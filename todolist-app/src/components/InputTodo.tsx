import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type InputTodoProps = {
  addTodo: (todo: string) => void;
};

const InputTodo = (props: InputTodoProps) => {
  const { addTodo } = props;
  const [todo, setTodo] = useState<string>("");

  const addHandler = () => {
    addTodo(todo);
    setTodo("");
  };

  const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addHandler();
    }
  };

  const changeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <div className="row">
      <div className="col">
        <div className="input-group">
          <input
            type="text"
            id="msg"
            className="form-control"
            name="msg"
            placeholder="할 일을 여기에다가 입력"
            value={todo}
            onChange={changeTodo}
            onKeyUp={enterInput}
          />
          <button
            type="button"
            className="btn btn-primary input-group-addon"
            onClick={addHandler}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputTodo;
