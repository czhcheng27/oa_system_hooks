import React, { useState } from "react";
import { Input, message } from "antd";
import css from "./index.module.less";
import { useEffect } from "react";

const { TextArea } = Input;

const Clipboard = () => {
  useEffect(() => {
    const notAllowCopy = document.getElementById("notAllowCopy");
    notAllowCopy.addEventListener("copy", (e) => {
      e.preventDefault();
      message.warn("Copy is not allowed");
    });

    const changeCopyContent = document.getElementById("changeCopyContent");
    changeCopyContent.addEventListener("copy", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("Your copy content is changed");
      message.warn("Your copy content is changed");
    });

    const addFollowingTxt = document.getElementById("addFollowingTxt");
    addFollowingTxt.addEventListener("copy", async (e) => {
      const text = await navigator.clipboard.readText();
      navigator.clipboard.writeText(text + "@Michael Cheng");
    });

    const editor = document.getElementById("editor");
    editor.addEventListener("paste", (e) => {
      if (e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target.result;
          editor.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <TextArea style={{ marginBottom: "16px" }} />

      {/* not allow copy */}
      <div
        id="notAllowCopy"
        style={{ border: "1px solid black", marginBottom: "16px" }}
      >
        <div>Not Allow Copy</div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        beatae ullam vero doloremque! Sit earum in, blanditiis dolores tenetur
        eveniet facilis reprehenderit id aliquid aspernatur nam nisi esse iure
        velit.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Necessitatibus beatae ullam vero doloremque! Sit earum in, blanditiis
        dolores tenetur eveniet facilis reprehenderit id aliquid aspernatur nam
        nisi esse iure velit.Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Necessitatibus beatae ullam vero doloremque! Sit earum in,
        blanditiis dolores tenetur eveniet facilis reprehenderit id aliquid
        aspernatur nam nisi esse iure velit.
      </div>

      {/* Change Copy Content */}
      <div
        id="changeCopyContent"
        style={{ border: "1px solid black", marginBottom: "16px" }}
      >
        <div>Change Copy Content</div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        beatae ullam vero doloremque! Sit earum in, blanditiis dolores tenetur
        eveniet facilis reprehenderit id aliquid aspernatur nam nisi esse iure
        velit.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Necessitatibus beatae ullam vero doloremque! Sit earum in, blanditiis
        dolores tenetur eveniet facilis reprehenderit id aliquid aspernatur nam
        nisi esse iure velit.Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Necessitatibus beatae ullam vero doloremque! Sit earum in,
        blanditiis dolores tenetur eveniet facilis reprehenderit id aliquid
        aspernatur nam nisi esse iure velit.
      </div>

      {/* Add Following Txt */}
      <div
        id="addFollowingTxt"
        style={{ border: "1px solid black", marginBottom: "16px" }}
      >
        <div>Change Copy Content</div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        beatae ullam vero doloremque! Sit earum in, blanditiis dolores tenetur
        eveniet facilis reprehenderit id aliquid aspernatur nam nisi esse iure
        velit.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Necessitatibus beatae ullam vero doloremque! Sit earum in, blanditiis
        dolores tenetur eveniet facilis reprehenderit id aliquid aspernatur nam
        nisi esse iure velit.Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Necessitatibus beatae ullam vero doloremque! Sit earum in,
        blanditiis dolores tenetur eveniet facilis reprehenderit id aliquid
        aspernatur nam nisi esse iure velit.
      </div>

      <div>Copy img or Img File</div>
      <div id="editor" className={css.editor} contentEditable></div>
    </div>
  );
};

export default Clipboard;
