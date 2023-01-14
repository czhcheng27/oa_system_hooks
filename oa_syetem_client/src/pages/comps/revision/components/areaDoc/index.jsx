import React, { useState, useEffect, useCallback, useRef } from "react";
import WordIcon from "../../imgs/word.png";
import css from "./index.module.less";

const AreaDoc = (props) => {
  return (
    <div className={css.doc_wrapper}>
      <header>
        <img src={WordIcon} alt="word" />
        <p>File Preview</p>
      </header>
      <section>
        <div className={css.doc_content}>Doc</div>
      </section>
    </div>
  );
};

export default AreaDoc;
