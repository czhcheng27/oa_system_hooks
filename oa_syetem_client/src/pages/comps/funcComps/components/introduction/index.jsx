/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, forwardRef, useContext } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  dataHasBeenUpdated,
  dragStart,
  updateOutlineAllData,
} from "@/redux/actions";
import { cloneDeep, createUidKey } from "@/utils";
import { checkIsPositiveIntegerEx0 } from "@/utils";
import {
  intro_contentData_warnMsg as warnMsg,
  intro_standardNameData_namePart_warnMsg as namePart_warnMsg,
  intro_standardNameData_valueData_warnMsg as valueData_warnMsg,
} from "../../warnMsg";
import { matchCom, toolkitInit } from "../../const";
import PopCom from "../popCom";
import SwitchWrapper from "../switchWrapper";
import CmTinymce from "../../cmTinymce";
import { RevisionContext } from "../..";
import css from "./index.module.less";

const { Item } = Form;
let mount = true;

const initNumPartContent = [
  {
    partNum: "1",
    value: "",
    id: "leveloneId1",
    warnMsg: valueData_warnMsg,
  },
];

const numPartContentObj = {
  partNum: "",
  value: "",
  warnMsg: valueData_warnMsg,
};

// eslint-disable-next-line react/display-name
const Introduction = forwardRef(
  ({ introData, handleDelete, comValueUpdate }, ref) => {
    const { listData, activeOutline } = useContext(RevisionContext);
    const { coms: comList = [] } = activeOutline;
    const { data: { contentData, standardNameData } = {} } = introData || {};
    const { switchStatus, value } = contentData || {};
    const { namePart } = standardNameData || {};

    const [contentForm] = Form.useForm();
    const [nameForm] = Form.useForm();

    const dispatch = useDispatch();

    const isdragging = useSelector((s) => s.rdcDragStart);
    const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

    const [contentSwitch, setContentSwitch] = useState(true);
    const [nameSwitch, setNameSwitch] = useState(true);
    const [valueData, setValueData] = useState(initNumPartContent);

    const handleChange = () => {
      const topValue = nameForm.getFieldsValue();
      updateFunc(null, null, null, topValue);
    };

    const switchFunc = (data, name) => {
      if (name === "contentSwitch") {
        setContentSwitch(data);
        updateFunc(data);
      } else if (name === "nameSwitch") {
        setNameSwitch(data);
        updateFunc(null, null, data);
      }
    };

    const richTxtChange = (data) => {
      mount && updateFunc(null, data);
    };

    const updateFunc = (swch, value, botSwch, bot_top_val, bot_valueData) => {
      dispatch(dataHasBeenUpdated(true));

      // 上面第一个组件内容富文本的值
      const contentValue = contentForm.getFieldValue("content");
      const cbTopData = {
        switchStatus: swch ?? contentSwitch,
        value: value
          ? { content: value, warnMsg }
          : { content: contentValue, warnMsg },
      };

      // 下面组件的文本form表单收集数据
      const topValue = nameForm.getFieldsValue();

      const cbBottomData = {
        switchStatus: botSwch ?? nameSwitch,
        namePart: bot_top_val
          ? { ...bot_top_val, warnMsg }
          : { ...topValue, warnMsg },
        valueData: bot_valueData ?? valueData,
      };

      const _temp = cloneDeep(activeOutline);
      const a = {
        ..._temp,
        data: {
          ..._temp.data,
          contentData: cbTopData,
          standardNameData: cbBottomData,
        },
      };
      outlineAllData[2] = a;
      dispatch(updateOutlineAllData(outlineAllData));
    };

    useEffect(() => {
      if (contentData) {
        mount = false;
        setContentSwitch(switchStatus);
        contentForm.setFieldsValue(value ?? "");
        setNameSwitch(standardNameData.switchStatus);
        nameForm.setFieldsValue(namePart);
        setValueData(standardNameData?.valueData ?? initNumPartContent);

        setTimeout(() => {
          mount = true;
        }, 500);
      }
    }, [contentData]);

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
      dispatch(dataHasBeenUpdated(true));
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
      dispatch(dataHasBeenUpdated(true));
    };

    // 一级文本更改时更新数据函数
    const lOneTxtChange = (txt, obj) => {
      const newData = cloneDeep(valueData);
      newData.map((el) => {
        if (el.id === obj.id) el.value = txt;
        return el;
      });
      setValueData(newData);
      mount && updateFunc(null, null, null, null, newData);
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
                    title={"Delete?"}
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

    const getImageIndex = (arr, index) => {
      let conut = 0;
      arr.forEach((item, itemIndex) => {
        if (item.comType == 9 && itemIndex < index) {
          const content = item.content ? JSON.parse(item.content) : [];
          // conut += content.length;
          conut += 1;
        }
      });
      return conut;
    };

    const getPropsData = (arr, item, index) => {
      if (item.comType == 9) {
        return {
          ...item,
          imageIndex: getImageIndex(arr, index),
        };
      } else {
        return item;
      }
    };

    const validateInput = (_, value) => {
      if (value) {
        const res = checkIsPositiveIntegerEx0(value);
        if (res) {
          return Promise.resolve();
        } else {
          nameForm.setFieldValue("num", "");
          return Promise.resolve();
        }
      }
    };

    return (
      <>
        <div>
          <SwitchWrapper
            label="Content"
            switchVal={contentSwitch}
            switchFunc={(data) => switchFunc(data, "contentSwitch")}
          >
            <Form
              form={contentForm}
              labelCol={{ flex: "60px" }}
              autoComplete="off"
            >
              <Item name="content">
                {/* <DcpTinymce
                onChange={(data) => richTxtChange(data)}
                className={css.introduction_top_content}
                tinymce={{ ...toolkitInit, selector: 'introduction_top_content' }}
              /> */}
                <CmTinymce
                  inline={true}
                  selectorName="introduction_top_content"
                  onChange={(data) => richTxtChange(data)}
                />
              </Item>
            </Form>
            {isdragging && <div className={css.overlay} />}
          </SwitchWrapper>

          <SwitchWrapper
            label="Partly Standard Name"
            switchVal={nameSwitch}
            switchFunc={(data) => switchFunc(data, "nameSwitch")}
          >
            <Form
              labelCol={{ flex: "60px" }}
              form={nameForm}
              autoComplete="off"
            >
              {/* 第一行 */}
              <div className={css.first_row}>
                <Item name="standardNo">
                  <Input
                    placeholder="Please fill in standard No"
                    onChange={handleChange}
                  />
                </Item>
                <span>design to</span>
                <Item name="standardContent">
                  <Input
                    placeholder="Please fill in the contents"
                    onChange={handleChange}
                  />
                </Item>
                <span>，</span>
              </div>

              {/* 第二行 */}
              <div className={css.second_row}>
                <span>composed of</span>
                <Item name="num" rules={[{ validator: validateInput }]}>
                  <Input
                    placeholder="Please fill in the contents"
                    onChange={handleChange}
                  />
                </Item>
                <span>parts</span>
              </div>
            </Form>

            <div className={`${css.bot_wrapper}`}>{renderContent()}</div>

            {isdragging && <div className={css.overlay} />}
          </SwitchWrapper>
        </div>

        <Droppable droppableId={"listIntro"}>
          {(provided, snapshot) => (
            <div
              className={css.container}
              ref={provided.innerRef}
              isdraggingover={snapshot.isdraggingover}
            >
              <div id="modalListIntro" className="modalList">
                {listData().map((item, index) => {
                  // {arr.map((item, index) => {
                  const MyCom = matchCom(item?.comType);
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={css.item}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          isdragging={snapshot.isdragging}
                          style={provided.draggableProps.style}
                          key={item.id}
                          id={item.id}
                        >
                          <MyCom
                            props={getPropsData(comList, item, index)}
                            onDelete={() => handleDelete(item)}
                            comValueUpdate={comValueUpdate}
                            arr={comList}
                            drag={{ ...provided.dragHandleProps }}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            </div>
          )}
        </Droppable>
      </>
    );
  }
);

export default Introduction;
