import React, { useState, useEffect, forwardRef } from "react";
import { Progress, Button } from "antd";
import { allFalseLoading } from "../../mockData";
import css from "./index.module.less";

const LoadingBg = (props, ref) => {
  const [loading, setLoading] = useState(true); // 接口加载状态
  const [percent, setPercent] = useState(0);
  const [handleOpacity, setHandleOpacity] = useState(false); // 控制透明度
  const [handleVisible, setHandleVisible] = useState(true); // 控制显隐

  useEffect(() => {
    let timer;

    if (loading) {
      setHandleVisible(true);
      setPercent(0); // 初始化

      setTimeout(() => {
        setHandleOpacity(true);
      }, 10);

      let current = 0;
      const startTime = Date.now();
      const duration = 3000; // 总时长 3 秒

      const stepRandom = () => {
        const elapsed = Date.now() - startTime;
        const remaining = duration - elapsed;

        // 到达或超过 3 秒后强制完成
        if (remaining <= 0 || current >= 100) {
          setPercent(100);
          setTimeout(() => setLoading(false), 300);
          return;
        }

        // 每轮随机一个增量（2 ~ 8）和间隔时间（50 ~ 150ms）
        const increment = Math.random() * 6 + 2;
        const delay = Math.random() * 100 + 50;

        current = Math.min(100, current + increment);
        setPercent(Math.round(current));

        timer = setTimeout(stepRandom, delay);
      };

      timer = setTimeout(stepRandom, 100); // 初始延迟
    } else {
      setHandleOpacity(false);
      setTimeout(() => {
        setHandleVisible(false);
      }, 800);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return handleVisible ? (
    <div
      className={`${css.moduleLoading} ${percent > 20 ? css.moveBegin : null}`}
      style={{ opacity: handleOpacity ? 1 : 0 }}
    >
      <div className={css.loadingTxt}>LOADING</div>
      <div className={css.progressWrapper}>
        <Progress
          strokeColor={{
            "0%": "#09fcf9",
            "100%": "#09fcf9",
          }}
          percent={percent}
        />
      </div>
    </div>
  ) : null;
};

export default forwardRef(LoadingBg);
