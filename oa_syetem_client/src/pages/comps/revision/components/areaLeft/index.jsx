import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import OutlineIcon from "../../imgs/outlineIcon.png";
import outlineIconActive from "../../imgs/outlineIconActive.png";
import CompIcon from "../../imgs/compIcon.png";
import CompIconActive from "../../imgs/compIconActive.png";
import css from "./index.module.less";
import Outline from "./outline";
import Comps from "./comps";

const AreaLeft = ({ addCom }) => {
  const [activeComp, setActiveComp] = useState(true);
  return (
    <div className={css.wrapper}>
      <header className={css.arealeft_header}>
        {/* <div className={css.btn_wrapper} onClick={() => setActiveComp(true)}> */}
        <div
          className={`${css.icon_wrapper} ${activeComp ? css.active : ""}`}
          onClick={() => setActiveComp(true)}
        >
          <img src={activeComp ? outlineIconActive : OutlineIcon} alt="大纲" />
          <p>Outline</p>
        </div>
        {/* </div> */}
        {/* <div className={css.btn_wrapper} onClick={() => setActiveComp(false)}> */}
        <div
          className={`${css.icon_wrapper} ${!activeComp ? css.active : ""}`}
          onClick={() => setActiveComp(false)}
        >
          <img src={!activeComp ? CompIconActive : CompIcon} alt="组件" />
          <p>Comps</p>
        </div>
        {/* </div> */}
      </header>

      <section className={css.arealeft_section}>
        {activeComp ? <Outline /> : <Comps addCom={addCom} />}
      </section>
    </div>
  );
};

export default AreaLeft;
