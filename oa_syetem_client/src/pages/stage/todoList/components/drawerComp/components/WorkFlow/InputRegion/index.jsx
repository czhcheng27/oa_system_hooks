import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { FullscreenOutlined, PlusSquareFilled } from "@ant-design/icons";
import InputOutputWrap from "../InputOutputWrap";
import noDataIcon from "../assets/pic_nodocument@2x.png";
import inboxIcon from "../assets/inbox.png";
import Folder from "../assets/folder.png";
import css from "./index.module.less";

const InputRegion = (props) => {
  return (
    <InputOutputWrap
      btnPosition="right"
      title={
        <div className={css.inputTitle}>
          <div className={css.inputTitleRight}>
            <img src={Folder} />
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
      <div className={css.no_data}>
        <img src={noDataIcon} />
        <p>No Input</p>
      </div>
    </InputOutputWrap>
  );
};

export default InputRegion;
