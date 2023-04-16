import React from "react";
import { Tooltip } from "antd";
import { initChangeState } from "../../const";
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
      <div></div>
    </div>
  );
};

export default EntranceComp;
