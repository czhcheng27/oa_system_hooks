import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Button } from "antd";
import css from "./index.module.less";
import classNames from "classnames";

const btnArr = [
  {
    idx: 0,
    title: "Title1",
  },
  {
    idx: 1,
    title: "Title2",
  },
  {
    idx: 2,
    title: "Title3",
  },
  {
    idx: 3,
    title: "Title4",
  },
];

const MyConsult = (props) => {
  const [curObj, setCurObj] = useState(btnArr[0]);
  const [showPageBtns, setShowPageBtns] = useState(false);
  const [moveLeft, setMoveLeft] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);

  const btnClick = (index) => {
    setCurObj(btnArr[index]);
  };

  useEffect(() => {
    listenDom();
    const boxes = document.getElementById("myConcult_outbox");
    const myObserver = new ResizeObserver((entries) => {
      listenDom();
    });
    boxes && myObserver.observe(boxes);
  }, [curObj]);

  const listenDom = () => {
    const ele = document.getElementById("myConcult_outbox").clientWidth;
    const eleType = document.getElementById(
      "myConcult_btns_wrapper"
    ).clientWidth;
    // console.log("ele, eleType", ele, eleType);
    setShowPageBtns(ele < eleType);
    setTypeIndex(showPageBtns != ele < eleType ? 0 : typeIndex);
    setMoveLeft(showPageBtns != ele < eleType ? 0 : moveLeft);
  };

  const renderPageBtns = () => {
    return (
      <>
        <div className={classNames(css.pageButtonBox, css.pageLeft)}>
          <div
            className={getPageButtonClass(-1)}
            onClick={() => moveAction(-1)}
          ></div>
        </div>
        <div className={classNames(css.pageButtonBox, css.pageRight)}>
          <div
            className={getPageButtonClass(1)}
            onClick={() => moveAction(1)}
          ></div>
        </div>
      </>
    );
  };

  const getPageButtonClass = (type) => {
    const disabled =
      (type < 0 && !typeIndex) || (type > 0 && typeIndex == btnArr.length - 1);
    return classNames(css.pageButton, disabled ? css.pageDisabledButton : null);
  };

  const moveAction = (num) => {
    let movePx = moveLeft;
    if (num < 0 && typeIndex) {
      const ele = document.getElementsByClassName(
        "myConsult_btn" + (typeIndex - 1)
      )[0];
      const width = ele?.offsetWidth || 0;
      movePx -= width + 11;
    } else if (num > 0 && typeIndex < btnArr.length - 1) {
      const ele = document.getElementsByClassName(
        "myConsult_btn" + typeIndex
      )[0];
      const width = ele?.offsetWidth || 0;
      movePx += width + 11;
    } else {
      return;
    }
    setTypeIndex(typeIndex + num);
    setMoveLeft(movePx);
  };

  return (
    <div className={css.moduleBox}>
      {/* center */}
      <div
        id="myConcult_outbox"
        className={`${css.btns_outwrapper} ${
          showPageBtns ? css.hasPageBtns : null
        }`}
      >
        <div
          id="myConcult_btns_wrapper"
          className={css.btns_wrapper}
          style={{ marginLeft: moveLeft * -1 + "px" }}
        >
          {btnArr.map((el, index) => {
            return (
              <Button
                key={index}
                className={{
                  [css.btn]: true,
                  [css.act_btn]: el.idx == curObj.idx,
                  [`myConsult_btn${index}`]: true,
                }}
                onClick={() => btnClick(index)}
              >
                <p>{el.title}</p>
              </Button>
            );
          })}
        </div>
      </div>
      {showPageBtns && renderPageBtns()}
    </div>
  );
};

export default MyConsult;
