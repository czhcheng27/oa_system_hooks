import React, { useState, useEffect } from "react";
import { Input, Dropdown } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey } from "@/utils";
import DelPop from "@/pages/comps/revision/delPop";
import PopCom from "@/pages/comps/revision/popCom";
import SelectOpts from "./selectOpts";
import { colorCompMap } from "../../mapConst";
import {
  typeOneObj,
  typeTwoObj,
  initTypeOneData,
  typePlaceholder,
} from "./mockConst";
import css from "./index.module.less";

const { TextArea } = Input;

let mount = true;

const LineCol = ({ props, comValueUpdate, onDelete, drag }) => {
  const { content, id, properties } = props;

  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [selectedType, setSelectedType] = useState("1");
  const [valueData, setValueData] = useState(initTypeOneData);
  const [leadWords, setLeadWords] = useState("");
  const [clickedBtnData, setClickedBtnData] = useState();

  const handleSelectType = (type) => {
    setSelectedType(type);
    setValueData([{ ...typeTwoObj, id: createUidKey() }]);
  };

  // 添加按钮的下拉菜单 menu
  const items = [
    {
      key: "addProj",
      label: <div className={css.addProj}>First Level</div>,
      onClick: () => levelOneAdd(clickedBtnData),
    },
    {
      key: "addChildProj",
      label: <div className={css.addChildProj}>Sub Level</div>,
      onClick: () => addChildProj(),
    },
  ];

  // 无子项目时，点击添加按钮，添加子项目方法
  const addChildProj = () => {
    const newData = cloneDeep(valueData);
    newData.forEach((el) => {
      if (el.levelOne == clickedBtnData.levelOne) {
        el.children.push(
          {
            levelTwo: "1",
            id: createUidKey(),
            value: "",
          },
          {
            levelTwo: "2",
            id: createUidKey(),
            value: "",
          }
        );
      }
      return el;
    });
    setValueData(newData);
  };

  // type 1 : 第一层级（a级添加）
  const levelOneAdd = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const newLable = String.fromCharCode(data.levelOne.charCodeAt(0) * 1 + 1);
    newData.splice(curIndex + 1, 0, {
      ...typeOneObj,
      levelOne: newLable,
      id: createUidKey(),
      children: [
        // { ...typeOneObj.children[0], id: createUidKey() },
        // { ...typeOneObj.children[1], id: createUidKey() },
      ],
    });
    const preArr = newData.slice(0, curIndex + 2);
    if (valueData.length > 1) {
      const afterArr = newData.slice(curIndex + 2);
      afterArr.forEach((el) => {
        el.levelOne = String.fromCharCode(el.levelOne.charCodeAt(0) * 1 + 1);
        return el;
      });
    }
    setValueData(newData);
  };

  // type 1 : 第一层级（a级删除）
  const levelOneDel = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const preArr = newData.slice(0, curIndex);
    const afterArr = newData.slice(curIndex + 1);
    afterArr.forEach((el) => {
      el.levelOne = String.fromCharCode(el.levelOne.charCodeAt(0) * 1 - 1);
      return el;
    });
    setValueData([...preArr, ...afterArr]);
  };

  // type 1 : 第二层级（ 1）添加）
  const lTwoAdd = (data, obj) => {
    const newData = cloneDeep(valueData);
    newData.forEach((el) => {
      if (el.levelOne == data.levelOne) {
        const curIndex = el.children.findIndex((el) => el.id === obj.id);
        el.children.splice(curIndex + 1, 0, {
          levelTwo: (obj.levelTwo * 1 + 1).toString(),
          id: createUidKey(),
          value: "",
        });
        const afterArr = el.children.slice(curIndex + 2);
        afterArr.forEach((el) => {
          el.levelTwo = (el.levelTwo * 1 + 1).toString();
          return el;
        });
      }
      return el;
    });
    setValueData(newData);
  };

  // type 1 : 第二层级（ 1）级删除）
  const lTwoDel = (data, obj) => {
    const newData = cloneDeep(valueData);
    newData.forEach((el) => {
      if (el.levelOne == data.levelOne) {
        const filterData = el.children.filter((el) => el.id !== obj.id);
        for (let i = 0; i < filterData.length; i++) {
          filterData[i].levelTwo = (i + 1).toString();
        }
        el.children = filterData;
      }
      return el;
    });
    setValueData(newData);
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

  // 第二级文本更改时更新数据函数
  const lTwoTxtChange = (txt, data, obj) => {
    const newData = cloneDeep(valueData);
    newData.forEach((el) => {
      if (el.levelOne === data.levelOne) {
        el.children.forEach((item) => {
          if (item.levelTwo == obj.levelTwo) item.value = txt;
        });
      }
      return el;
    });
    setValueData(newData);
  };

  // 渲染类型 type 1
  const renderTypeOne = () => {
    const disable = valueData.length === 1;
    return (
      valueData.length &&
      valueData.map((el, index) => {
        const noChildren = el.children.length === 0;
        return (
          <div key={index} className={css.type_wrapper}>
            <div className={css.levelOne}>
              <p className={css.levelOne_label}>{`${el.levelOne})`}</p>
              <TextArea
                rows={3}
                value={el.value}
                onChange={(e) => lOneTxtChange(e.target.value, el)}
                // autoSize={{ minRows: 2, maxRows: 6 }}
              />
              <div className={css.handle_btn}>
                <Dropdown
                  menu={{ items }}
                  overlayClassName="add_selection"
                  placement="right"
                  disabled={!noChildren}
                  arrow={{
                    pointAtCenter: true,
                  }}
                  trigger={["click"]}
                >
                  <PlusCircleOutlined
                    onClick={() => (
                      !noChildren && levelOneAdd(el), setClickedBtnData(el)
                    )}
                  />
                </Dropdown>
                <PopCom
                  position={"left"}
                  title={"Delete?"}
                  disable={disable}
                  handleConfirm={() => !disable && levelOneDel(el)}
                >
                  {
                    <MinusCircleOutlined
                      className={classNames({ [css.diable_hover]: disable })}
                    />
                  }
                </PopCom>
              </div>
            </div>
            {!!el.children.length &&
              el.children.map((obj, index) => {
                return (
                  <div key={index} className={css.levelTwo}>
                    <p>{`${obj.levelTwo})`}</p>
                    <TextArea
                      rows={2}
                      value={obj.value}
                      onChange={(e) => lTwoTxtChange(e.target.value, el, obj)}
                    />
                    <div className={css.handle_btn}>
                      <PlusCircleOutlined onClick={() => lTwoAdd(el, obj)} />
                      <PopCom
                        position={"left"}
                        title={"Delete?"}
                        handleConfirm={() => lTwoDel(el, obj)}
                      >
                        {<MinusCircleOutlined />}
                      </PopCom>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })
    );
  };

  // 类型 2 和 3 的添加/删除按钮的方法
  const typeTwoAction = (data, action) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    if (action === "add") {
      newData.splice(curIndex + 1, 0, { ...typeTwoObj, id: createUidKey() });
    } else if (action === "del") {
      newData.splice(curIndex, 1);
    }
    setValueData(newData);
  };

  // 渲染类型 2 和 3
  const renderTypeTwo = () => {
    const disable = valueData.length === 1;
    return (
      !!valueData.length &&
      valueData.map((el, index) => {
        return (
          <div key={index} className={css.type_wrapper}>
            <div className={css.levelOne}>
              <p
                style={{ width: "48px" }}
                className={css.levelOne_label}
              >{`——`}</p>
              <TextArea
                value={el.value}
                onChange={(e) => lOneTxtChange(e.target.value, el)}
              />
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => typeTwoAction(el, "add")} />
                <PopCom
                  position={"left"}
                  title={"Delete?"}
                  disable={disable}
                  handleConfirm={() => !disable && typeTwoAction(el, "del")}
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

  const renderLineCol = () => {
    if (selectedType == "1") {
      return renderTypeOne();
    } else {
      return renderTypeTwo();
    }
  };

  const initFunc = () => {
    mount = false;
    const { type, leadWords } = properties;
    setValueData(content ? JSON.parse(content) : initTypeOneData);
    setSelectedType(type);
    setLeadWords(leadWords);
    setTimeout(() => {
      mount = true;
    }, 800);
  };

  useEffect(() => {
    props && initFunc();
  }, [props]);

  useEffect(() => {
    const newProperties = {
      leadWords,
      type: selectedType,
    };
    mount && comValueUpdate(id, valueData, newProperties);
  }, [leadWords, selectedType, valueData]);

  return (
    <div
      {...drag}
      style={colorCompMap[props.comType].midBg}
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <img
        style={{ position: "absolute", top: "19px", height: "18px" }}
        src={require(`../areaLeft/comps/icons/${props.comType}.png`)}
        alt={props.desc}
      />

      {/* 选择样式 */}
      <div className={css.selector_wrapper}>
        <Input placeholder={typePlaceholder[selectedType]} readOnly />
        <SelectOpts
          props={{
            setLeadWords,
            setSelectedType,
            setValueData,
            handleSelectType,
          }}
        />
      </div>

      {/* 引导语输入 */}
      <div style={{ margin: "12px 0 14px 31px" }}>
        <Input
          value={leadWords}
          onChange={(e) => setLeadWords(e.target.value)}
          placeholder="Please type in introduce word"
        />
      </div>

      {/* 相应类型样式渲染 */}
      <div>{renderLineCol()}</div>
      <DelPop
        props={props}
        onDelete={onDelete}
        setBtnClicked={setBtnClicked}
        hoverStatus={hoverStatus}
        setHoverStatus={setHoverStatus}
      />
    </div>
  );
};

export default LineCol;
