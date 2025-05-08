import React, { useState, useEffect } from "react";
import { Input, Radio } from "antd";
import classNames from "classnames";
import { Editor } from "@tinymce/tinymce-react";
import { tinymceInit4Formula } from "./formulaString";
import CompWrapper from "../compWrapper";
import Fx from "./imgs/fx.svg";
import RightArrow from "./imgs/rightArrow.png";
import css from "./index.module.less";

let mount = true;

// eslint-disable-next-line react/display-name
const Formula = ({ props, comValueUpdate, onDelete, drag }) => {
  const { content, id, properties } = props;

  const [claimData, setClaimData] = useState("");
  const [withQuote, setWithQuote] = useState("1");
  const [quoteNo, setQuoteNo] = useState("");
  const [richFormula, setRichFormula] = useState("");

  const initFunc = () => {
    mount = false;
    const { claimData, withQuote, quoteNo } = properties;
    setRichFormula(content ? JSON.parse(content) : "");
    setQuoteNo(quoteNo);
    setWithQuote(withQuote);
    setClaimData(claimData);
    setTimeout(() => {
      mount = true;
    }, 500);
  };

  useEffect(() => {
    props && initFunc();
  }, [props]);

  useEffect(() => {
    mount && comValueUpdate(id, richFormula, { claimData, withQuote, quoteNo });
  }, [withQuote, quoteNo, richFormula, claimData]);

  const onRadioChange = (e) => {
    setQuoteNo("");
    setWithQuote(e.target.value);
  };

  // 渲染是否引用
  const renderRadio = () => {
    return (
      <>
        <div className={classNames(css.radio_wrapper)}>
          <header>Need Quote ?</header>
          <section>
            <Radio.Group onChange={onRadioChange} value={withQuote}>
              <Radio value={"1"}>Yes</Radio>
              <Radio value={"0"}>No</Radio>
            </Radio.Group>
          </section>
        </div>
      </>
    );
  };

  // 富文本变化函数
  const formulaChange = (data) => {
    setRichFormula(data);
    mount && comValueUpdate(id, data, { claimData, withQuote, quoteNo });
  };

  const formulaClick = () => {
    const sectionDiv = document.getElementById(`${id}_formula_section`);
    const formulaBtn = sectionDiv.getElementsByClassName("tox-toolbar__group");
    formulaBtn[0].children[0].click();
  };

  return (
    <CompWrapper prop={{ props, onDelete, drag }}>
      <div className={css.inside_wrapper}>
        {renderRadio()}
        <div className={css.formulaBtn_wrapper}>
          <header>Content</header>
          <section onClick={formulaClick}>
            <img src={Fx} style={{ width: "18px" }} alt="fx" />
            <p>Choose Formula</p>
            <img
              src={RightArrow}
              style={{ width: "7px", height: "10px" }}
              alt="RightArrow"
            />
          </section>
          {withQuote == "1" && (
            <div className={css.code_input}>
              <p>Code</p>
              <Input
                value={quoteNo}
                onChange={(e) => setQuoteNo(e.target.value)}
                placeholder="code"
              />
            </div>
          )}
        </div>
        <div className={classNames(css.display_wrapper)}>
          <section
            id={`${id}_formula_section`}
            className={classNames(css.formula_richText)}
          >
            <Editor
              style={{ width: "100%" }}
              value={richFormula}
              onEditorChange={formulaChange}
              init={{ ...tinymceInit4Formula, height: "123px" }}
            ></Editor>
          </section>
        </div>
        <div className={classNames(css.claim_area)}>
          <header>Explaination</header>
          <section>
            <Input.TextArea
              value={claimData}
              onChange={(e) => setClaimData(e.target.value)}
              placeholder="Please type in your content"
              rows={5}
            />
          </section>
        </div>
      </div>
    </CompWrapper>
  );
};
export default Formula;
