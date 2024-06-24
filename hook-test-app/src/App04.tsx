import React, { useReducer, useState } from "react";
import { TodoActionCreator, TodoItemType, TodoReducer } from "./TodoReducer";

/**
 * useReducer를 사용시 두 가지 장점
 * 1. 상태 관리 기능을 컴포넌트로 분리할 수 있음. 유사한 상태 관리 기능을 사용하는 여러 컴포넌트가 상태 변경과 관리 기능을 공유할 수 있음.
 * 2. 불변성을 가지는 상태 변경을 강제하게 되므로 상태 변경을 추적하기가 용이함.
 * useReducer와 관련하여 리듀서를 이용하는 애플리케이션 전역 수준의 상태 관리 라이브러리가 바로 리덕스임.
 * 리덕스에서도 useReducer 훅과 동일한 리듀서를 사용함.
 */

// 현재 시간을 기준으로 ID를 생성
let idNow = new Date().getTime();

// 초기 할 일 목록 정의
const initialTodoList: Array<TodoItemType> = [
  {
    id: idNow,
    todo: "운동",
  },
  {
    id: idNow + 1,
    todo: "독서",
  },
  {
    id: idNow + 2,
    todo: "조깅",
  },
];

const App04 = () => {
  // useReducer를 사용하여 todoList 상태와 상태를 갱신하는 dispatch 함수 생성
  const [todoList, dispatchTodoList] = useReducer(TodoReducer, initialTodoList);

  // useState를 사용하여 새로운 할 일의 내용을 관리
  const [todo, setTodo] = useState("");

  // 새로운 할 일을 추가하는 함수
  const addTodo = () => {
    dispatchTodoList(TodoActionCreator.addTodo(todo)); // 액션을 디스패치하여 상태를 갱신
    setTodo(""); // 입력 필드 초기화
  };

  // 할 일을 삭제하는 함수
  const deleteTodo = (id: number) => {
    dispatchTodoList(TodoActionCreator.deleteTodo(id)); // 액션을 디스패치하여 상태를 갱신
  };

  // 현재 todoList 상태를 콘솔에 출력 (디버깅 용도)
  console.log(todoList);

  return (
    <div style={{ padding: "20px" }}>
      {/* 할 일 입력 필드 */}
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>할일 추가</button> {/* 할 일을 추가하는 버튼 */}
      {/* 할 일 목록 */}
      <ul>
        {todoList.map((item) => {
          return (
            <li key={item.id}>
              {item.todo} &nbsp;&nbsp;
              <button onClick={() => deleteTodo(item.id)}>삭제</button>{" "}
              {/* 할 일을 삭제하는 버튼 */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App04;
