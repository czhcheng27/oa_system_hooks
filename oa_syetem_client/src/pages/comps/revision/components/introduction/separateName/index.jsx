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
import SwitchWrapper from "../../../switchWrapper";
import PopCom from "../../../popCom";
import CmTinymce from "../../../cmTinymce";
import css from "./index.module.less";

const { Item } = Form;

const initNumPartContent = [
  {
    partNum: "1",
    value: "",
    id: "leveloneId1",
  },
];

const numPartContentObj = {
  partNum: "",
  value: "",
};

// eslint-disable-next-line react/display-name
const SeparateName = forwardRef(({ standardNameData }, ref) => {
  const { switchStatus, namePart } = standardNameData || {};
  const [nameForm] = Form.useForm();

  const [nameSwitch, setNameSwitch] = useState(true);
  const [valueData, setValueData] = useState(initNumPartContent);

  useImperativeHandle(ref, () => ({
    getNameData: () => {
      const namePart = nameForm.getFieldsValue();
      const data = { switchStatus: nameSwitch, namePart, valueData };
      return data;
    },
  }));

  useEffect(() => {
    if (standardNameData) {
      setNameSwitch(switchStatus);
      nameForm.setFieldsValue(namePart);
      setValueData(standardNameData?.valueData ?? initNumPartContent);
    }
  }, [standardNameData]);

  const switchFunc = (data) => {
    setNameSwitch(data);
  };

  // type 1 : 第一层级（a级添加）
  const partNumAdd = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const newLable = String.fromCharCode(data.partNum.charCodeAt(0) * 1 + 1);
    newData.splice(curIndex + 1, 0, {
      ...numPartContentObj,
      partNum: newLable,
      id: createUidKey(),
    });
    if (valueData.length > 1) {
      const afterArr = newData.slice(curIndex + 2);
      afterArr.forEach((el) => {
        el.partNum = String.fromCharCode(el.partNum.charCodeAt(0) * 1 + 1);
        return el;
      });
    }
    setValueData(newData);
  };

  // type 1 : 第一层级（a级删除）
  const partNumDel = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const preArr = newData.slice(0, curIndex);
    const afterArr = newData.slice(curIndex + 1);
    afterArr.forEach((el) => {
      el.partNum = String.fromCharCode(el.partNum.charCodeAt(0) * 1 - 1);
      return el;
    });
    setValueData([...preArr, ...afterArr]);
  };

  // 一级文本更改时更新数据函数
  const lOneTxtChange = (txt, obj) => {
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
          <div key={index} className={css.type_wrapper}>
            <div className={css.partNum}>
              <p className={css.partNum_label}>{`part${el.partNum}`}</p>
              <CmTinymce
                inline={true}
                selectorName="introduction_bot_content"
                onChange={(data) => lOneTxtChange(data, el)}
              />
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => partNumAdd(el)} />
                <PopCom
                  position={"left"}
                  title={"Sure to delete?"}
                  disable={disable}
                  handleConfirm={() => partNumDel(el)}
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
      label="Partly Standard Name"
      switchVal={nameSwitch}
      switchFunc={switchFunc}
    >
      <Form labelCol={{ flex: "60px" }} form={nameForm} autoComplete="off">
        {/* 第一行 */}
        <div className={css.first_row}>
          <Item name="standardNo">
            <Input placeholder="Please fill in standard No" />
          </Item>
          <span>design to</span>
          <Item name="standardContent">
            <Input placeholder="Please fill in the contents" />
          </Item>
          <span>,</span>
        </div>

        {/* 第二行 */}
        <div className={css.second_row}>
          <span>composed of</span>
          <Item name="num">
            <Input placeholder="Please fill in the contents" />
          </Item>
          <span>parts</span>
        </div>
      </Form>

      <div className={`${css.bot_wrapper}`}>{renderContent()}</div>
    </SwitchWrapper>
  );
});

export default SeparateName;
