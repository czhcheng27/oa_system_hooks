import React, { forwardRef } from "react";
import { Button } from "antd";
import WordIcon from "../../imgs/word.png";
import css from "./index.module.less";

const AreaDoc = forwardRef(({ handleSubmit }, ref) => {
  const handleSave = () => {
    console.log("handleSave");
  };
  return (
    <div className={css.doc_wrapper}>
      <header>
        <div className={css.doc_left}>
          <img src={WordIcon} alt="word" />
          <p>File Preview</p>
        </div>
        <div className={css.btns}>
          <Button>Go Back</Button>
          <Button type="primary" onClick={handleSubmit}>
            Save and Preview
          </Button>
        </div>
      </header>
      <section>
        <div className={css.doc_content}>Doc</div>
      </section>
    </div>
  );
});

export default AreaDoc;
