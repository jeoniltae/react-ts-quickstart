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
// 두번 째 인자값을 추가하여 렌더링 최적화
// 하지만 문제점이 생김: 할 일 아이템을 여러개 추가 후 삭제 버튼 클릭하면 모든 아이템이 삭제 됨.
// 이유는 -> 각각의 TodoListItem 컴포넌트에 전달된 deleteTodo함수는 useCallback에 의해서 의존하는 todoList 객체를 참조하고 있는데,
// 이 deleteTodo함수가 memo 고차 함수에 의해 메모징되고 있기 때문.
// 따라서 memo의 두번 째 인자값을 추가하는 것은 주의가 필요함.
// useCallback만으로 충분함.
export default memo(TodoListItem, (prevProps, nextProps) => {
  return prevProps.todoListItem === nextProps.todoListItem;
});
