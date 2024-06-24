import React, { useRef } from "react";

const App06 = () => {
  // useRef 훅을 이용해 참조 객체를 생성함. 이때 초깃값은 null을 부여해야 함.
  // 코드가 실행될 떄는 렌더링과 브라우저 DOM에 업데이트되기 전이므로 아직은 참조 객체가 연결할 수 있는 DOM이 만들어지기 전이기 때문임.
  const elName: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const goFirstInputElement = () => {
    if (elName.current) {
      elName.current.focus();
    }
  };
  return (
    <div className="boxStyle">
      이름: <input type="text" ref={elName} defaultValue="홍길동" />
      <br />
      전화: <input type="text" defaultValue="010-2222-3333" />
      <br />
      주소: <input type="text" defaultValue="서울" />
      <br />
      <button onClick={goFirstInputElement}>첫 번째 필드로 포커스 이동</button>
    </div>
  );
};

export default App06;
