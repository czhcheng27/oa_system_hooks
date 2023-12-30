import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Input } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey, inputToNum } from "../../../../../../utils";
// import { inputToNum } from "@/utils";
import CmTinymce from "../../../cmTinymce";
import SwitchWrapper from "../../../switchWrapper";
import PopCom from "../../../popCom";
import css from "./index.module.less";

const { Item } = Form;

const initContent = [
  {
    partNo: "",
    contentTxt: "",
    id: "initContentId",
  },
];

// eslint-disable-next-line react/display-name
const FileRel = forwardRef(({ fileRel }, ref) => {
  const [infoForm] = Form.useForm();

  const [valueData, setValueData] = useState(initContent);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  useImperativeHandle(ref, () => ({
    getFileRel: () => {
      const infoData = infoForm.getFieldsValue();
      const data = { infoData, valueData, switchStatus: isSwitchOn };
      return data;
    },
  }));

  useEffect(() => {
    infoForm.setFieldsValue(fileRel.infoData ?? "");
    setValueData(fileRel.valueData ?? initContent);
    setIsSwitchOn(fileRel.switchStatus);
  }, [fileRel]);

  const valueChange = (value, obj, name) => {
    const newData = cloneDeep(valueData);
    newData.map((el) => {
      if (el.id === obj.id) el[name] = value;
      return el;
    });
    setValueData(newData);
  };

  const btnAction = (data, action) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    if (action === "add") {
      newData.splice(curIndex + 1, 0, {
        ...initContent[0],
        id: createUidKey(),
      });
    } else if (action === "del") {
      newData.splice(curIndex, 1);
    }
    setValueData(newData);
  };

  const renderContent = () => {
    const disable = valueData.length === 1;
    return (
      !!valueData.length &&
      valueData.map((el, index) => {
        return (
          <div key={index} className={css.content_wrapper}>
            <div className={css.content}>
              <p>
                No.
                <Input
                  value={el.partNo}
                  onChange={(e) =>
                    valueChange(inputToNum(e.target.value), el, "partNo")
                  }
                />
              </p>
              <CmTinymce
                inline={true}
                value={el.contentTxt}
                selectorName="fileRel_content"
                onChange={(data) => valueChange(data, el, "contentTxt")}
              />
              <div className={css.symbol}>
                {index + 1 === valueData.length ? "。" : ";"}
              </div>
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => btnAction(el, "add")} />
                <PopCom
                  position={"left"}
                  title={"确定删除?"}
                  disable={disable}
                  handleConfirm={() => !disable && btnAction(el, "del")}
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
      label="File Relations"
      switchVal={isSwitchOn}
      switchFunc={setIsSwitchOn}
    >
      <div className={css.top_wrapper}>
        <Form form={infoForm} labelCol={{ flex: "60px" }} autoComplete="off">
          <div>This file is</div>
          <div className={css.second_row}>
            <Item name="stdNo">
              <Input placeholder="Please enter the standard number" />
            </Item>
            <Item name="stdName">
              <Input placeholder="Please enter the standard name" />
            </Item>
          </div>
          <div className={css.third_row}>
            's No.
            <Item name="partNo">
              <Input />
            </Item>{" "}
            part
          </div>
          <div className={css.fourth_row}>
            <Item name="publishedNo">
              <Input placeholder="Please enter the standard number" />
            </Item>
            <span>The following sections have been released：</span>
          </div>
        </Form>
      </div>

      <div className={css.bot_wrapper}>{renderContent()}</div>
    </SwitchWrapper>
  );
});

export default FileRel;
