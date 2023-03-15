import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toolkitInit } from "../const";
import css from "./index.module.less";

const CmTinymce = ({ onChange, value, height = 100 }) => {
  return (
    <div className={css.cmTinymce} style={{ height: `${height}px` }}>
      <Editor
        onEditorChange={(data) => onChange(data)}
        init={{
          ...toolkitInit,
          selector: "introduction_top_content",
        }}
      />
    </div>
  );
};

export default CmTinymce;
