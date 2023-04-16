import React, { useState } from "react";
import { Checkbox } from "antd";
import TitleTip from "../../../../../components/TitleTip";
import css from "./index.module.less";

const opts = ["Need me handle", "Related to me", "Created by me"];
const yearOptions = ["2023", "2022", "2021", "2020", "2019", "2018", "2017"];

const TitleParts = (props) => {
  const [checkedYear, setCheckedYear] = useState("all");
  const [checkFilter, setCheckFilter] = useState(false);
  const [selectSyl, setSelectSyl] = useState({});

  //点击年份
  const handleFilterYear = (value) => {
    setSelectSyl({ display: "none" });
    setCheckedYear(value);
    setTimeout(() => {
      setSelectSyl({});
    }, 1e3);
    setCheckFilter(true);
  };

  //渲染筛选年份
  const render = () => {
    return (
      <div className={css.selectBox} style={selectSyl}>
        <div className={css.selectContent}>
          <ul>
            {yearOptions.map((item, index) => {
              return (
                index >= 3 && (
                  <li
                    key={index}
                    onClick={() => handleFilterYear(item)}
                    className={`${checkedYear == item ? css.current : ""}`}
                  >
                    {item}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={css.wrapper}>
      <div style={{ marginLeft: "6px" }}>
        <TitleTip>Stage Info</TitleTip>
      </div>

      <div className={css.filterArea}>
        <div className={css.left}>
          Total <span>{"11"}</span> Infomation
        </div>

        <div className={css.right}>
          {/* checkbox */}
          <div className={css.check_wrapper}>
            <Checkbox.Group
              options={opts}
              // defaultValue={["Apple"]}
              // onChange={onChange}
            />
          </div>

          {/* filter by year */}
          <div className={css.yearFilter}>
            <span className={css.flag}>Year：</span>
            <span
              className={`${css.all} ${
                checkedYear == "all" ? css.current : ""
              }`}
              onClick={() => (setCheckedYear("all"), setCheckFilter(false))}
            >
              All
            </span>

            <div className={css.filtrate}>
              <div
                className={`${css.textArea} ${checkFilter ? css.current : ""}`}
              >
                <svg className={`${css.icon} st-iconfont`} aria-hidden="true">
                  <use xlinkHref="#st-icon-shaixuan"></use>
                </svg>
                <span className={css.text}>Filter</span>
                {render()}
              </div>
            </div>

            {/* 最近的三年 */}
            <div className={css.yearList}>
              {yearOptions.map((item, index) => {
                return (
                  index < 3 && (
                    <span
                      onClick={() => (
                        setCheckedYear(item), setCheckFilter(false)
                      )}
                      className={`${css.term} ${
                        checkedYear == item ? css.current : ""
                      }`}
                      key={index}
                    >
                      {item}
                    </span>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleParts;
