import React, { useState } from "react";
import { lotteryData } from "./mock";
import css from "./index.module.less";

const CIRCLE_ANGLE = 360;
const BIGSIZE = 24;
let angleList = []; // 记录每个奖的位置

//每个奖增加style
const format = (list) => {
  const l = list.length;
  // 计算单个奖项所占的角度
  const average = CIRCLE_ANGLE / l; //60
  const half = average / 2; //30
  const rightBig = l == 2 ? "50" : "0";
  const heightBig = l <= 3 ? "100" : "50";
  const topBig = l == 3 ? "-50" : "0";
  const skewMain = l <= 2 ? 0 : (-(l - 4) * 90) / l;
  list.forEach((item, i) => {
    // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
    const angle = -(i * average + half);
    const bigAge = l > 2 ? (i * 360) / l : "0";
    item.style = {
      transform: `rotate(${-angle}deg)`,
      width: `${(100 / l) * 2}%`,
      marginLeft: `${-100 / l}%`,
      fontSize: `${BIGSIZE - l}px`,
    };
    //这是给每一个转盘背景新增的样式
    item.style2 = {
      transform: `rotate(${bigAge}deg) skewY(${skewMain}deg)`,
      right: `${rightBig * i}%`,
      height: `${heightBig}%`,
      top: `${topBig}%`,
      width: `${l == 1 ? 100 : 50}%`,
      background: `${item.color}`,
    };
    // 记录每个奖项的角度范围
    angleList.push(angle);
  });
  return list;
};

const LotterySpin = (props) => {
  let gift_id = 3; //中奖ID
  let prizeList = format(lotteryData); //有样式的奖品列表
  let index = ""; //抽中的是第几个奖品

  const [rotateAngle, setRotateAngle] = useState(0); // 初始角度
  const [isRotating, setIsRotating] = useState(false); //为了防止重复点击

  //抽奖
  function prizeRoll() {
    if (isRotating) return false;
    gift_id = Math.floor(1 + Math.random() * prizeList.length);
    console.log(gift_id);
    prizeList.forEach((item, i) => {
      if (item.id == gift_id) index = i; //判断中奖的位置
    });
    rotating();
  }

  //转盘转动角度
  function rotating() {
    setIsRotating(true);
    const config = {
      duration: 5000,
      circle: 8,
      mode: "ease-in-out",
    };
    // 计算角度
    const angle =
      // 初始角度
      rotateAngle +
      // 多旋转的圈数
      config.circle * CIRCLE_ANGLE +
      // 奖项的角度
      angleList[index] -
      (rotateAngle % CIRCLE_ANGLE);
    setRotateAngle(angle);
    // 旋转结束后，允许再次触发
    setTimeout(() => {
      setIsRotating(false);
      console.log("旋转结束");
    }, config.duration + 500);
  }

  const renderLuckyWheel = () => {
    return prizeList.map((el, index) => {
      return (
        <div
          className={css.luckWhellSector}
          style={el.style2}
          key={index}
        ></div>
      );
    });
  };

  const renderPrizeList = () => {
    return prizeList.map((el, index) => {
      return (
        <div className={css.prizeItem} style={el.style} key={index}>
          <div>{prizeList[index].prize_name}</div>
          <div style={{ paddingTop: "5px" }}>
            <img src={prizeList[index].img} style={{ width: "45%" }} />
          </div>
        </div>
      );
    });
  };
  return (
    <div className={css.luckBg}>
      <div className={css.luckWhellBg}>
        <div
          className={`${css.luckWhellBgMain} ${css.rotateStyle}`}
          style={{ transform: `rotate(${rotateAngle}deg)` }}
        >
          {renderLuckyWheel()}
        </div>
        <div className={css.wheelMain}>
          <div
            className={`${css.prizeList}  ${css.rotateStyle}`}
            style={{ transform: `rotate(${rotateAngle}deg)` }}
          >
            {renderPrizeList()}
          </div>
          <div className={css.prizePoint} onClick={() => prizeRoll()}></div>
        </div>
      </div>
    </div>
  );
};

export default LotterySpin;
