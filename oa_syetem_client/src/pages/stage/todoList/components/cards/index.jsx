import React from "react";
import { Typography, Tooltip } from "antd";
import css from "./index.module.less";

const { Text } = Typography;

const status = {
  0: {
    label: "Approval Pending",
    color: "#70a4f7",
  },
  1: {
    label: "Approved",
    color: "#00B042",
  },
  2: {
    label: "Approval rejected",
    color: "#FF5119",
  },
  null: {
    label: "Approval Pending",
    color: "#70a4f7",
  },
};

const Cards = ({ props }) => {
  const { isUrgent, ecrName, creator, category, approvalStatus, ecrNum } =
    props;
  return (
    <div className={css.card_box}>
      <div
        className={css.circle}
        style={{ backgroundColor: isUrgent == "紧急" ? "#F64041" : "#00b042" }}
      >
        {isUrgent == "紧急" ? "Urgent" : "Normal"}
      </div>
      <div className={css.card_content}>
        <div className={css.textBig}>{ecrNum}</div>
        <Tooltip title={ecrName}>
          <div className={css.textBig}>{ecrName}</div>
        </Tooltip>
        <p className={css.text}>Director：{creator}</p>
        <p className={css.text}>
          <Tooltip>{category}</Tooltip>
        </p>
        <div className={css.status_text}>
          <Text
            style={{
              color: "#FFFFFF",
              backgroundColor: status[approvalStatus].color,
              padding: "2px 8px 3px 8px",
              borderRadius: "0px 10px 10px 0px",
            }}
          >
            {status[approvalStatus].label}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Cards;
