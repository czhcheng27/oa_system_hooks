import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import connectionIcon from "./img/connection.png";
import { infoList } from "./mock";
import css from "./projectProgress.module.less";

const ProjectProgress = () => {
  const [selectdIndex, setSelectIndex] = useState();

  const projectCardClick = (index = 0) => {
    if (selectdIndex !== index) {
      setSelectIndex(index);
    }
  };

  useEffect(() => {
    projectCardClick();
  }, []);

  return (
    <div>
      <div className={css.title}>All Projects</div>
      <div className={css.project_progress}>
        <div className={css.head}>
          <div className="left">
            <div>
              Total<i>{2}</i>
            </div>
            <div>
              Normal<i>{1}</i>
            </div>
            <div>
              Delay<i>{1}</i>
            </div>
          </div>
          <div className="connection">
            <img src={connectionIcon} />
            <img src={connectionIcon} />
          </div>
        </div>
        <div className={css.content}>
          {infoList.map((item, index) => {
            return (
              <ProjectCard
                key={item.id}
                data={item}
                index={index}
                selectd={selectdIndex === index}
                isLast={infoList.length - 1 === index}
                onClick={projectCardClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
