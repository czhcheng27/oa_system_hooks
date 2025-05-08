import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import DelPop from "../delPop";
import { colorCompMap } from "../../mapConst";
import css from "./index.module.less";

const CompWrapper = ({ prop: { props, onDelete, drag }, children }) => {
  const isDragging = useSelector((s) => s.rdcDragStart);

  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  return (
    <div
      {...drag}
      className={css.wrapper}
      style={colorCompMap[props.comType].midBg}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <div className={css.label}>
        <img
          src={require(`../areaLeft/comps/icons/${props.comType}.png`)}
          alt={props.desc}
        />
        <p style={colorCompMap[props.comType].midTxt}>{props.name}</p>
      </div>
      <div className={css.content}>{children}</div>

      {isDragging && <div className={classNames(css.overlay)} />}

      <DelPop
        props={props}
        onDelete={onDelete}
        setBtnClicked={setBtnClicked}
        hoverStatus={hoverStatus}
        setHoverStatus={setHoverStatus}
      />
    </div>
  );
};

export default CompWrapper;
