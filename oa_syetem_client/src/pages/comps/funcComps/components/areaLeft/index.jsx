import React, { useContext, useState } from "react";
import Outline from "./outline";
import Comps from "./comps";
import { RevisionContext } from "../..";
import OutlineIcon from "../../imgs/outlineIcon.png";
import outlineIconActive from "../../imgs/outlineIconActive.png";
import CompIcon from "../../imgs/compIcon.png";
import CompIconActive from "../../imgs/compIconActive.png";
import css from "./index.module.less";

const AreaLeft = () => {
  const { activeOutline } = useContext(RevisionContext);

  const [activeComp, setActiveComp] = useState(true);
  const shouldDisable = ["cover", "preface", "reference"].includes(
    activeOutline.id
  );
  return (
    <div className={css.wrapper}>
      <header className={css.arealeft_header}>
        <div
          className={`${css.icon_wrapper} ${activeComp ? css.active : ""}`}
          onClick={() => setActiveComp(true)}
        >
          <img
            src={activeComp ? outlineIconActive : OutlineIcon}
            alt="Outline"
          />
          <p>Outline</p>
        </div>
        <div
          className={`${css.icon_wrapper} ${!activeComp ? css.active : ""} ${
            shouldDisable ? css.disable_style : css.pointer_style
          }`}
          onClick={() => !shouldDisable && setActiveComp(false)}
        >
          <img src={!activeComp ? CompIconActive : CompIcon} alt="Comps" />
          <p>Comps</p>
        </div>
      </header>

      <section
        className={css.arealeft_section}
        id="arealeft_section"
        style={{
          padding: !activeComp ? "16px 13px 16px 16px" : "16px 7px 16px 5px",
        }}
      >
        {activeComp ? <Outline /> : <Comps />}
      </section>
    </div>
  );
};

export default AreaLeft;
