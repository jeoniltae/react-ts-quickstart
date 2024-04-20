import React from "react";

type CountryType = {
  no: number;
  country: string;
  visited: boolean;
};

const CountryList = () => {
  let list: Array<CountryType> = [
    {
      no: 1,
      country: "이집트",
      visited: false,
    },
    {
      no: 2,
      country: "일본",
      visited: true,
    },
    {
      no: 3,
      country: "피지",
      visited: false,
    },
    {
      no: 4,
      country: "콜롬비아",
      visited: false,
    },
  ];

  let Countries = list.map((item) => {
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

  return <ul className="list-group">{Countries}</ul>;
};

export default CountryList;
