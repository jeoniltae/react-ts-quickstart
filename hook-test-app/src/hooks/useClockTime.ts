import { useEffect, useState } from "react";
import DateAndTime from "date-and-time";

/**
 * <리액트 훅 사용시 주의사항>
 * 클래스 컴포넌트에서는 리액트 훅 사용 X
 * 함수 컴포넌트 내부의 최상의 코드 영역에서만 훅을 호출할 수 있음.
 * -> 반복문이나 중첩된 함수 안에서는 훅을 호출하지 않음. 훅은 컴포넌트가 렌더링될 때마다 동일한 순서대로 훅이 호출되어야 함.
 */

// 시간 형식을 정의하는 열거형(enum)
enum TimeFormatEnum {
  HHmmss = "HH:mm:ss", // 시:분:초 형식
  HHmm = "HH:mm", // 시:분 형식
  HHmmKOR = "HH시 mm분", // 한국어 시:분 형식
  HHmmssKOR = "HH시 mm분 ss초", // 한국어 시:분:초 형식
}

const useClockTime = (interval: number, timeformat: TimeFormatEnum) => {
  const [currentTime, setCurrentTime] = useState(
    DateAndTime.format(new Date(), timeformat)
  );

  useEffect(() => {
    const handle = setInterval(() => {
      setCurrentTime(DateAndTime.format(new Date(), timeformat));
    }, interval);

    return () => {
      clearInterval(handle);
    };
  }, []);

  return currentTime;
};

export { useClockTime, TimeFormatEnum };
