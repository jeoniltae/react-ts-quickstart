import React, { memo } from "react";
import { TodoListItemType } from "./App";
import TodoListItem from "./TodoListItem";

type Props = {
  todoList: Array<TodoListItemType>;
  deleteTodo: (id: number) => void;
};

const TodoList = (props: Props) => {
  console.log("## TodoList");
  return (
    <ul>
      {props.todoList.map((item) => {
        return (
          <TodoListItem
            key={item.id}
            todoListItem={item}
            deleteTodo={props.deleteTodo}
          />
        );
      })}
    </ul>
  );
};

// React.memo 고차 함수 적용
export default memo(TodoList);
