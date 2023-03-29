import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Input } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey } from "@/utils";
import CmTinymce from "../../../cmTinymce";
import SwitchWrapper from "../../../switchWrapper";
import PopCom from "../../../popCom";
import { toolkitInit } from "../../../const";
import { numToSymbol } from "../../../mock";
import css from "./index.module.less";

const { Item } = Form;

const initContent = [
  {
    symbol: "a",
    unicode: 97,
    value: "",
    id: "replaceFileId1",
  },
];

const contentObj = {
  symbol: "",
  value: "",
  unicode: null,
};

// eslint-disable-next-line react/display-name
const ReplaceFile = forwardRef(({ replaceFile }, ref) => {
  const [infoForm] = Form.useForm();

  const [valueData, setValueData] = useState(initContent);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  useImperativeHandle(ref, () => ({
    getReplaceFile: () => {
      const infoData = infoForm.getFieldsValue();
      const data = { infoData, valueData, switchStatus: isSwitchOn };
      return data;
    },
  }));

  useEffect(() => {
    infoForm.setFieldsValue(replaceFile.infoData ?? "");
    setValueData(replaceFile.valueData ?? initContent);
    setIsSwitchOn(replaceFile.switchStatus);
  }, [replaceFile]);

  // type 1 : 第一层级（a级添加）
  const contentAdd = (data) => {
    const { id, symbol, unicode } = data;
    const curIndex = valueData.findIndex((el) => el.id === id);
    const newData = cloneDeep(valueData);
    let newLable;
    if (unicode > 121) {
      const supposeSymbol = numToSymbol[unicode - 121];
      newLable = `${supposeSymbol}${supposeSymbol}`;
    } else {
      newLable = String.fromCharCode(symbol.charCodeAt(0) * 1 + 1);
    }
    newData.splice(curIndex + 1, 0, {
      ...contentObj,
      symbol: newLable,
      id: createUidKey(),
      unicode: unicode + 1,
    });
    if (valueData.length > 1) {
      const afterArr = newData.slice(curIndex + 2);
      afterArr.forEach((el) => {
        if (el.unicode >= 122) {
          const supposeSymbol = numToSymbol[el.unicode - 121];
          el.symbol = `${supposeSymbol}${supposeSymbol}`;
        } else {
          el.symbol = String.fromCharCode(el.symbol.charCodeAt(0) * 1 + 1);
        }
        el.unicode += 1;
        return el;
      });
    }
    setValueData(newData);
  };

  // type 1 : 第一层级（a级删除）
  const contentDel = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const preArr = newData.slice(0, curIndex);
    const afterArr = newData.slice(curIndex + 1);
    afterArr.forEach((el) => {
      if (el.unicode == 123) {
        el.symbol = "z";
      } else if (el.unicode > 122) {
        const supposeSymbol = numToSymbol[el.unicode - 123];
        el.symbol = `${supposeSymbol}${supposeSymbol}`;
      } else {
        el.symbol = String.fromCharCode(el.symbol.charCodeAt(0) * 1 - 1);
      }
      el.unicode -= 1;
      return el;
    });
    setValueData([...preArr, ...afterArr]);
  };

  // 一级文本更改时更新数据函数
  const contentTxtChange = (txt, obj) => {
    const newData = cloneDeep(valueData);
    newData.map((el) => {
      if (el.id === obj.id) el.value = txt;
      return el;
    });
    setValueData(newData);
  };

  const renderContent = () => {
    return (
      valueData.length &&
      valueData.map((el, index) => {
        const disable = valueData.length === 1;
        return (
          <div key={index} className={css.content_wrapper}>
            <div className={css.content}>
              <p>{`${el.symbol})`}</p>
              <CmTinymce
                value={el.value}
                inline={true}
                selectorName="replaceFile_bot_content"
                onChange={(data) => contentTxtChange(data, el)}
              />
              <div className={css.symbol}>
                {index + 1 === valueData.length ? "。" : ";"}
              </div>
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => contentAdd(el)} />
                <PopCom
                  position={"left"}
                  title={"确定删除?"}
                  disable={disable}
                  handleConfirm={() => contentDel(el)}
                >
                  {
                    <MinusCircleOutlined
                      className={classNames({ [css.diable_hover]: disable })}
                    />
                  }
                </PopCom>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <SwitchWrapper
      label="Replace File Relations"
      switchVal={isSwitchOn}
      switchFunc={setIsSwitchOn}
    >
      <div className={css.top_wrapper}>
        <Form form={infoForm} labelCol={{ flex: "60px" }} autoComplete="off">
          <div>This document supersedes</div>
          <div className={css.second_row}>
            <Item name="stdNo">
              <Input placeholder="Please enter the standard number" />
            </Item>
            <Item name="stdName">
              <Input placeholder="Please enter the standard name" />
            </Item>
          </div>
          <div className={css.third_row}>compared with</div>
          <div className={css.fourth_row}>
            <Item name="publishedNo">
              <Input placeholder="Please enter the standard number" />
            </Item>
            <span>the main technical changes are as following:</span>
          </div>
        </Form>

        <div className={css.bot_wrapper}>{renderContent()}</div>
      </div>
    </SwitchWrapper>
  );
});

export default ReplaceFile;
