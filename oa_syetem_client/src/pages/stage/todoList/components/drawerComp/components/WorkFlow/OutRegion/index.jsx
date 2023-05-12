import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { CheckCircleFilled, DeleteOutlined } from "@ant-design/icons";
import InputOutputWrap from "../InputOutputWrap";
import { outData } from "../mock";
import SVG3 from "../assets/svg3";
import css from "./index.module.less";

const OutRegion = (props) => {
  return (
    <InputOutputWrap
      btnPosition="left"
      title={
        <div className={css.inputTitle}>
          <div className={css.inputTitleRight}>
            <SVG3 />
            <span className={css.titleFont}>Output</span>
          </div>
        </div>
      }
    >
      <div className={css.no_data}>
        {outData.map((el, index) => {
          return (
            <div key={index} className={css.each_row}>
              <div>{el.title}</div>
              <div>
                {el.success ? (
                  <CheckCircleFilled style={{ color: "rgb(50,205,50)" }} />
                ) : (
                  <DeleteOutlined style={{ color: "red" }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </InputOutputWrap>
  );
};

export default OutRegion;
