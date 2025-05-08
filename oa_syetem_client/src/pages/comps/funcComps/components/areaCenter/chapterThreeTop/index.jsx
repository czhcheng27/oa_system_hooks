import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input, Radio } from "antd";
// import SwitchWrapper from '../../../../switchWrapper';
import css from "./index.module.less";

const ChapterThreeTop = ({ activeOutline, comValueUpdate }) => {
  const {
    data: { radioOpt, content },
  } = activeOutline;

  const isdragging = useSelector((s) => s.rdcDragStart);

  const [radioValue, setRadioValue] = useState(1);
  const [inputVal, setInputVal] = useState("");

  const onChange = (e) => {
    const data = e.target.value;
    setInputVal("");
    setRadioValue(data);
    comValueUpdate(null, null, null, activeOutline.id, {
      radioOpt: data,
      content: inputVal,
    });
  };

  const inputFunc = (data) => {
    setInputVal(data);
    comValueUpdate(null, null, null, activeOutline.id, {
      radioOpt: radioValue,
      content: data,
    });
  };

  useEffect(() => {
    setRadioValue(radioOpt);
    setInputVal(content);
  }, [activeOutline]);

  return (
    <div className={css.wrapper}>
      {/* <SwitchWrapper disableSwitch={true} label="术语引导语">
        <Radio.Group onChange={onChange} value={radioValue}>
          <div className={css.top_wrapper}>
            <Radio value={1}>本文件没有需要界定的术语和定义。</Radio>
            <Radio value={2}>下列术语和定义适用于本文件。</Radio>
          </div>
          <div className={css.bot_wrapper}>
            <Radio value={3}>
              <div className={css.single_opt}>
                <Input
                  value={radioValue == 3 ? inputVal : ""}
                  onChange={(e) => inputFunc(e.target.value)}
                  disabled={radioValue !== 3}
                  placeholder="请输入内容"
                />
                <p>界定的术语和定义适用于本文件。</p>
              </div>
            </Radio>
            <Radio value={4}>
              <div className={css.single_opt}>
                <Input
                  value={radioValue == 4 ? inputVal : ""}
                  onChange={(e) => inputFunc(e.target.value)}
                  disabled={radioValue !== 4}
                  placeholder="请输入内容"
                />
                <p>界定的以及下列术语和定义适用于本文件。</p>
              </div>
            </Radio>
          </div>
        </Radio.Group>
        {isdragging && <div className={css.overlay} />}
      </SwitchWrapper> */}
    </div>
  );
};

export default ChapterThreeTop;
