import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "./components/ScreenHeader";
import ScreenContainer from "./components/ScreenContainer";
import ScreenBg from "./components/ScreenBg";
import LoadingBg from "./components/LoadingBg";
import css from "./index.module.less";

const BigScreen1 = (props) => {
  const navigate = useNavigate();

  const [activeCode, setActiveCode] = useState("1");
  const [isReady, setIsReady] = useState(false); // 控制页面主要内容显示

  useEffect(() => {
    // 模拟加载资源，1s 后再展示页面
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const jumpFunc = (data) => {
    navigate(data.url, { replace: true });
  };

  return (
    <div className={`${css.moduleBox} moduleBox_large_screen`}>
      <LoadingBg />
      {isReady && (
        <>
          <ScreenBg />
          <ScreenHeader
            activeCode={activeCode}
            callback={(data) => jumpFunc(data)}
          />
          <ScreenContainer />
        </>
      )}
    </div>
  );
};

export default BigScreen1;
