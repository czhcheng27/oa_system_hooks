// 官方推荐的 Split contexts 方法
import React, { useContext, memo } from "react";
import {
  MyContext,
  TitleContext,
  FamilyNameContext,
  FirstNameContext,
} from "./reducer";

const Middle = memo(() => {
  console.log("Middle");
  const [firstName, dispatch] = useContext(TitleContext);
  return (
    <div>
      {firstName}
      <A />
    </div>
  );
});

const A = memo(() => {
  console.log("FuncA");
  const [firstName, dispatch] = useContext(TitleContext);
  return (
    <div>
      FuncA
      {firstName}
      <button onClick={() => dispatch("Jack" + Math.random())}>
        change FirstName
      </button>
    </div>
  );
});

const B = memo(() => {
  console.log("FuncB");
  const [familyName, dispatch] = useContext(FamilyNameContext);
  return (
    <div>
      FuncB
      {familyName}
      <button onClick={() => dispatch("Amber" + Math.random())}>
        change Family Name
      </button>
    </div>
  );
});

const User = memo((props) => {
  const [title, dispatch] = useContext(FirstNameContext);
  return (
    <div>
      {console.log("User")}
      {title}
      <button onClick={() => dispatch(new Date().getTime())}>
        changeTitle
      </button>
      <Middle />
      <B />
    </div>
  );
});

export default memo(() => {
  return (
    <MyContext>
      <User />
    </MyContext>
  );
});
