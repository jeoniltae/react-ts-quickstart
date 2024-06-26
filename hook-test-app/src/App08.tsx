import React, { useEffect, useState } from "react";
import DateAndTime from "date-and-time";

const App08 = () => {
  const [currentTime, setCurrentTime] = useState(
    DateAndTime.format(new Date(), "HH:mm:ss")
  );

  useEffect(() => {
    const handle = setInterval(() => {
      setCurrentTime(DateAndTime.format(new Date(), "HH:mm:ss"));
    }, 1000);

    return () => {
      clearInterval(handle);
    };
  }, []);

  return (
    <div>
      <h2>현재 시각</h2>
      <hr />
      <div>{currentTime}</div>
    </div>
  );
};

export default App08;
