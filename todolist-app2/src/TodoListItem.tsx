import React, { memo } from "react";
import { TodoListItemType } from "./App";

type Props = {
  todoListItem: TodoListItemType;
  deleteTodo: (id: number) => void;
};

const TodoListItem = (props: Props) => {
  console.log("## TodoListItem");
  return (
    <li>
      <span>{props.todoListItem.todo}</span>&nbsp;&nbsp;&nbsp;
      <button onClick={() => props.deleteTodo(props.todoListItem.id)}>
        삭제
      </button>
    </li>
  );
};

// React.memo 고차 함수 적용
export default memo(TodoListItem);
