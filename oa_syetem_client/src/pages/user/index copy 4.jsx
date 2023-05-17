// 官方推荐的 Split contexts 方法
import React, { useMemo } from "react";
import css from "./index.module.less";
import { memo } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const reducerA = (state, action) => {
  switch (action.type) {
    case "setFirstName":
      return action.firstName;
    default:
      throw new Error("unexpected action type");
  }
};

const reducerB = (state, action) => {
  switch (action.type) {
    case "setFamilyName":
      return action.familyName;
    default:
      throw new Error("unexpected action type");
  }
};

const reducerC = (state, action) => {
  switch (action.type) {
    case "setTitle":
      return action.title;
    default:
      throw new Error("unexpected action type");
  }
};

const ContextA = createContext({});
const ContextB = createContext({});
const ContextC = createContext({});
const MyContext = ({ children }) => {
  const [state1, dispatch1] = useReducer(reducerA, "Mike");
  const [state2, dispatch2] = useReducer(reducerB, "Jordan");
  const [state3, dispatch3] = useReducer(reducerC, "asd");
  const valueA = useMemo(() => [state1, dispatch1], [state1]);
  const valueB = useMemo(() => [state2, dispatch2], [state2]);
  const valueC = useMemo(() => [state3, dispatch3], [state3]);

  return (
    <ContextA.Provider value={valueA}>
      <ContextB.Provider value={valueB}>
        <ContextC.Provider value={valueC}>{children}</ContextC.Provider>
      </ContextB.Provider>
    </ContextA.Provider>
  );
};

const Middle = memo(() => {
  console.log("Middle");
  const [firstName, dispatch] = useContext(ContextA);
  return <A />;
});

const A = memo(() => {
  console.log("FuncA");
  const [firstName, dispatch] = useContext(ContextA);
  return (
    <div>
      FuncA{console.log("FuncAFuncAFuncA")}
      {firstName}
      <button
        onClick={() => dispatch({ type: "setFirstName", firstName: "Jack" })}
      >
        change FirstName
      </button>
    </div>
  );
});

const B = memo(() => {
  console.log("FuncB");
  const [familyName, dispatch] = useContext(ContextB);
  return (
    <div>
      FuncB{console.log("FuncBFuncBFuncB")}
      {familyName}
      <button
        onClick={() => dispatch({ type: "setFamilyName", familyName: "Amber" })}
      >
        change Family Name
      </button>
    </div>
  );
});

const User = memo((props) => {
  const [title, dispatch] = useContext(ContextC);
  return (
    <div>
      {console.log("User")}
      {title}
      <button
        onClick={() =>
          dispatch({ type: "setTitle", title: new Date().getTime() })
        }
      >
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

const initialState = {
  firstName: "Harry",
  familyName: "Potter",
  title: "123",
};

const reducer = (state, action) => {
  console.log("state, action", state, action);
  switch (action.type) {
    case "setFirstName":
      return { ...state, firstName: action.firstName };
    case "setFamilyName":
      return { ...state, familyName: action.familyName };
    case "setTitle":
      return { ...state, title: action.title };
    default:
      throw new Error("unexpected action type");
  }
};

// const MyContext = ({ children }) => {
//   const ContextRd = Context;
//   const ActionsRd = Actions;

//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <ContextRd.Provider value={state}>
//       <ActionsRd.Provider value={dispatch}>{children}</ActionsRd.Provider>
//     </ContextRd.Provider>
//   );
// };
