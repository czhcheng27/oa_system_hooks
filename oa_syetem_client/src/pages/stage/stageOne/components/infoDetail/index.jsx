import React from "react";
import AutoTooltip from "src/components/AutoTooltip";
import Ellipsis from "../../../../../components/Ellipsis";
import { taskSatus } from "../../../../../utils";
import css from "./index.module.less";

const InfoDetail = ({ data, warnDay }) => {
  return (
    <div className={css.box_wrap}>
      {/* left */}
      <div className={css.left}>
        <div className={css.infoArea}>
          <p className={css.projectName}>
            <Ellipsis content={data.projectNo}>
              <span>{data.projectNo}</span>
            </Ellipsis>
          </p>
          <span className={css.setChangeNum}>{data.ecrNum}</span>
          <span
            className={css.batchproductionChange}
          >{`【${data.batchproductionChange}】`}</span>
          {data.isUrgent == "紧急" && <i className={css.icon}></i>}
        </div>
        <p className={css.name}>
          <AutoTooltip txt={data.ecrName}>{data.ecrName}</AutoTooltip>
        </p>
      </div>

      {/* right */}
      <div className={css.right}>
        {(data.status == 1 || data.status == 2) && (
          <span
            className={`${css[taskSatus(data.daysOverdue, warnDay)["name"]]}`}
          >
            {data.daysOverdue < 0 ? "逾期" : "剩余"}{" "}
            {Math.abs(data.daysOverdue)}
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoDetail;
