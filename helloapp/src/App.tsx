import React from "react";
import CountryList from "./CountryList";

type Props = {};

const App = (props: Props) => {
  // let msg = "<i>World</i>";
  let msg = <i>World</i>; // HTML로 나오게 하려면 이렇게 사용1
  const addResult = (x: number, y: number) => {
    return (
      <div className="card card-body bg-light mb-3">
        {x} + {y} = {x + y}
      </div>
    );
  };

  return (
    <div className="container">
      {/* {}에 보간된 HTML문자열은 인코딩 됨 */}
      <h2>Hello {msg}!</h2>

      {/* HTML로 나오게 하려면 이렇게 사용2 */}
      {/* <h2>
        Hello <span dangerouslySetInnerHTML={{ __html: msg }} />!
      </h2> */}
      <hr className="dash-style" />
      {addResult(4, 3)}
      <CountryList />
    </div>
  );
};

export default App;
