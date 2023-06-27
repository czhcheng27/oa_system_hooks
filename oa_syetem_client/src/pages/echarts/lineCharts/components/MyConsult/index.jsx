import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Button, message } from "antd";
import { nextTick } from "../../../../../utils/index";
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
    initRightClickFun();
    const boxes = document.getElementById("myConcult_outbox");
    const myObserver = new ResizeObserver((entries) => {
      listenDom();
    });
    boxes && myObserver.observe(boxes);
  }, [curObj]);

  const listenDom = () => {
    const ele = document.getElementById("myConcult_outbox")?.clientWidth;
    const eleType = document.getElementById(
      "myConcult_btns_wrapper"
    )?.clientWidth;
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

  const initRightClickFun = () => {
    const areaEl = document.querySelector(".clickArea");
    const mask = document.querySelector(".contextmenuMask");
    const contentEl = document.querySelector(".contextmenuContent");

    const onContextMenu = (e) => {
      e.preventDefault();
      const rect = contentEl.getBoundingClientRect();
      console.log(rect);
      const { x, y } = adjustPos(e.clientX, e.clientY, rect.width, rect.height);
      showContextMenu(x, y);
    };

    // 调整 x 和 y 的位置。因为 contextmenu 有可能在窗口外部。
    /**
     *
     * @param {number} x 将要设置的菜单的左上角坐标 x
     * @param {number} y 左上角 y
     * @param {number} w 菜单的宽度
     * @param {number} h 菜单的高度
     * @returns {x, y} 调整后的坐标
     */
    const adjustPos = (x, y, w, h) => {
      const PADDING_RIGHT = 6; // 右边留点空位，防止直接贴边了，不好看
      const PADDING_BOTTOM = 6; // 底部也留点空位
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      if (x + w > vw - PADDING_RIGHT) x -= w;
      if (y + h > vh - PADDING_BOTTOM) y -= h;
      return { x, y };
    };

    const showContextMenu = (x, y) => {
      contentEl.style.left = x + "px";
      contentEl.style.top = y + "px";
      mask.style.display = "";
    };

    const hideContextMenu = () => {
      mask.style.display = "none";
      contentEl.style.top = "99999px";
      contentEl.style.left = "99999px";
    };

    nextTick(() => {
      // 阻止指定元素下的菜单事件
      areaEl.addEventListener("contextmenu", onContextMenu, false);

      // 点击蒙版，隐藏
      mask.addEventListener("mousedown", hideContextMenu, false);

      // 点击菜单，隐藏
      contentEl.addEventListener("click", hideContextMenu, false);
    });
  };

  // customize right click menu
  const renderMenu = () => {
    return (
      <div className={`${css.contextmenuContent} contextmenuContent`}>
        <div className={css.list}>
          <div className={css.item} onClick={() => menuClick("I")}>
            customize I
          </div>
          <div className={css.item} onClick={() => menuClick("II")}>
            customize II
          </div>
          <div className={css.item} onClick={() => menuClick("III")}>
            customize III
          </div>
        </div>
      </div>
    );
  };

  const menuClick = (code) => {
    message.success(`You click customize${code}`);
  };

  return (
    <div className={css.moduleBox}>
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

      {/* content area */}
      <div className={css.contentBox}>
        <div
          class={`${css.contextmenuMask} contextmenuMask`}
          style={{ display: "none" }}
        ></div>
        <div className={`${css.clickArea} clickArea`}>
          right click on this area
        </div>
        {renderMenu()}
      </div>

      {showPageBtns && renderPageBtns()}
    </div>
  );
};

export default MyConsult;
