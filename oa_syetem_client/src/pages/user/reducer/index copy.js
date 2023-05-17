import React, { createContext, useReducer } from "react";
import { createContainer } from "react-tracked";

// defininate the global state here.
const initLogName = {
  loginName: "name",
  age: 18,
};

const initPw = {
  user: "Jack",
  passWord: "123",
};

const initTitle = "titleeee";

export const useStoreReducer = () => {
  // reducer function
  const logName = useReducer((state, action) => {
    switch (action.type) {
      case "set_logname":
        return {
          ...state,
          loginName: action.loginName,
        };
      default:
        return state;
    }
  }, initLogName);

  const password = useReducer((state, action) => {
    console.log("state, action", state, action);
    switch (action.type) {
      case "set_password":
        return {
          ...state,
          passWord: action.passWord,
        };
      default:
        return action.payload;
    }
  }, initPw);

  const pageTitle = useReducer((state, action) => {
    switch (action.type) {
      case "set_page_title":
        return action.title;
      default:
        return state;
    }
  }, initTitle);

  const [loginName, dpchLoginName] = logName;
  const [passWord, dpchPassWord] = password;
  const [title, dpchTitle] = pageTitle;

  const dispatchTitle = (payload) => {
    dpchTitle({
      type: "set_page_title",
      title: payload,
    });
  };

  const dispatchLoginName = (payload) => {
    dpchLoginName({
      type: "set_logname",
      loginName: payload,
    });
  };

  const dispatchPassWord = (payload) => {
    dpchPassWord({
      type: "set_password_nomatch",
      payload,
    });
  };

  return {
    loginName,
    dispatchLoginName,
    passWord,
    dispatchPassWord,
    title,
    dispatchTitle,
  };

  // const state = { loginName, passWord, title };
  // const dispatch = { dispatchLoginName, dispatchPassWord, dispatchTitle };
  // return { state, dispatch };
};

export const ReducerContext = createContext({});
export const DispatchContext = createContext({});

const logName = (state, action) => {
  switch (action.type) {
    case "set_logname":
      return {
        ...state,
        loginName: action.loginName,
      };
    default:
      return state;
  }
};

const password = (state, action) => {
  console.log("state, action", state, action);
  switch (action.type) {
    case "set_password":
      return {
        ...state,
        passWord: action.passWord,
      };
    default:
      return action.payload;
  }
};

const pageTitle = (state, action) => {
  switch (action.type) {
    case "set_page_title":
      return action.title;
    default:
      return state;
  }
};

export const MyReducerContext = ({ children }) => {
  const Context = ReducerContext;

  const [loginName, dpchLoginName] = useReducer(logName, initLogName);
  const [passWord, dpchPassWord] = useReducer(password, initPw);
  const [title, dpchTitle] = useReducer(pageTitle, initTitle);

  const dispatchTitle = (payload) => {
    dpchTitle({
      type: "set_page_title",
      title: payload,
    });
  };

  const dispatchLoginName = (payload) => {
    dpchLoginName({
      type: "set_logname",
      loginName: payload,
    });
  };

  const dispatchPassWord = (payload) => {
    dpchPassWord({
      type: "set_password_nomatch",
      payload,
    });
  };
  return (
    <Context.Provider
      value={{
        loginName,
        // dispatchLoginName,
        passWord,
        // dispatchPassWord,
        title,
        // dispatchTitle,
      }}
    >
      <DispatchContext.Provider
        value={{
          // loginName,
          dispatchLoginName,
          // passWord,
          dispatchPassWord,
          // title,
          dispatchTitle,
        }}
      >
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

// export const { Provider, useTracked } = createContainer(() => {
//   const [loginName, dpchLoginName] = useReducer(logName, initLogName);
//   const [passWord, dpchPassWord] = useReducer(password, initPw);
//   const [title, dpchTitle] = useReducer(pageTitle, initTitle);

//   const dispatchTitle = (payload) => {
//     dpchTitle({
//       type: "set_page_title",
//       title: payload,
//     });
//   };

//   const dispatchLoginName = (payload) => {
//     dpchLoginName({
//       type: "set_logname",
//       loginName: payload,
//     });
//   };

//   const dispatchPassWord = (payload) => {
//     dpchPassWord({
//       type: "set_password_nomatch",
//       payload,
//     });
//   };

//   const state = { title, passWord, loginName };
//   const dispatch = { dispatchTitle, dispatchPassWord, dispatchLoginName };
//   return [state, dispatch];
// });

const initState = {
  userInfo: {
    name: "mike",
    age: 18,
  },
  title: "123",
  logInfo: {
    username: "Jack",
    password: "111",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setTitle":
      return { ...state, title: action.payload };
    case "setUserInfo":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export const Context = createContext({});
export const Actions = createContext({});

export const useStoreActions = (dispatch) => {
  // defininate global action here. could be async fn.
  return {
    setTitle(payload) {
      dispatch({
        type: "setTitle",
        payload,
      });
    },
    setUserInfo(payload) {
      dispatch({
        type: "setUserInfo",
        payload,
      });
    },
  };
};

export const MyContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const action = useStoreActions(dispatch);

  return (
    // <Context.Provider value={{ state, action }}>{children}</Context.Provider>
    <Context.Provider value={{ state }}>
      <Actions.Provider value={{ action }}>{children}</Actions.Provider>
    </Context.Provider>
  );
};

export const { Provider, useTracked } = createContainer(() => {
  const [state, dispatch] = useReducer(reducer, initState);
  // const action = useStoreActions(dispatch);
  return [state, dispatch];
});
