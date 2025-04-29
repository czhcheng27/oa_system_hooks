import React, { useEffect, useState } from "react";
import ScreenHeader from "./components/ScreenHeader";
import ScreenContainer from "./components/ScreenContainer";
import ScreenBg from "./components/ScreenBg";
import css from "./index.module.less";
import { toggle } from "src/utils/fullScreen";

const BigScreen1 = (props) => {
  const [activeCode, setActiveCode] = useState("1");

  useEffect(() => {
    // handleFullScreen();
  }, []);

  const handleFullScreen = () => {
    const elm = document.querySelector(".moduleBox_large_screen");
    toggle(elm);
  };

  return (
    <div className={`${css.moduleBox} moduleBox_large_screen`}>
      <ScreenBg />
      <ScreenHeader activeCode={activeCode} callback={setActiveCode} />
      <ScreenContainer />
    </div>
  );
};

export default BigScreen1;
