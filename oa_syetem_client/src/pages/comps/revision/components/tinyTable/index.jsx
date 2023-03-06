import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CompWrapper from "../compWrapper";
import css from "./index.module.less";

const TinyTable = ({ props, onDelete, comValueUpdate }) => {
  const handleEditorChange = (data) => {
    console.log("data", data);
  };
  return (
    <CompWrapper prop={{ props, onDelete }}>
      <Editor
        initialValue="sss"
        init={{
          height: 500,
          menubar: true,
          plugins:
            "advlist autolink link  lists charmap fullscreen media wordcount",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | fullscreen removeformat",
        }}
        onEditorChange={handleEditorChange}
      />
    </CompWrapper>
  );
};

export default TinyTable;
