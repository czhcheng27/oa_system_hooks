import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from "react";
import {
  DispatchContext,
  ReducerContext,
  useStoreReducer,
  useTracked,
} from "../../reducer/index";
import { memo } from "react";

// import css from './index.module.less';

const Children1 = memo((props) => {
  console.log("Children1");
  // const { loginName } = useContext(ReducerContext);
  // const { dispatchLoginName } = useContext(DispatchContext);
  // console.log("dispatchLoginName", dispatchLoginName);
  // const res = useContext(ReducerContext);
  // console.log("res", res);
  // const { dispatch } = useContext(DispatchContext);
  const { state, dispatch } = useTracked();
  return (
    <div>
      {console.log("1111111111111111111111111")}
      sss
      {/* {loginName.loginName}
      {loginName.age} */}
      {/* <button onClick={() => dispatch({ type: "increment" })}>button2</button> */}
    </div>
  );
});

export default memo(Children1);
