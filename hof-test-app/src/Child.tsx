import React from "react";
import connectClockTime, { TimeFormatEnum } from "./connectClockTime";
import connectMousePos, { PositionType } from "./connectMousePos";

// props 타입 정의
type propsType = {
  currentTime: string;
  position: PositionType;
};

/**
 * Child 컴포넌트
 * @param props - currentTime(현재 시각)과 position(마우스 위치)을 props로 받습니다.
 * @returns JSX 엘리먼트를 반환합니다.
 */
const Child = (props: propsType) => {
  return (
    <div>
      <h2>고차 컴포넌트 사용하기</h2>
      <div>현재 시각: {props.currentTime}</div>
      <hr />
      <div>
        마우스 위치: {props.position.x}, {props.position.y}
      </div>
    </div>
  );
};

// connectMousePos와 connectClockTime 고차 컴포넌트를 사용하여 Child 컴포넌트를 감쌉니다.
// connectClockTime: Child 컴포넌트에 현재 시각을 props로 전달합니다.
// connectMousePos: Child 컴포넌트에 마우스 위치를 props로 전달합니다.
export default connectMousePos(
  connectClockTime(Child, TimeFormatEnum.HHmmssKOR, 1000)
);

/**
 * 주석 설명:
 *
 * 1. **`import` 문**: 필요한 라이브러리와 모듈을 가져옵니다.
 *    - `connectClockTime`: 시간 관련 HOC
 *    - `TimeFormatEnum`: 시간 형식 열거형
 *    - `connectMousePos`: 마우스 위치 관련 HOC
 *    - `PositionType`: 마우스 위치 타입
 *
 * 2. **`propsType`**: `Child` 컴포넌트가 받을 props의 타입을 정의합니다.
 *    - `currentTime`: 현재 시각을 나타내는 문자열
 *    - `position`: 마우스 위치를 나타내는 객체
 *
 * 3. **`Child` 컴포넌트**: `currentTime`과 `position`을 props로 받아 화면에 표시합니다.
 *    - `h2`: 제목을 표시합니다.
 *    - `div`: 현재 시각을 표시합니다.
 *    - `hr`: 구분선
 *    - `div`: 마우스 위치를 표시합니다.
 *
 * 4. **`connectMousePos`와 `connectClockTime` 사용**:
 *    - `connectClockTime(Child, TimeFormatEnum.HHmmssKOR, 1000)`: `Child` 컴포넌트에 현재 시각을 props로 전달하는 HOC를 적용합니다.
 *    - `connectMousePos`: `Child` 컴포넌트에 마우스 위치를 props로 전달하는 HOC를 적용합니다.
 *    - 이 두 HOC를 적용하여 최종적으로 `Child` 컴포넌트에 현재 시각과 마우스 위치를 모두 전달합니다.
 */
