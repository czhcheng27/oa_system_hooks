import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey } from "@/utils";
import { dataHasBeenUpdated, updateOutlineAllData } from "@/redux/actions";
import {
  preface_replaceFile_warnMsg as warnMsg,
  preface_replaceFile_valueData_warnMsg as valueData_warnMsg,
} from "../../../warnMsg";
import CmTinymce from "../../../cmTinymce";
import SwitchWrapper from "../../switchWrapper";
import PopCom from "../../popCom";
import { numToSymbol } from "../../../mock";
import css from "./index.module.less";

const { Item } = Form;
let mount = true;

const initContent = [
  {
    symbol: "a",
    value: "",
    unicode: 97,
    id: "replaceFileId1",
  },
];

const contentObj = {
  symbol: "",
  value: "",
  unicode: null,
  warnMsg: valueData_warnMsg,
};

// eslint-disable-next-line react/display-name
const ReplaceFile = forwardRef(({ replaceFile }, ref) => {
  const [infoForm] = Form.useForm();

  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

  const [valueData, setValueData] = useState(initContent);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  useImperativeHandle(ref, () => ({
    getReplaceFile: () => {
      const infoData = infoForm.getFieldsValue();
      const data = { infoData, valueData, switchStatus: isSwitchOn };
      return data;
    },
  }));

  const updateFunc = (swch, text, value) => {
    const topValue = infoForm.getFieldsValue();
    dispatch(dataHasBeenUpdated(true));
    const cbData = {
      switchStatus: swch ?? isSwitchOn,
      infoData: text ? { ...text, warnMsg } : { ...topValue, warnMsg },
      valueData: value ?? valueData,
    };
    const _temp = cloneDeep(outlineAllData[1]);
    const a = { ..._temp, data: { ..._temp.data, replaceFile: cbData } };
    outlineAllData[1] = a;
    dispatch(updateOutlineAllData(outlineAllData));
  };

  const switchFunction = (data) => {
    setIsSwitchOn(data);
    updateFunc(data, null, null);
  };

  useEffect(() => {
    if (replaceFile) {
      mount = false;
      infoForm.setFieldsValue(replaceFile.infoData ?? "");
      setValueData(replaceFile.valueData ?? initContent);
      setIsSwitchOn(replaceFile.switchStatus);
      setTimeout(() => {
        mount = true;
      }, 500);
    }
  }, [replaceFile]);

  const handleChange = () => {
    const topValue = infoForm.getFieldsValue();
    updateFunc(null, topValue, null);
  };

  // type 1 : 第一层级（a级添加）122 -> z
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
    mount && updateFunc(null, null, newData);
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
    mount && updateFunc(null, null, [...preArr, ...afterArr]);
  };

  // 一级文本更改时更新数据函数
  const contentTxtChange = (txt, obj) => {
    const newData = cloneDeep(valueData);
    newData.map((el) => {
      if (el.id === obj.id) el.value = txt;
      return el;
    });
    setValueData(newData);
    mount && updateFunc(null, null, newData);
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
                  title={"Delete?"}
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
      switchFunc={switchFunction}
    >
      <div className={css.top_wrapper}>
        <Form form={infoForm} labelCol={{ flex: "60px" }} autoComplete="off">
          <div>This document supersedes</div>
          <div className={css.second_row}>
            <Item name="stdNo">
              <Input
                placeholder="Please enter the standard number"
                onChange={handleChange}
              />
            </Item>
            <Item name="stdName">
              <Input
                placeholder="Please enter the standard name"
                onChange={handleChange}
              />
            </Item>
            <span style={{ margin: "12px -8px 0 6px" }}>，</span>
          </div>
          <div className={css.third_row}>compared with</div>
          <div className={css.fourth_row}>
            <Item name="publishedNo">
              <Input
                placeholder="Please enter the standard number"
                onChange={handleChange}
              />
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
