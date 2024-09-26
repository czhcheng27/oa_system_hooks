import React from "react";
import Icon from "src/components/Icon";
import css from "./index.module.less";

const ExtendBox = () => {
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
