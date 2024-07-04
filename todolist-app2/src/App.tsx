import { useState } from "react";
import TodoList from "./TodoList";

export type TodoListItemType = {
  id: number;
  todo: string;
};

function App() {
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([]);
  const [todo, setTodo] = useState<string>("");

  const addTodo = (todo: string) => {
    let newTodoList = [
      ...todoList,
      {
        id: new Date().getTime(),
        todo: todo,
      },
    ];

    setTodoList(newTodoList);
    setTodo("");
  };

  // deleteTodo 함수를 추가하기 전에는 React.memo를 적용해서 최적화(불필요한 랜더링X)가 되었는데,
  // 함수 추가 후 다시 원복됨(매번 랜더링 함).
  // 이유:
  // 1. 할 일 아이템을 입력 필드에 타이핑
  // 2. App 컴포넌트의 todo 상태가 변경됨
  // 3. App 컴포넌트가 렌더링 되면서 deleteTodo 함수가 새롭게 생성
  // 4. 새롭게 생성된 deleteTodo 함수가 TodoList, TodoItem 컴포넌트로 속성을 통해서 전달됨
  // 5. TodoList, TodoItem 컴포넌트의 기존 deleteTodo 함수와 얕은 비교 결과가 fasle이므로 매번 렌더링 됨
  // 해결 방법:
  // * React.memo 고차 함수와 useCallback 훅을 함께 적용하기
  // * React.memo 고차 함수의 두 번째 인자를 사용
  const deleteTodo = (id: number) => {
    // 현재 todoList 배열을 복사하여 새로운 배열 생성
    const newTodoList = [...todoList];
    // 삭제할 아이템의 인덱스를 찾기
    const index = todoList.findIndex((item) => item.id === id);
    // 해당 인덱스의 아이템을 배열에서 제거
    newTodoList.splice(index, 1);
    // 새로운 todoList 배열로 상태 업데이트
    setTodoList(newTodoList);
  };

  return (
    <div className="boxStyle">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={() => addTodo(todo)}>Add Todo</button>
      <br />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} />
      <div>todo 개수: {todoList.length}</div>
    </div>
  );
}

export default App;
