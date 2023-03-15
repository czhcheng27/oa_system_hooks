import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toolkitInit } from "../const";
import { normalToolkit } from "./const";
import css from "./index.module.less";

const CmTinymce = ({
  onChange,
  value,
  height = 100,
  inline = false,
  toolKit = toolkitInit,
  selectorName,
}) => {
  return (
    <div className={css.cmTinymce} style={{ height: `${height}px` }}>
      <Editor
        onEditorChange={(data) => onChange(data)}
        init={
          inline ? { ...toolKit, selector: selectorName } : { ...normalToolkit }
        }
      />
    </div>
  );
};

export default CmTinymce;
