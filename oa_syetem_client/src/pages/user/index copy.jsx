import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
  memo,
} from "react";
import {
  ReducerContext,
  useStoreReducer,
  DispatchContext,
  MyReducerContext,
  // Provider,
  // useTracked,
} from "./reducer/index";
import css from "./index.module.less";
import Children1 from "./components/children1";
import { useReducer } from "react";
import { createContainer } from "react-tracked";

const User = memo((props) => {
  console.log("User");
  const [count, setCount] = useState(0);
  // const receive = useContext(ReducerContext);
  // console.log("1", receive);
  // const { title, dispatchTitle, passWord, dispatchPassWord } = receive;

  // const receive = useContext(ReducerContext);
  // console.log("1", receive);
  // const { title, passWord } = receive;
  // const { dispatchPassWord, dispatchTitle } = useContext(DispatchContext);

  // const { state } = useContext(ReducerContext);
  // const { dispatch } = useContext(DispatchContext);

  // const [state, dispatch] = useContext(ReducerContext).value;
  // console.log("state, dispatch", state, dispatch);

  const [state, dispatch] = useTracked();
  const { title, passWord } = state;
  const { dispatchTitle, dispatchPassWord } = dispatch;
  console.log("dispatch", dispatch);
  return (
    <div>
      User
      <div>{title}</div>
      <button onClick={() => dispatchTitle("asd")}>button</button>
      <div>
        {passWord.user} / {passWord.passWord}
      </div>
      <button
        onClick={() => dispatchPassWord({ user: "Mike", passWord: "789" })}
      >
        button3
      </button>
      {/* {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => setCount(count + 1)}>{count}</button> */}
      <Children1 />
    </div>
  );
});
// export default User;

const initTitle = "titleeee";
const pageTitle = (state, action) => {
  switch (action.type) {
    case "set_page_title":
      return action.title;
    default:
      return state;
  }
};

const { Provider, useTracked } = createContainer(() =>
  useReducer(reducer, initialState)
);
// const { Provider, useTracked } = createContainer(() => {
//   const [title, dpchTitle] = useReducer(pageTitle, initTitle);
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return [
//     { state, title },
//     { dispatch, dpchTitle },
//   ];
// });

// eslint-disable-next-line react/display-name
export default memo(() => {
  // const Context = ReducerContext;
  // const res = useStoreReducer();
  // return (
  //   <Context.Provider value={res}>
  //     <User />
  //   </Context.Provider>
  // );
  return (
    // <Provider>
    //   <User />
    // </Provider>
    <Provider>
      <PersonFirstName />
      <PersonFamilyName />
      <ChildTitle />
    </Provider>
    // <MyContext>
    //   {/* <User /> */}
    //   <PersonFirstName />
    //   <PersonFamilyName />
    // </MyContext>
    // <MyReducerContext>
    //   <User />
    // </MyReducerContext>
  );
});

const initialState = {
  firstName: "Harry",
  familyName: "Potter",
  title: "asd",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setFirstName":
      return { ...state, firstName: action.firstName };
    case "setFamilyName":
      return { ...state, familyName: action.familyName };
    default:
      throw new Error("unexpected action type");
  }
};

const MyContext = ({ children }) => {
  const Context = ReducerContext;
  // const { state, dispatch } = useStoreReducer();

  const value = useReducer(reducer, initialState);
  // const [state1, dispatch1] = useReducer(reducer, { count: 100 });
  // const value = useMemo(() => [state, dispatch], [state]);

  return (
    <Context.Provider value={value}>
      {/* <DispatchContext.Provider value={{ dispatch }}> */}
      {children}
      {/* </DispatchContext.Provider> */}
    </Context.Provider>
  );
};

const PersonFirstName = () => {
  const [state, dispatch] = useTracked();
  console.log("aaaa", state);
  return (
    <div>
      First Name:
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
  console.log("bbb");
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

const ChildTitle = () => {
  console.log("ChildTitle");
  const [state, dispatch] = useTracked();
  return <div>{state.title}</div>;
};
