import React, { useState, useEffect, useRef } from "react";
import { useSize } from "ahooks";
import classNames from "classnames";
import TitleTip from "src/components/TitleTip";
import { boardPropArray, cssArray, pinStyleMap } from "./const";
import { mockBoardList } from "./mock";
import css from "./index.module.less";

const BlackBoard = (props) => {
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const { width: wrapWidth = 0 } = useSize(wrapRef) || {};
  const { width: contentWidth = 0 } = useSize(contentRef) || {};

  const [boardList, setBoardList] = useState(mockBoardList);
  const [eachRowNum, setEachRowNum] = useState(5); // 每排几个
  const [fillArrayNum, setFillArrayNum] = useState(10); // 数组总数

  const elms = document.getElementsByClassName("tsc_dash_eachOne");

  useEffect(() => {
    for (let i = 0; i <= elms.length; i++) {
      elms[i] &&
        (elms[i].addEventListener("animationend", function (e) {
          elms[i].classList.remove("rotateAnimate");
        }),
        elms[i].addEventListener("mouseover", function (e) {
          elms[i].classList.add("rotateAnimate");
        }));
    }
  }, [elms]);

  useEffect(() => {
    resizeFunc();
  }, [wrapWidth, contentWidth]);

  const resizeFunc = () => {
    const elm = document.getElementById("boardBox");
    addCssFunc(elm, wrapWidth);
  };

  const addCssFunc = (elm, width) => {
    const obj = boardPropArray.find((x) => width > x.min && width <= x.max);
    if (!obj) return;
    filterCss(elm, obj.code);
    setEachRowNum(obj.num);
    const no = Math.ceil(boardList.length / obj.num);
    setFillArrayNum((no < 2 ? 2 : no) * obj.num);
  };

  const filterCss = (elm, name) => {
    for (let i = 0; i < cssArray.length; i++) {
      if (cssArray[i] === name) {
        elm.classList.add(name);
      } else {
        elm.classList.remove(cssArray[i]);
      }
    }
  };

  // 渲染底部小黑板
  const renderBoardContent = (el, index) => {
    return (
      <>
        <div className={css.title}>{el.name}</div>
        <div className={css.list}>
          <div>
            <div style={{ color: "#1FD0A3", fontSize: "18px" }}>
              {el.listedCount}
            </div>
            <div>NumA</div>
          </div>
          <div>
            <div style={{ color: "#FF9300", fontSize: "18px" }}>
              {el.listingCount}
            </div>
            <div>NumB</div>
          </div>
          <div>
            <div style={{ color: "#0080FF", fontSize: "18px" }}>
              {el.usedCount}
            </div>
            <div>NumC</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={css.modulebox}>
      <TitleTip>Blackboard</TitleTip>

      <div className={css.contentBox}>
        <div ref={wrapRef} className={css.boardBox} id="boardBox">
          {fillArray(boardList, fillArrayNum).map((el, index) => {
            return (
              <div className={`${css.eachBoard}`} key={index}>
                <div
                  className={classNames({
                    ["tsc_dash_eachOne"]: true,
                    [css[pinStyleMap[eachRowNum][index]]]: !!el,
                    [css.pinCenter]: !!el && !pinStyleMap[eachRowNum][index],
                  })}
                >
                  <div className={css.clickBox}></div>
                  {el && renderBoardContent(el, index)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlackBoard;

const fillArray = (data, num) => {
  if (data.length < num) {
    const fillArr = Array(num - data.length).fill(null);
    data = data.concat(fillArr);
  }
  return data;
};
