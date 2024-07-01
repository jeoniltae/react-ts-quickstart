import React, { ComponentType, useEffect, useState } from "react";
import DateAndTime from "date-and-time";

// 시간 형식을 정의하는 열거형(enum)
export enum TimeFormatEnum {
  HHmmss = "HH:mm:ss", // 시:분:초 형식
  HHmm = "HH:mm", // 시:분 형식
  HHmmKOR = "HH시 mm분", // 한국어 시:분 형식
  HHmmssKOR = "HH시 mm분 ss초", // 한국어 시:분:초 형식
}

/**
 * HOC (Higher-Order Component) 함수
 * @param TargetComponent - 시간을 표시할 대상 컴포넌트
 * @param timeFormat - 시간을 표시할 형식
 * @param interval - 시간을 업데이트할 간격 (밀리초 단위)
 * @returns 새로운 컴포넌트를 반환하며, 현재 시간(currentTime)을 props로 전달합니다.
 */
const connectClockTime = (
  TargetComponent: ComponentType<any>,
  timeFormat: TimeFormatEnum,
  interval: number
) => {
  return (props: any) => {
    // 현재 시간을 저장할 state
    let [currentTime, setCurrentTime] = useState<string>(
      DateAndTime.format(new Date(), timeFormat)
    );

    // 컴포넌트가 마운트될 때와 언마운트될 때 실행되는 effect
    useEffect(() => {
      // interval을 설정하여 일정 간격마다 시간을 업데이트
      const handle = setInterval(() => {
        setCurrentTime(DateAndTime.format(new Date(), timeFormat));
      }, interval);

      // 컴포넌트가 언마운트될 때 interval을 정리
      return () => {
        clearInterval(handle);
      };
    }, [timeFormat, interval]);

    // TargetComponent에 현재 시간(currentTime)과 기존의 props를 전달
    return <TargetComponent {...props} currentTime={currentTime} />;
  };
};

export default connectClockTime;

/**
 * 주석 설명:
 *
 * 1. `import` 문: 필요한 라이브러리와 모듈을 가져옵니다.
 *
 * 2. `TimeFormatEnum`: 시간을 다양한 형식으로 표시하기 위한 열거형(enum)입니다.
 *
 * 3. `connectClockTime`: HOC(Higher-Order Component) 함수로, 타겟 컴포넌트에 현재 시간을 prop으로 전달합니다.
 *    - `TargetComponent`: 시간을 표시할 대상 컴포넌트입니다.
 *    - `timeFormat`: 시간을 표시할 형식입니다.
 *    - `interval`: 시간을 업데이트할 간격(밀리초 단위)입니다.
 *
 * 4. `useState`: 현재 시간을 저장할 state를 설정합니다.
 *
 * 5. `useEffect`: 컴포넌트가 마운트될 때와 언마운트될 때 실행되는 effect입니다.
 *    - `setInterval`: 일정 간격마다 시간을 업데이트합니다.
 *    - `clearInterval`: 컴포넌트가 언마운트될 때 interval을 정리합니다.
 *
 * 6. `...props`: 스프레드 연산자로, 부모 컴포넌트로부터 전달받은 모든 props를 TargetComponent에 전달합니다.
 *    - `{...props}`는 부모 컴포넌트가 자식 컴포넌트에 전달한 모든 props를 그대로 전달합니다.
 *    - 예를 들어, 부모 컴포넌트가 `TargetComponent`에 `{foo: 'bar', baz: 42}`라는 props를 전달했다면,
 *      `connectClockTime`은 `TargetComponent`에 `{foo: 'bar', baz: 42, currentTime: '현재 시간'}`을 넘겨줍니다.
 */
