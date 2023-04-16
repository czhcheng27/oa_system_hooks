import React from "react";
import AutoTooltip from "../../../../../components/AutoTooltip";
import css from "./index.module.less";

const ProjectItem = ({ data, selectProject, clickProjectCard }) => {
  const { projectId: selPjId, status } = selectProject;
  const {
    projectId,
    projectNo,
    fbomCarSeries,
    projectName,
    doingCount,
    overdueCount,
    okCount,
  } = data || {};

  const mapData = [
    { label: "ongoing", value: doingCount },
    { label: "overdue", value: overdueCount },
    { label: "complete", value: okCount },
  ];

  return (
    <div className={css.projectItem}>
      {data ? (
        <div
          className={`${css.content} ${projectId == selPjId ? css.sel : ""}`}
          onClick={(e) => clickProjectCard(e, data)}
        >
          {/* top */}
          <div className={css.top}>
            <div className={css.pic}>
              <svg className={`${css.icon} st-iconfont`} aria-hidden="true">
                <use xlinkHref="#st-icon-wenjianjia"></use>
              </svg>
            </div>
            <span className={css.text}>
              <AutoTooltip txt={projectNo}>{projectNo}</AutoTooltip>
            </span>
          </div>

          {/* middle */}
          <div className={css.middle}>
            <p className={css.title}>
              <AutoTooltip txt={projectName}>{projectName}</AutoTooltip>
            </p>
            <div className={css.series}>
              <svg className={`${css.icon} st-iconfont`} aria-hidden="true">
                <use xlinkHref="#st-icon-project"></use>
              </svg>
              <span className={css.text}>{fbomCarSeries}</span>
            </div>
          </div>

          {/* bot */}
          <ul className={css.bottom}>
            {mapData.map((el, index) => {
              const { label, value } = el;
              return (
                <li
                  className={css.item}
                  key={index}
                  onClick={(e) => {
                    clickProjectCard(e, data, index * 1 + 1);
                  }}
                >
                  <span
                    className={
                      projectId == selPjId && status && status == index * 1 + 1
                        ? css.numSelect
                        : css.num
                    }
                  >
                    {value}
                  </span>
                  <span
                    className={
                      projectId == selPjId && status && status == index * 1 + 1
                        ? css.statusSelect
                        : css.status
                    }
                  >
                    {label}
                  </span>
                  {projectId == selPjId &&
                    status &&
                    status == index * 1 + 1 && (
                      <span className={css.itemSelect}></span>
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className={css.placeholderArea}></div>
      )}
    </div>
  );
};

export default ProjectItem;
