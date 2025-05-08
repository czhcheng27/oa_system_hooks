import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import classNames from "classnames";
import { Editor } from "@tinymce/tinymce-react";
import { inputToNum, inputToNumAlp, listenBtn } from "@/utils";
import CompWrapper from "../compWrapper";
import css from "./index.module.less";

const tinymceInit4Table = {
  toolbar_mode: "wrap",
  menubar: "table",
  plugins:
    "preview autolink directionality visualblocks visualchars fullscreen image link media code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help emoticons autosave kityformula-editor",
  toolbar: [
    "image | alignleft aligncenter alignright alignjustify| blockauote subscript superscript removeformat styleselect formatselect fontselect fontsizeselect| charmap fullscreen kityformula-editor",
  ],
  elementpath: false,
};

const tinyValue =
  '<table style="border-collapse: collapse; width: 99.9825%;" border="1"><colgroup><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"></colgroup>\n<tbody>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td colspan="7">\n<p>Notes：</p>\n</td>\n</tr>\n<tr>\n<td colspan="7">\n<p>a)：</p>\n</td>\n</tr>\n</tbody>\n</table>';

let mount = true;

const TinyTable = ({
  props,
  comValueUpdate,
  onDelete,
  activeOutline,
  drag,
}) => {
  const { content, id, properties } = props;

  const tableRef = useRef();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const [fullScnClick, setFullScnClick] = useState(false);
  const [richData, setRichData] = useState(tinyValue);

  const [tableClicked, setTableClicked] = useState(false); // 表格按钮是否被点击
  const [leftActived, setLeftActived] = useState(false); // 左对齐按钮激活状态
  const [centerActived, setCenterActived] = useState(false); // 中对齐按钮激活状态
  const [rightActived, setRightActived] = useState(false); // 右对齐按钮激活状态

  const initialFunc = () => {
    const { code, name, unit } = properties;
    setCode(code);
    setName(name);
    setUnit(unit);
    setRichData(content ? JSON.parse(content).tinyTable : tinyValue);
  };

  useEffect(() => {
    props && initialFunc();
    listenBtn(
      () => getResponseDiv("tox-tbtn", null, null, true),
      1,
      setLeftActived,
      2
    );
    listenBtn(
      () => getResponseDiv("tox-tbtn", null, null, true),
      2,
      setCenterActived,
      2
    );
    listenBtn(
      () => getResponseDiv("tox-tbtn", null, null, true),
      3,
      setRightActived,
      2
    );
    listenBtn(
      () => getResponseDiv("tox-tbtn", null, null, true),
      9,
      setFullScnClick,
      2
    );
    listenBtn(
      () => getResponseDiv("tox-mbtn", null, null, true),
      0,
      setTableClicked,
      3
    );
  }, [props]);

  useEffect(() => {
    comValueUpdate(id, { tinyTable: richData }, { code, name, unit });
  }, [code, name, unit]);

  const getResponseDiv = (classname, num1, num2, forListen = false) => {
    const sectionDiv = document.getElementById(`${id}_tinytable`);
    const toxDiv = sectionDiv.getElementsByClassName(classname);
    return forListen ? toxDiv : toxDiv[num1].children[num2];
  };

  const array = [
    {
      img: "addPic",
      func: () => getResponseDiv("tox-toolbar__group", 0, 0).click(),
    },
    {
      img: "alignLeft",
      func: () => getResponseDiv("tox-toolbar__group", 1, 0).click(),
      style: { background: leftActived ? "#E7EFFB" : "transparent" },
    },
    {
      img: "alignCenter",
      func: () => getResponseDiv("tox-toolbar__group", 1, 1).click(),
      style: { background: centerActived ? "#E7EFFB" : "transparent" },
    },
    {
      img: "alignRight",
      func: () => getResponseDiv("tox-toolbar__group", 1, 2).click(),
      style: { background: rightActived ? "#E7EFFB" : "transparent" },
    },
    {
      img: "full",
      func: () => getResponseDiv("tox-toolbar__group", 3, 1).click(),
    },
    {
      img: "formula",
      func: () => getResponseDiv("tox-toolbar__group", 3, 2).click(),
    },
    {
      img: "table",
      func: () => getResponseDiv("tox-menubar", 0, 0).click(),
      style: { background: tableClicked ? "#E7EFFB" : "transparent" },
    },
  ];

  const tinytableChange = (data) => {
    setRichData(data);
    comValueUpdate(id, { tinyTable: data }, { code, name, unit });
  };

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
                      src={require("./imgs/" + obj.img + ".png")}
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
              onEditorChange={tinytableChange}
            />
          </section>
        </div>
      </div>
    </CompWrapper>
  );
};

export default TinyTable;
