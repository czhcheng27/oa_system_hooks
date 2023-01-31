import React, { useState } from "react";
import Outline from "./outline";
import Comps from "./comps";
import { independentComps } from "../../const";
import OutlineIcon from "../../imgs/outlineIcon.png";
import outlineIconActive from "../../imgs/outlineIconActive.png";
import CompIcon from "../../imgs/compIcon.png";
import CompIconActive from "../../imgs/compIconActive.png";
import css from "./index.module.less";

const AreaLeft = ({ addCom, actIdx, setActiveOutline }) => {
  const [activeComp, setActiveComp] = useState(true);
  const shouldDisable = independentComps.includes(actIdx);
  return (
    <div className={css.wrapper}>
      <header className={css.arealeft_header}>
        <div
          className={`${css.icon_wrapper} ${activeComp ? css.active : ""}`}
          onClick={() => setActiveComp(true)}
        >
          <img src={activeComp ? outlineIconActive : OutlineIcon} alt="大纲" />
          <p>Outline</p>
        </div>
        <div
          className={`${css.icon_wrapper} ${!activeComp ? css.active : ""} ${
            shouldDisable ? css.disable_style : css.pointer_style
          }`}
          onClick={() => !shouldDisable && setActiveComp(false)}
        >
          <img src={!activeComp ? CompIconActive : CompIcon} alt="组件" />
          <p>Comps</p>
        </div>
      </header>

      <section className={css.arealeft_section}>
        {activeComp ? (
          <Outline actIdx={actIdx} setActiveOutline={setActiveOutline} />
        ) : (
          <Comps addCom={addCom} />
        )}
      </section>
    </div>
  );
};

export default AreaLeft;
