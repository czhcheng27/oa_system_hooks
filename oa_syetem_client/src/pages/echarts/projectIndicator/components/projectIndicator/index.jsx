import React, { useState } from "react";
import { Button, Progress } from "antd";
import { HeaderTitle } from "../headerTitle";
import PSC from "../PSC";
import OP from "../OP";
import FPYR from "../FPYR";
import { indicatorData } from "../../mock";
import css from "./index.module.css";
import ProjectProgress from "../ProjectProgress";

const ProjectIndicator = (props) => {
  const [curIndicator, setCurIndicator] = useState(indicatorData[0]);

  const renderComponent = (num) => {
    switch (num) {
      case "01":
        return <PSC />;

      case "02":
        return <OP />;

      case "03":
        return <FPYR />;

      default:
        return <PSC />;
    }
  };

  // 小圆点的位置
  const position = (data) => {
    let left = 0;
    let top = 0;
    if (data <= 25) {
      const sin = Math.sin((data * 3.6 * Math.PI) / 180);
      const cos = Math.cos((data * 3.6 * Math.PI) / 180);
      top = 65 + cos * 52 - 4;
      left = 65 - sin * 52 - 4;
    } else if (data > 25 && data <= 50) {
      const sin = Math.sin(((data - 25) * 3.6 * Math.PI) / 180);
      const cos = Math.cos(((data - 25) * 3.6 * Math.PI) / 180);
      top = 65 - sin * 52 - 4;
      left = 65 - cos * 52 - 4;
    } else if (data > 50 && data <= 75) {
      const sin = Math.sin(((data - 50) * 3.6 * Math.PI) / 180);
      const cos = Math.cos(((data - 50) * 3.6 * Math.PI) / 180);
      top = 65 - cos * 52 - 4;
      left = 65 + sin * 52 - 4;
    } else if (data > 75) {
      const sin = Math.sin(((data - 75) * 3.6 * Math.PI) / 180);
      const cos = Math.cos(((data - 75) * 3.6 * Math.PI) / 180);
      top = 65 + sin * 52 - 4;
      left = 65 + cos * 52 - 4;
    }
    return { left, top };
  };

  return (
    <div className={css.wrapper}>
      <HeaderTitle title="Project Indicator">
        <Button type="primary">Indicator Setting</Button>
      </HeaderTitle>

      <ProjectProgress />

      <div className={css.content}>
        <ul>
          {indicatorData.map((obj, index) => {
            return (
              <li
                key={index}
                onClick={() => setCurIndicator(obj)}
                className={obj.id === curIndicator.id ? css.selected : ""}
              >
                <div className={css.progress}>
                  <Progress
                    type="dashboard"
                    width={150}
                    percent={obj.value}
                    gapDegree={0.1}
                    strokeColor={{ "0%": "#048AFE00", "100%": "#0289FE" }}
                    trailColor={
                      obj.targetNo === curIndicator.targetNo
                        ? "rgba(0,82,217,0.06)"
                        : "#fff"
                    }
                  />
                  <div className={css.circle}>
                    <div
                      className={css.position}
                      style={position(obj.value)}
                    ></div>
                    <div className={css.circle_right}>
                      <div
                        style={{
                          transform: `rotate(${
                            obj.value > 50 ? 3.6 * (obj.value - 50) : 0
                          }deg)`,
                        }}
                        className={css.right}
                      ></div>
                    </div>
                    <div className={css.circle_left}>
                      <div
                        style={{
                          transform: `rotate(${
                            obj.value <= 50 ? 3.6 * obj.value : 180
                          }deg)`,
                        }}
                        className={css.left}
                      ></div>
                    </div>
                    <div className={css.progress_content}>
                      <div className={css.progress_count}>
                        <span className={css.progress_num}>{obj.value}</span>%
                      </div>
                    </div>
                  </div>
                </div>
                <p className={css.hide} title={obj.targetName}>
                  {obj.targetName}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {renderComponent(curIndicator.targetNo)}
    </div>
  );
};

export default ProjectIndicator;
