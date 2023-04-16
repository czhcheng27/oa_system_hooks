import React from "react";
import { Tooltip } from "antd";
import { exhibition, initChangeState } from "../../const";
import css from "./index.module.less";

const EntranceComp = (props) => {
  return (
    <div>
      <ul className={css.setChangeStateArea}>
        {initChangeState.map((item, index) => {
          return (
            <Tooltip key={index} title={item.tips}>
              <li
                className={`${css.item} ${css[item["name"]]}`}
                //   onClick={() => {
                //     index != 3 && index != 4 && hanldeSkip(item);
                //   }}
              >
                <div className={css.iconBox}>
                  <span className={css.icon}></span>
                </div>
                <div className={css.textBox}>
                  <span className={css.num}>{item.num}</span>
                  <p className={css.text}>{item.text}</p>
                </div>
              </li>
            </Tooltip>
          );
        })}
      </ul>
      <div className={css.uniteArea}>
        <ul className={css.exhibitionArea}>
          {exhibition.map((item, index) => {
            return (
              <li
                className={`${css.item} ${css[item["name"]]}`}
                key={index}
                // onClick={() => {
                //   index = 1 && hanldeSkip(item);
                // }}
              >
                <span className={css.tip}>{item.tip}</span>
                <div className={css.box}>
                  <span className={css.content}>{item.num}</span>
                  <span className={css.text}>{item.text}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={css.quickEntryArea}></div>
      </div>
    </div>
  );
};

export default EntranceComp;
