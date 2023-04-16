import React from "react";
import { Tooltip } from "antd";
import { exhibition, initChangeState, quickEntry } from "../../const";
import css from "./index.module.less";

const EntranceComp = (props) => {
  return (
    <div>
      {/* top btns */}
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

      {/* bot */}
      <div className={css.uniteArea}>
        {/* bot two gif parts */}
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

        {/* bot quick entrance */}
        <div className={css.quickEntryArea}>
          <p className={css.tip}>Quick Entrance</p>
          <ul>
            {quickEntry.map((item, index) => {
              return (
                <li
                  className={`${css.item} ${css[item["name"]]}`}
                  key={index}
                  //   onClick={() => {
                  //     item.pageUrl && skip(item.pageUrl);
                  //   }}
                >
                  <p className={css.icon}></p>
                  <p className={css.text}>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntranceComp;
