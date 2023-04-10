import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const StageFlowBar = ({
  data,
  currentIndex,
  setChangeStatus,
  warnNum,
  isHover,
}) => {
  const barBoxRef = useRef(null);
  const barRef = useRef(null);
  const [statusW, setStatusW] = useState(0);
  const [barStyle, setBarStyle] = useState({});

  //标识
  const toFlag = (daysOverdue) => {
    if (setChangeStatus == 0) {
      if (daysOverdue < 0) {
        //超期
        return css.overdue;
      } else if (daysOverdue <= warnNum) {
        //即将超期（提醒）
        return css.warn;
      } else {
        //进行中
        return css.normal;
      }
    } else {
      return css.done;
    }
  };
  useEffect(() => {
    if (setChangeStatus == 0 && currentIndex != -1) {
      let step = 100 / data.length;
      let total = step * (currentIndex + 1) - step / 2;
      setBarStyle({ width: `${total}%` });
      setStatusW(((100 / total) * step) / 2);
    } else {
      setBarStyle({ width: "100%" });
    }
  }, []);

  return (
    <div className={css.barArea}>
      <div className={css.barBox}>
        <div
          className={`${css.bar} 
          ${
            setChangeStatus == 0
              ? toFlag(data[currentIndex]["daysOverdue"])
              : css.done
          } 
          ${isHover && css.hover}`}
          style={barStyle}
        >
          <>
            <span
              className={css.status}
              style={{ width: `${statusW}%` }}
            ></span>
            <span className={css.icon}></span>
          </>
        </div>
      </div>
    </div>
  );
};

export default StageFlowBar;
