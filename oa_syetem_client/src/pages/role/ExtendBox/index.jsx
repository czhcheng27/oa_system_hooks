import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Icon from "../../../components/Icon/index";
// import Icon from "@/components/Icon/index";
import css from "./index.module.less";

const ExtendBox = (props) => {
  return (
    <div className={css.moduleBox}>
      <div className={css.item}>
        <div>
          <Icon iconName="icon-wechat-fill" />
        </div>
      </div>

      <div className={css.item}>
        <div>
          <Icon iconName="icon-douyin" />
        </div>
      </div>

      <div className={css.item}>
        <div>
          <Icon iconName="icon-google" />
        </div>
      </div>

      <div className={css.item}>
        <div>
          <Icon iconName="icon-steam" />
        </div>
      </div>
    </div>
  );
};

export default ExtendBox;
