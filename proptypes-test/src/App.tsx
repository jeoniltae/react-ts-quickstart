import { useState } from "react";
import Calc from "./Calc";

function App() {
  const [x, setX] = useState<number>(100);
  const [y, setY] = useState<number>(200);
  const [oper, setOper] = useState<string>("&");

  return (
    <div>
      {/* 기본형 */}
      {/* <Calc x={x} y={y} oper={oper} /> */}

      {/* defaultProps를 사용할 경우 */}
      <Calc x={x} />
    </div>
  );
}

export default App;
