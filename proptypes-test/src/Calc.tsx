import React from "react";
import PropTypes from "prop-types";

type CalcPropsTypes = {
  x: number;
  y: number;
  oper: string;
};

const Calc = (props: CalcPropsTypes) => {
  let result: number = 0;
  switch (props.oper) {
    case "+":
      result = props.x + props.y;
      break;
    case "*":
      result = props.x * props.y;
      break;
    default:
      result = 0;
  }
  return (
    <div>
      <h3>연상 방식: {props.oper}</h3>
      <hr />
      <div>
        {props.x} {props.oper} {props.y} = {result}
      </div>
    </div>
  );
};

// 첫 번째 인자 props는 컴포넌트로 전달된 속성
// 두 번째 인자는 x, y, oper와 같은 속성의 이름
// 전달된 속성의 값은 props[propName]과 같이 접근 가능
// 세 번째 인자는 컴포넌트의 이름
const calcChecker = (props: any, propName: string, componentName: string) => {
  if (propName === "oper") {
    if (props[propName] !== "+" && props[propName] !== "*") {
      return new Error(
        `${propName}속성의 값은 반드시 '+', '*'만 허용합니다(at ${componentName}).`
      );
    }
  }

  // y속성은 0 ~ 100사이의 짝수이어야 한다 조건 추가
  // 해당 조건이 참이여서 경고가 출력되어도 연산은 실행됨.
  if (propName === "y") {
    let y = props[propName];
    if (y > 100 || y < 0 || y % 2 !== 0) {
      return new Error(
        `${propName}속성의 값은 0이상 100이하의 짝수만 허용합니다(at ${componentName}).`
      );
    }
  }
};

Calc.propTypes = {
  x: PropTypes.number,
  y: calcChecker,
  oper: calcChecker, // 사용자 정의 유효성 검증
};

// 타입스크립트 사용시 defaultProps 비추
// https://jaewook.me/react-default-props-and-functional-component 참고
Calc.defaultProps = {
  x: 100,
  y: 20,
  oper: "+",
};

export default Calc;
