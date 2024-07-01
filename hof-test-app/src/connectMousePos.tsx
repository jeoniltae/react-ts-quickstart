import React, { ComponentType, useEffect, useState } from "react";

// 마우스 위치를 나타내는 타입 정의
export type PositionType = {
  x: number;
  y: number;
};

/**
 * HOC (Higher-Order Component) 함수
 * @param TargetComponent - 마우스 위치를 표시할 대상 컴포넌트
 * @returns 새로운 컴포넌트를 반환하며, 현재 마우스 위치(position)를 props로 전달합니다.
 */
export const connectMousePos = (TargetComponent: ComponentType<any>) => {
  return (props: any) => {
    // 마우스 위치를 저장할 state
    let [position, setPosition] = useState<PositionType>({
      x: 0,
      y: 0,
    });

    // 컴포넌트가 마운트될 때와 언마운트될 때 실행되는 effect
    useEffect(() => {
      // 마우스 이동 이벤트 핸들러
      const onMove = (e: MouseEvent) => {
        setPosition({
          x: e.pageX,
          y: e.pageY,
        });
      };

      // 마우스 이동 이벤트를 window 객체에 등록
      window.addEventListener("mousemove", onMove);

      // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거
      return () => {
        window.removeEventListener("mousemove", onMove);
      };
    }, []);

    // TargetComponent에 현재 마우스 위치(position)과 기존의 props를 전달
    return <TargetComponent {...props} position={position} />;
  };
};

export default connectMousePos;

/**
 * 주석 설명:
 *
 * 1. `import` 문: 필요한 라이브러리와 모듈을 가져옵니다.
 *
 * 2. `PositionType`: 마우스 위치를 나타내는 타입을 정의합니다.
 *
 * 3. `connectMousePos`: HOC(Higher-Order Component) 함수로, 타겟 컴포넌트에 현재 마우스 위치를 prop으로 전달합니다.
 *    - `TargetComponent`: 마우스 위치를 표시할 대상 컴포넌트입니다.
 *
 * 4. `useState`: 마우스 위치를 저장할 state를 설정합니다.
 *
 * 5. `useEffect`: 컴포넌트가 마운트될 때와 언마운트될 때 실행되는 effect입니다.
 *    - `window.addEventListener("mousemove", onMove)`: 마우스 이동 이벤트 핸들러를 window 객체에 등록합니다.
 *    - `window.removeEventListener("mousemove", onMove)`: 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거합니다.
 *
 * 6. `onMove`: 마우스 이동 이벤트가 발생할 때 호출되는 핸들러 함수입니다.
 *    - `e.pageX`와 `e.pageY`를 이용해 마우스의 현재 위치를 가져와 state를 업데이트합니다.
 *
 * 7. `...props`: 스프레드 연산자로, 부모 컴포넌트로부터 전달받은 모든 props를 TargetComponent에 전달합니다.
 *    - `{...props}`는 부모 컴포넌트가 자식 컴포넌트에 전달한 모든 props를 그대로 전달합니다.
 *    - 예를 들어, 부모 컴포넌트가 `TargetComponent`에 `{foo: 'bar', baz: 42}`라는 props를 전달했다면,
 *      `connectMousePos`는 `TargetComponent`에 `{foo: 'bar', baz: 42, position: {x: 현재 x 좌표, y: 현재 y 좌표}}`을 넘겨줍니다.
 */
