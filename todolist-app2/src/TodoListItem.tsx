import React, { memo } from "react";
import { TodoListItemType } from "./App";
import TodoListItemBody from "./TodoListItemBody";
import TodoListItemDeleteButton from "./TodoListItemDeleteButton";

type Props = {
  todoListItem: TodoListItemType;
  deleteTodo: (id: number) => void;
};

/**
 * 하나의 컴포넌트 영역에서 자주 바뀌는 속성을 전달받을 영역과 그렇지 않은 영역으로 서로 다른 컴포넌트로 분할하기
 */
const TodoListItem = (props: Props) => {
  console.log("## TodoListItem");
  return (
    <li>
      <TodoListItemBody todoListItem={props.todoListItem} />
      &nbsp;&nbsp;&nbsp;
      <TodoListItemDeleteButton
        id={props.todoListItem.id}
        deleteTodo={props.deleteTodo}
      />
    </li>
  );
};

export default memo(TodoListItem);
