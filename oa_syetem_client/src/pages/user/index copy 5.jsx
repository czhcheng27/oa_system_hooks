import React, { useMemo, useState, useContext, useReducer, memo } from "react";
import { createContext, useContextSelector } from "use-context-selector";

const Context = createContext({});

const User = memo((props) => {
  console.log("User");
  const title = useContextSelector(Context, (s) => s.state.title);
  const setTitle = useContextSelector(Context, (s) => s.actions.setTitle);
  return (
    <div>
      {title}
      <button onClick={() => setTitle(new Date().getTime())}>
        change Family Name
      </button>
      <Middle />
      <B />
    </div>
  );
});

export default memo(() => {
  return (
    <Provider>
      <User />
    </Provider>
  );
});

const Provider = ({ children }) => {
  const [title, setTitle] = useState(0);
  const [familyName, setFamilyName] = useState("Jordan");
  const [firstName, setFirstName] = useState("Mike");
  const state = { title, familyName, firstName };
  const actions = { setTitle, setFamilyName, setFirstName };

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  );
};

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

const Middle = memo(() => {
  console.log("Middle");
  const title = useContextSelector(Context, (s) => s.state.title);
  // const setTitle = useContextSelector(Context, (s) => s.actions.setTitle);
  return (
    <div>
      {/* {title} */}
      <A />
    </div>
  );
});

const A = () => {
  console.log("FuncA");
  const firstName = useContextSelector(Context, (s) => s.state.firstName);
  const setFirstName = useContextSelector(
    Context,
    (s) => s.actions.setFirstName
  );
  return (
    <div>
      FuncA
      {firstName}
      <button onClick={() => setFirstName("Kevien" + Math.random())}>
        change FirstName
      </button>
    </div>
  );
};

const B = memo(() => {
  console.log("FuncB");
  const familyName = useContextSelector(Context, (s) => s.state.familyName);
  const setFamilyName = useContextSelector(
    Context,
    (s) => s.actions.setFamilyName
  );
  return (
    <div>
      FuncB
      {familyName}
      <button onClick={() => setFamilyName("Amber" + Math.random())}>
        change Family Name
      </button>
    </div>
  );
});
