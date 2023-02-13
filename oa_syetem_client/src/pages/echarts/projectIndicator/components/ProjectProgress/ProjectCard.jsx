import React, { Component } from "react";
import classNames from "classnames";
import moment from "moment";
import managerIcon from "./img/manager.png";
import css from "./projectCard.module.less";

const ProjectCard = ({ data, index, selectd, isLast, onClick }) => {
  return (
    <div
      className={classNames({
        [css.project_card]: true,
        [css.selectd]: selectd,
        [css.last]: isLast,
      })}
      onClick={() => {
        onClick && onClick(index);
      }}
    >
      <div className={css.project_info}>
        <div className="row">
          <div className="project_no" title={data.projectNo}>
            {data.projectNo}
          </div>
          <div className="project_name" title={data.projectName}>
            {data.projectName}
          </div>
          <div className="project_sop" title={data.toSopDuration}>
            SOP{" "}
            <i>
              {data.toSopDuration}
              {data.temporalUnit === "MONTHS" ? "Mon" : "Day"}
            </i>
          </div>
        </div>
        <div className="row">
          <div className="project_manager" title={data.projectManagerName}>
            <img src={managerIcon} />
            Manager：{data.projectManagerName}
          </div>
          <div className="cur_node" title={data.currentNodeName}>
            Node：{data.currentNodeName}
          </div>
        </div>
      </div>
      <div className={css.project_milepost_box}>
        <div className={css.project_milepost}>
          <div className="nodes">
            {data.nodes &&
              data.nodes.map((item) => {
                return (
                  <div
                    key={"node" + item.id}
                    className={classNames({
                      item: true,
                      current: item.currentFlag,
                      adopt: item.nodeFinishFlag === "Y",
                      overdue:
                        (item.currentFlag || item.nodeFinishFlag === "Y") &&
                        item.delayFlag,
                    })}
                  >
                    <div className="text">{item.nodeName}</div>
                    <div className="psc_icon_box">
                      <div className={css.pscIcon}>
                        <div
                          className={
                            moment(item.nodeTime).format("YYYY-MM") ===
                            moment().format("YYYY-MM")
                              ? css.slectIcon
                              : ""
                          }
                        ></div>
                        {item.nodeShape == "diamond" && (
                          <div
                            className={css.iconColor}
                            style={{ background: "#" + item.nodeColor }}
                          ></div>
                        )}
                        {item.nodeShape == "diamond" && (
                          <div className={css.iconText}>{item.nodeCode}</div>
                        )}
                        {item.nodeShape != "diamond" && (
                          <div
                            style={{ "--color": "#" + item.nodeColor }}
                            className={
                              item.nodeShape === "starFive"
                                ? css.starFive
                                : css.iconMarket
                            }
                          ></div>
                        )}
                      </div>
                    </div>
                    <div className="date">
                      {moment(item.nodeTime).format("YY.MM.DD")}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="axis">
            {data.nodes &&
              data.nodes.map((item, index) => {
                let divisor = 1;
                if (index === 0 || index === data.nodes.length - 1) {
                  divisor = 2;
                }
                return (
                  <div
                    key={"bar" + item.id}
                    className={classNames({
                      bar: true,
                      current: item.currentFlag,
                      adopt: item.nodeFinishFlag === "Y",
                      overdue:
                        (item.currentFlag || item.nodeFinishFlag === "Y") &&
                        item.delayFlag,
                      is_last_adopt_node: data.nodes[index + 1]?.currentFlag,
                      next_node_overdue:
                        item.nodeFinishFlag === "Y" &&
                        data.nodes[index + 1]?.delayFlag,
                      is_last: !data.nodes[index + 1],
                    })}
                    style={{
                      width: `calc(72px + (100% - (${
                        data.nodes.length
                      } * 72px)) / ${data.nodes.length - 1} / ${divisor})`,
                    }}
                  >
                    {item.currentFlag ? <div className="people"></div> : null}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
