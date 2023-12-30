import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import CompWrapper from "../compWrapper";
import css from "./index.module.less";
import { useRef } from "react";
import classNames from "classnames";
import { inputToNum } from "../../../../../utils";

const tinymceInit4Table = {
  toolbar_mode: "wrap",
  menubar: "table",
  plugins:
    "print preview autolink directionality visualblocks visualchars fullscreen image link media templat search replace code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattel help emoticons autosave kityformula-editor",
  toolbar: [
    "image | alignleft aligncenter alignright alignjustify| blockauote subscript superscript removeformat styleselect formatselect fontselect fontsizeselect| charmap fullscreen kityformula-editor",
  ],
  elementpath: false,
};

const tinyValue =
  '<table style="border-collapse: collapse; width: 99.9825%;" border="1"><colgroup><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"></colgroup>\n<tbody>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td colspan="7">\n<p>Notes：</p>\n</td>\n</tr>\n<tr>\n<td colspan="7">\n<p>a)：</p>\n</td>\n</tr>\n</tbody>\n</table>';

const TinyTable = ({ props, onDelete, comValueUpdate }) => {
  const { content, id, properties } = props;
  const tableRef = useRef();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const [fullScnClick, setFullScnClick] = useState(false);
  const [richData, setRichData] = useState(tinyValue);

  const handleEditorChange = (data) => {
    setRichData(data);
    comValueUpdate(id, { tinyTable: data }, { code, name, unit });
  };

  useEffect(() => {
    comValueUpdate(id, { tinyTable: richData }, { code, name, unit });
  }, [code, name, unit]);

  const initialFunc = () => {
    const { code, name, unit } = properties;
    setCode(code);
    setName(name);
    setUnit(unit);
    setRichData(content ? JSON.parse(content).tinyTable : tinyValue);
  };

  useEffect(() => {
    props && initialFunc();
  }, [props]);

  const getResponseDiv = (classname, num1, num2) => {
    const sectionDiv = document.getElementById(`${id}_tinytable`);
    const toxDiv = sectionDiv.getElementsByClassName(classname);
    return toxDiv[num1].children[num2];
  };

  const fullScreen = () => {
    getResponseDiv("tox-toolbar__group", 3, 1).click();
    setFullScnClick(true);
  };

  const array = [
    // {
    //   img: "addPic",
    //   func: () => getResponseDiv("tox-toolbar__group", 0, 0).click(),
    // },
    {
      img: "alignLeft",
      func: () => getResponseDiv("tox-toolbar__group", 1, 0).click(),
    },
    {
      img: "alignCenter",
      func: () => getResponseDiv("tox-toolbar__group", 1, 1).click(),
    },
    {
      img: "alignRight",
      func: () => getResponseDiv("tox-toolbar__group", 1, 2).click(),
    },
    {
      img: "full",
      func: fullScreen,
    },
    {
      img: "table",
      func: () => getResponseDiv("tox-menubar", 0, 0).click(),
    },
  ];

  useEffect(() => {
    let fullScnTimer;
    if (fullScnClick) {
      fullScnTimer = setInterval(() => {
        const fsDiv = getResponseDiv("tox-toolbar__group", 3, 1);
        const fsStatus =
          fsDiv && fsDiv.getAttribute("class").includes("tox-tbtn--enabled");
        setFullScnClick(fsStatus);
      }, 100);
    }

    return () => {
      clearInterval(fullScnTimer);
    };
  }, [fullScnClick]);

  return (
    <CompWrapper prop={{ props, onDelete }}>
      <div className={css.content_wrapper}>
        {/* top area */}
        <div id="topArea" className={css.left}>
          <div className={classNames(css.inputCss)}>
            <p>Code</p>{" "}
            <Input
              value={code}
              onChange={(e) => setCode(inputToNum(e.target.value))}
              placeholder="Please type your content"
            />
          </div>
          <div className={`${css.inputCss} ${css.tableName}`}>
            <p>Name</p>{" "}
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Please type your content"
            />
          </div>
        </div>

        <div className={css.center}>
          <div className={css.btns}>
            {array.map((obj, index) => {
              return (
                <Button
                  key={index}
                  style={obj?.style}
                  onClick={obj.func}
                  icon={
                    <img
                      className={classNames(css.btnImg)}
                      src={require("./imgs/" + obj.img + ".png").default}
                      alt="logo"
                    />
                  }
                />
              );
            })}
          </div>
          <div className={css.inputCss}>
            <p>Unit</p>{" "}
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Please type your content"
            />
          </div>
        </div>

        <div className={css.right}>
          <section
            id={`${id}_tinytable`}
            className={classNames(
              fullScnClick ? css.full_screen : css.tiny_richText
            )}
            ref={tableRef}
          >
            <Editor
              value={richData}
              init={{ ...tinymceInit4Table, height: "280px" }}
              onEditorChange={handleEditorChange}
            />
          </section>
        </div>
      </div>
    </CompWrapper>
  );
};

export default TinyTable;
