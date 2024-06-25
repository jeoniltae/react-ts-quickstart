import React, { useCallback, useMemo, useState } from "react";

/**
 * 메모제이션이란?
 * 기존에 연산된 결과값을 메모리에 캐싱하고, 동일한 입력과 환경에서 재사용하는 기법
 * 중복 처리를 피할 수 있어서 애플리케이션의 성능을 최적화할 때 종종 사용함
 * 메모제이션 기능을 제공하는 리액트 훅은 useMemo와 useCallback으로 두 가지가 있음
 *
 * useMemo
 * 함수가 호출되고 연산된 리턴값을 캐싱하여 재사용함
 * 캐싱되는 것은 함수를 호출한 후의 리턴값
 *
 * useCallback
 * 컴포넌트 내부의 함수를 캐싱하고, 렌더링할 때마다 함수가 생성되지 않게 재사용 함
 * 캐싱되는 것은 컴포넌트 내부의 함수임
 */

type TodoListItemType = {
  id: number;
  todo: string;
};

// 할 일 목록의 개수를 출력하고 반환하는 함수
const getTodoListCount = (todoList: Array<TodoListItemType>) => {
  console.log(todoList.length);
  return todoList.length;
};

const App07 = () => {
  // useState를 사용하여 할 일 목록 상태와 새로운 할 일의 내용을 관리
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([]);
  const [todo, setTodo] = useState("");

  // 새로운 할 일을 추가하는 함수
  const addTodo = useCallback(
    (todo: string) => {
      let newTodoList = [
        ...todoList,
        {
          id: new Date().getTime(), // 현재 시간을 ID로 사용
          todo: todo,
        },
      ];
      setTodoList(newTodoList); // 새로운 할 일 목록으로 상태 갱신
      setTodo(""); // 입력 필드 초기화
    },
    [todoList]
  );

  // 할 일을 삭제하는 함수
  const deleteTodo = useCallback(
    (id: number) => {
      let index = todoList.findIndex((item) => item.id === id); // 삭제할 할 일의 인덱스 찾기
      let newTodoList = [...todoList]; // 현재 할 일 목록 복사
      newTodoList.splice(index, 1); // 해당 인덱스의 아이템 삭제
      setTodoList(newTodoList); // 새로운 할 일 목록으로 상태 갱신
    },
    [todoList]
  );

  // useMemo를 사용하여 todoList가 변경될 때만 getTodoListCount 함수를 호출
  const memoizedCount = useMemo<number>(
    () => getTodoListCount(todoList),
    [todoList]
  );

  return (
    <div className="boxStyle">
      {/* 할 일 입력 필드 */}
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={() => addTodo(todo)}>Add Todo</button>{" "}
      {/* 할 일을 추가하는 버튼 */}
      <br />
      <ul>
        {todoList.map((item) => {
          return (
            <li key={item.id}>
              {item.todo}{" "}
              <button onClick={() => deleteTodo(item.id)}>삭제</button>{" "}
              {/* 할 일을 삭제하는 버튼 */}
            </li>
          );
        })}
      </ul>
      {/* 할 일 목록의 개수를 출력 */}
      <div>todo 개수: {memoizedCount}</div>
    </div>
  );
};

export default App07;
