import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import classNames from "classnames";
import SVG4 from "../../../assets/svg4";
import SVG5 from "../../../assets/svg5";
import NotStartIcon from "../../../assets/not_start.png";
import css from "./index.module.less";

const ApprovalView = ({ data }) => {
  const renderContent = (item) => {
    return (
      <div className={css.content}>
        <div className={css.fontNumber}>{item.index}</div>
        {item.index !== 1 ? <img width={40} src={NotStartIcon} /> : <SVG4 />}
        <div className={css.fontColor}>{item.name}</div>
      </div>
    );
  };

  return (
    <div className={css.appr_view}>
      {data.map((el, index) => {
        return (
          <>
            <div
              className={classNames(css.card, {
                [css.not_start]: el.index !== 1,
              })}
            >
              <div className={css.underBg} />
              {renderContent(el)}
            </div>
            {index !== data.length - 1 && <SVG5 />}
          </>
        );
      })}
    </div>
  );
};

export default ApprovalView;
