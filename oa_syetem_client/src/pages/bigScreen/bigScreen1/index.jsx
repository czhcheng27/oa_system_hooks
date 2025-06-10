import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "./components/ScreenHeader";
import ScreenContainer from "./components/ScreenContainer";
import ScreenBg from "./components/ScreenBg";
import LoadingBg from "./components/LoadingBg";
import Modal from "./components/Modal";
import { SUGGEST_HEIGHT, SUGGEST_WIDTH } from "./const";
import css from "./index.module.less";

const BigScreen1 = (props) => {
  const navigate = useNavigate();

  const [activeCode, setActiveCode] = useState("1");
  const [isReady, setIsReady] = useState(false); // 控制页面主要内容显示
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // 模拟加载资源，1s 后再展示页面
    const timer = setTimeout(() => {
      setIsReady(true);
      const wrapper = document.getElementById("moduleBox_large_screen");
      if (
        wrapper.clientWidth < SUGGEST_WIDTH ||
        wrapper.clientHeight < SUGGEST_HEIGHT
      ) {
        setModalShow(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const jumpFunc = (data) => {
    if (data.outterlink) {
      return window.open(data.url);
    }
    navigate(data.url, { replace: true });
  };

  return (
    <div className={`${css.moduleBox}`} id="moduleBox_large_screen">
      <LoadingBg />
      {isReady && (
        <>
          <ScreenBg />
          <ScreenHeader
            activeCode={activeCode}
            callback={(data) => jumpFunc(data)}
          />
          <ScreenContainer />

          <Modal
            type={"alert"}
            title="Notice"
            modalShow={modalShow}
            closeHandle={() => setModalShow(false)}
          />
        </>
      )}
    </div>
  );
};

export default BigScreen1;
