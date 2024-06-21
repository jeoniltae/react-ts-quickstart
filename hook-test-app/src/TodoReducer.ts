import { produce } from "immer";

/**
 * TodoActionType에서 type 필드는 string이 아니라 addTodo, deleteTodo와 같이 상수로써 사용해야 함.
 * type이 addTodo일 때는 payload가 { todo: string } 타입이고, type이 deleteTodo일 때는 payload가 { id: number } 형식이라야 하기 때문.
 * 따라서 TODO_ACTION을 작성할 때 as const를 추가하여 상수로 정의.
 * TodoActionType 정의: TodoActionCreator의 각 메서드가 리턴하는 값들을 이용해야 하므로 ReturnType이라는 유틸리티 타입을 이용해 리턴값의 타입을 추출하여 사용.
 * TodoReducer: 첫 번째 인자(state)가 두 번째 인자(action)를 이용해 상태를 연산하여 새로운 상태를 리턴해야 함.
 * 이때 action의 type에 따라 서로 다른 작업을 수행해야 하므로 if문이나 switch문으로 분기하여 처리함.
 * 그리고 기존 상태는 불변성을 가져야 하므로 immer 라이브러리를 이용해 새로운 상태를 생성하여 리턴함.
 */

// Todo 아이템의 타입 정의
export type TodoItemType = {
  id: number; // 고유 식별자
  todo: string; // 할 일 내용
};

// TODO_ACTION 객체는 액션 타입을 정의
export const TODO_ACTION = {
  ADD: "addTodo" as const, // 할 일 추가 액션 타입
  DELETE: "deleteTodo" as const, // 할 일 삭제 액션 타입
};

// TodoActionCreator 객체는 액션 생성자 함수들을 정의
export const TodoActionCreator = {
  // 할 일 추가 액션 생성자
  addTodo: (todo: string) => ({
    type: TODO_ACTION.ADD,
    payload: {
      todo: todo, // 추가할 할 일 내용
    },
  }),
  // 할 일 삭제 액션 생성자
  deleteTodo: (id: number) => ({
    type: TODO_ACTION.DELETE,
    payload: {
      id: id, // 삭제할 할 일의 ID
    },
  }),
};

// TodoActionType 타입은 두 액션 생성자 함수의 반환 타입을 합친 것
export type TodoActionType =
  | ReturnType<typeof TodoActionCreator.addTodo>
  | ReturnType<typeof TodoActionCreator.deleteTodo>;

// TodoReducer 함수는 상태(state)와 액션(action)을 받아 새로운 상태를 반환
export const TodoReducer = (
  state: Array<TodoItemType>, // 현재 상태는 TodoItemType 객체들의 배열
  action: TodoActionType // 액션은 TodoActionType
) => {
  switch (action.type) {
    case TODO_ACTION.ADD:
      // 할 일 추가 액션 처리
      return produce(state, (draft: Array<TodoItemType>) => {
        draft.push({
          id: new Date().getTime(), // 새로운 할 일의 고유 ID는 현재 시간
          todo: action.payload.todo, // 새로운 할 일의 내용
        });
      });
    case TODO_ACTION.DELETE:
      // 할 일 삭제 액션 처리
      let index = state.findIndex((item) => item.id === action.payload.id); // 삭제할 할 일의 인덱스 찾기
      return produce(state, (draft: Array<TodoItemType>) => {
        draft.splice(index, 1); // 해당 인덱스의 할 일 삭제
      });
    default:
      // 정의되지 않은 액션 타입일 경우 현재 상태 반환
      return state;
  }
};
