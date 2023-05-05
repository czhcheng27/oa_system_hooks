import React from "react";
import { Tooltip } from "antd";
import { exhibition, initChangeState, quickEntry } from "../../const";
import css from "./index.module.less";
import { useRef } from "react";
import AprDetWrapper from "./components/aprDetWrapper";
import DrawerTwo from "./components/drawerTwo";

const EntranceComp = (props) => {
  const drawer1Ref = useRef();
  const drawer2Ref = useRef();

  const drawerRefMap = {
    0: drawer1Ref,
    1: drawer2Ref,
  };

  return (
    <div>
      {/* top btns */}
      <ul className={css.setChangeStateArea}>
        {initChangeState.map((item, index) => {
          return (
            <Tooltip key={index}>
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
                  onClick={() => {
                    drawerRefMap[index].current.openHandle();
                  }}
                >
                  <p className={css.icon}></p>
                  <p className={css.text}>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <AprDetWrapper ref={drawer1Ref} />
      <DrawerTwo ref={drawer2Ref} />
    </div>
  );
};

export default EntranceComp;
