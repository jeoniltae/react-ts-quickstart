import React, { memo } from "react";
import { TodoListItemType } from "./App";

type Props = {
  todoListItem: TodoListItemType;
};

const TodoListItem = (props: Props) => {
  console.log("## TodoListItem");
  return <li>{props.todoListItem.todo}</li>;
};

// React.memo 고차 함수 적용
export default memo(TodoListItem);
