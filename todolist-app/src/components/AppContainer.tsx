// 상태를 정의하고 상태를 변경하는 메서드를 작성한다.
// 상태 변경시 immer를 이용해서 불변성을 가지도록 한다.
// APP컴포넌트를 향해 상태와 메서드를 속성으로 전달한다.
// 상태를 정의하기 전에 TodoListItem 한 건의 데이터 타입을 정의하고, 이 타입을 다른 컵포넌트에서도 사용할 수 있도록 export 한다.

import React, { useState } from "react";
import { produce } from "immer";
import App from "./App";

export type TodoListItemType = {
  no: number;
  todo: string;
  done: boolean;
};

const AppContainer = () => {
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([
    {
      no: 1,
      todo: "React공부1",
      done: false,
    },
    {
      no: 2,
      todo: "React공부2",
      done: false,
    },
    {
      no: 3,
      todo: "React공부3",
      done: true,
    },
    {
      no: 4,
      todo: "React공부4",
      done: false,
    },
  ]);

  const addTodo = (todo: string) => {
    // produce 함수는 immer 라이브러리의 함수로, 원본 상태(todoList)를 불변성을 유지하면서 안전하게 업데이트할 수 있도록 도와줍니다. 첫 번째 인자로 todoList를 받고, 두 번째 인자로 상태를 변경할 수 있는 draft 객체를 받는 함수가 옵니다.
    // draft는 todoList의 복사본입니다. draft에 직접 변경을 가할 수 있습니다. 여기서는 새로운 할 일 객체를 draft 배열에 추가합니다
    // produce 함수는 변경된 draft 객체를 기반으로 새로운 상태(newTodoList)를 반환합니다.
    // setTodoList 함수는 todoList 상태를 업데이트하는 함수로, newTodoList를 새로운 상태로 설정합니다.
    let newTodoList = produce(todoList, (draft) => {
      draft.push({
        no: new Date().getTime(),
        todo: todo,
        done: false,
      });
    });
    setTodoList(newTodoList);
  };

  const deleteTodo = (no: number) => {
    // findIndex 메서드를 사용하여 todoList 배열에서 no와 일치하는 할 일의 인덱스를 찾습니다.
    // todo.no === no 조건을 만족하는 첫 번째 요소의 인덱스를 반환합니다. 만약 일치하는 요소가 없으면 -1을 반환합니다.
    // draft.splice(index, 1); 부분에서 splice 메서드를 사용하여 index 위치에서 한 개의 요소를 삭제합니다.
    let index = todoList.findIndex((todo) => todo.no === no);
    console.log(index);
    let newTodoList = produce(todoList, (draft) => {
      draft.splice(index, 1);
    });
    setTodoList(newTodoList);
  };

  const toggleDone = (no: number) => {
    // draft[index].done = !draft[index].done; 부분에서 draft 배열의 index 위치에 있는 할 일의 done 상태를 현재 값의 반대로 변경합니다. 즉, true는 false로, false는 true로 토글됩니다.
    let index = todoList.findIndex((todo) => todo.no === no);
    let newTodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done;
    });
    setTodoList(newTodoList);
  };

  return (
    <App
      todoList={todoList}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      toggleDone={toggleDone}
    />
  );
};

export default AppContainer;
