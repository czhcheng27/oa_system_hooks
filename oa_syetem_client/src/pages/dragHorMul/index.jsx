import React from "react";
import { Button } from "antd";
import TopImg from "./topImg";
import css from "./index.module.css";

const DragHorMul = (props) => {
  return (
    <div className={css.customize_setting}>
      <div className={css.header_wrapper}>
        <div className={css.header_title}>Customize Setting</div>
        <div className={css.btns_wrapper}>
          <Button>Cancel</Button>
          <Button className={css.save_btn} type="primary">
            Save
          </Button>
        </div>
      </div>

      <div className={css.background_Img}>
        <TopImg />
      </div>

      <div className={css.select_project_type}>Drag Content</div>
    </div>
  );
};

export default DragHorMul;
