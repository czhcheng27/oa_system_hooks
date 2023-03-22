import React from "react";
import css from "./index.module.less";

const TriDialogBox = ({ content, marginTop = "16px" }) => {
  return (
    <div className={css.centerBox} style={{ marginTop }}>
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
