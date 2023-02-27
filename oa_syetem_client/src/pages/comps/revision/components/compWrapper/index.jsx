import React, { useState, useEffect } from "react";
import DelPop from "../../delPop";
import { colorCompMap } from "../../mapConst";
import css from "./index.module.less";

const CompWrapper = ({ prop: { props, onDelete }, children }) => {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  return (
    <div
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <div className={css.left}>
        <img
          src={require(`../areaLeft/comps/icons/${props.comType}.png`).default}
          alt={props.desc}
        />
        <p style={colorCompMap[props.comType].midTxt}>{props.desc}</p>
      </div>
      <div className={css.right}>{children}</div>
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
