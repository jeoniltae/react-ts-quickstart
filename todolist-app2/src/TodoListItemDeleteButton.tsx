import React, { memo } from "react";

type Props = {
  id: number;
  deleteTodo: (id: number) => void;
};

const TodoListItemDeleteButton = (props: Props) => {
  console.log("## TodoListItemDeleteButton");
  return <button onClick={() => props.deleteTodo(props.id)}>삭제</button>;
};

export default memo(TodoListItemDeleteButton);
