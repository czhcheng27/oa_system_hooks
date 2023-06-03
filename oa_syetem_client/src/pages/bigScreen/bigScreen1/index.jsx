import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import ScreenHeader from "./components/ScreenHeader";
import ScreenContainer from "./components/ScreenContainer";
import ScreenBg from "./components/ScreenBg";
import css from "./index.module.less";

const BigScreen1 = (props) => {
  const [activeCode, setActiveCode] = useState("1");

  return (
    <div className={css.moduleBox}>
      <ScreenBg />
      <ScreenHeader activeCode={activeCode} callback={setActiveCode} />
      <ScreenContainer />
    </div>
  );
};

export default BigScreen1;
