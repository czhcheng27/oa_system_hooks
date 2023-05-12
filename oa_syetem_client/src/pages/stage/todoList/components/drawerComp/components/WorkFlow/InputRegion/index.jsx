import React, { useState } from "react";
import { FullscreenOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import InputOutputWrap from "../InputOutputWrap";
import InputList from "./InputList";
import { inputData } from "../mock";
import SVG2 from "../assets/svg2";
import css from "./index.module.less";
import InputDetailModal from "./InputDetailModal";

const InputRegion = (props) => {
  const [clickItem, setClickItem] = useState({});
  const [visible, setVisible] = useState(false);

  const openModal = (data) => {
    setVisible(true);
    setClickItem(data);
  };

  const closeModal = () => {
    setVisible(false);
  };
  return (
    <>
      <InputOutputWrap
        btnPosition="right"
        title={
          <div className={css.inputTitle}>
            <div className={css.inputTitleRight}>
              <SVG2 />
              <span className={css.titleFont}>Input</span>
            </div>
            <div className={css.inputTitleRight}>
              <FullscreenOutlined
                //   onClick={() => {
                //     setInputCardIndex(0);
                //     setInputDetails(true);
                //   }}
                className={css.inputTitle1}
              />
            </div>
          </div>
        }
      >
        <InputList inputData={inputData} openModal={openModal} />
      </InputOutputWrap>
      {visible && (
        <InputDetailModal clickItem={clickItem} closeModal={closeModal} />
      )}
    </>
  );
};

export default InputRegion;
