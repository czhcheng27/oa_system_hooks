import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const RotateVehicle = (props) => {
  return (
    <div className={css.moduleBox}>
      <div className={css.imgContent}>
        <img
          src={require("../../assets/beatle/beatle1.png").default}
          alt="beatles"
        />
      </div>
      <div className={css.rotateDeg}></div>
    </div>
  );
};

export default RotateVehicle;
