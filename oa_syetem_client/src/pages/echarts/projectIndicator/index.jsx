import React from "react";
import ProjectIndicator from "./components/projectIndicator";
import css from "./index.module.css";

const PJCharts = (props) => {
  return (
    <div className={css.wrapper}>
      <ProjectIndicator />
    </div>
  );
};

export default PJCharts;
