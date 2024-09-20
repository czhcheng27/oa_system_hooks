import React from "react";
import css from "./index.module.less";

interface TriDialogBoxProps {
  content: string;
  boxStyle: object;
  marginTop: string;
  left: string;
  borderColor: string;
  background: string;
}

const TriDialogBox: React.FC<TriDialogBoxProps> = ({
  content,
  boxStyle = {},
  marginTop = "16px",
  left = "15px",
  borderColor = "#d4e1f6",
  background = "#f2f5fb",
}) => {
  const styleObj = Object.assign(
    { marginTop, border: `1px solid ${borderColor}`, background },
    boxStyle
  );
  return (
    <div className={css.centerBox}>
      {
        <div
          style={styleObj}
          className={css.centerContent}
          //   dangerouslySetInnerHTML={{ __html: obj.memo?.nodeRemark }}
        >
          <span
            className={css.pseudo_ele}
            style={{
              left,
              background,
              borderLeft: `1px solid ${borderColor}`,
              borderTop: `1px solid ${borderColor}`,
            }}
          />
          {content}
        </div>
      }
    </div>
  );
};

export default TriDialogBox;
