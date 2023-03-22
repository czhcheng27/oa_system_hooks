import React from "react";
import css from "./index.module.less";

const TriDialogBox = ({ content, boxStyle = {}, marginTop = "16px" }) => {
  const styleObj = Object.assign({ marginTop }, boxStyle);
  return (
    <div
      className={css.centerBox}
      // style={{ marginTop }}
      style={styleObj}
    >
      {
        <div
          className={css.centerContent}
          //   dangerouslySetInnerHTML={{ __html: obj.memo?.nodeRemark }}
        >
          {content}
        </div>
      }
    </div>
  );
};

export default TriDialogBox;
