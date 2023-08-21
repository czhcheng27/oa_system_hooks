import React, { useEffect } from "react";
import css from "./index.module.less";

const CodeFlow = (props) => {
  // 获取窗口尺寸
  const width = window.innerWidth * devicePixelRatio,
    height = window.innerHeight * devicePixelRatio;

  // 字体大小
  const fontSize = 20 * devicePixelRatio;
  // 列宽
  const columnWidth = fontSize;

  useEffect(() => {
    const cvs = document.getElementById("codeFlowBg");
    cvs && initFunc(cvs);
  }, []);

  const initFunc = (cvs) => {
    // 设置canvas尺寸为窗口尺寸
    cvs.height = height;
    cvs.width = width;

    // 获取绘制上下文
    const ctx = cvs.getContext("2d");

    // 列数
    const columnCount = Math.floor(width / columnWidth);
    // 每一列下一个文字是第几个文字
    const nextChar = new Array(columnCount).fill(0);

    setInterval(() => draw(ctx, columnCount, nextChar), 30);
  };

  // 画一行文字
  const draw = (ctx, columnCount, nextChar) => {
    ctx.fillStyle = "rgba(240,240,240,0.1)";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < columnCount; i++) {
      ctx.fillStyle = getRandomColor();
      const char = getRandomChar();
      ctx.font = `${fontSize}px Arial`;
      const x = i * columnWidth;
      const s = nextChar[i];
      const y = (s + 1) * fontSize;
      ctx.fillText(char, x, y);
      if (y > height && Math.random() > 0.99) {
        nextChar[i] = 0;
      } else {
        nextChar[i]++;
      }
    }
  };

  // 获取随机颜色
  const getRandomColor = () => {
    const fontColors = [
      "#33B5E5",
      "#0099CC",
      "#AA66CC",
      "#9933CC",
      "#99CC00",
      "#669900",
      "#FFBB33",
      "#FF8800",
      "#FF4444",
      "#CC0000",
    ];
    return fontColors[Math.floor(Math.random() * fontColors.length)];
  };

  const getRandomChar = () => {
    const str = "console.log(Welcome, Michael)";
    return str[Math.floor(Math.random() * str.length)];
  };
  return (
    <div className={css.moduleBox}>
      <canvas id="codeFlowBg"></canvas>
    </div>
  );
};

export default CodeFlow;
