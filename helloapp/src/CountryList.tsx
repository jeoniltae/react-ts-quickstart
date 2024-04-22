import React from "react";
import { CountryType } from "./App";

type CountryListPropsType = {
  countries: Array<CountryType>;
};

const CountryList = (props: CountryListPropsType) => {
  const list = props.countries;

  let countries = list.map((item) => {
    // 아래 리턴값의 className에 삼항 연산식을 사용하지 않으면 JSX 구문 밖에서 미리 보간할 값을 만들어야 함.
    // let CountryClass: string = "";
    // if (item.visited) {
    //   CountryClass = "list-group-item active";
    // } else {
    //   CountryClass = "list-group-item";
    // }

    return (
      <li
        key={item.no}
        className={item.visited ? "list-group-item active" : "list-group-item"}
      >
        {item.country}
      </li>
    );
  });

  return <ul className="list-group">{countries}</ul>;
};

export default CountryList;
