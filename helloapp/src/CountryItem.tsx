import React from "react";
import { CountryType } from "./App";

type CountryItemPropsType = {
  country: CountryType;
};

const CountryItem = (props: CountryItemPropsType) => {
  let item = props.country;

  return (
    <li className={item.visited ? "list-group-item active" : "list-group-item"}>
      {item.country}
    </li>
  );
};

export default CountryItem;
