import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";
// import { Actions, Context, MyContext, Provider, useTracked } from "./reducer";
import { useContext } from "react";
import { memo } from "react";
import { useReducer } from "react";
import { createContainer } from "react-tracked";

const User = memo((props) => {
  const [state, dispatch] = useTracked();
  // // const { title } = state;
  // console.log("dispatch", dispatch);
  return (
    <div>
      {/* {state.title}
      <button onClick={() => dispatch({ type: "setTitle", title: "asd" })}>
        changeTitle
      </button> */}
      {/* <button onClick={() => dispatch.setTitle("asd")}>changeTitle</button> */}
      {/* <A /> */}
      <PersonFirstName />
      <PersonFamilyName />
      <A />
    </div>
  );
});

const User1 = memo((props) => {
  const [state, dispatch] = useTracked();
  console.log("aaaa", state);
  return (
    <div>
      User1 First Name:
      {console.log("firstName")}
      <input
        value={state.firstName}
        onChange={(event) => {
          dispatch({ type: "setFirstName", firstName: event.target.value });
        }}
      />
    </div>
  );
});

export default memo(() => {
  return (
    <Provider>
      <User />
      {/* <PersonFirstName />
      <PersonFamilyName />
      <A /> */}
    </Provider>
  );
});

const A = memo(() => {
  console.log("FuncA");
  const [state, dispatch] = useTracked();
  const { title } = state;
  return (
    <div>
      FuncA{console.log("FuncAFuncAFuncA")}
      {/* <div>name: {name}</div>
      <div>age: {age}</div> */}
    </div>
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

const { Provider, useTracked } = createContainer(() =>
  useReducer(reducer, initialState)
);

const PersonFirstName = () => {
  const [state, dispatch] = useTracked();
  console.log("aaaa", state);
  return (
    <div>
      First Name:
      {console.log("firstName")}
      <input
        value={state.firstName}
        onChange={(event) => {
          dispatch({ type: "setFirstName", firstName: event.target.value });
        }}
      />
    </div>
  );
};

const PersonFamilyName = () => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      {console.log("Family Name")}
      Family Name:
      <input
        value={state.familyName}
        onChange={(event) => {
          dispatch({ type: "setFamilyName", familyName: event.target.value });
        }}
      />
    </div>
  );
};
