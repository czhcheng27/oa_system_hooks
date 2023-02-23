import React, { useState, useEffect } from "react";
import { Input, Dropdown, Menu, Popconfirm } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { createUidKey, cloneDeep } from "../../../../../utils/index";
import DelPop from "../../delPop";
import { colorCompMap } from "../../mapConst";
import {
  typeOneObj,
  typeTwoObj,
  initTypeOneData,
  typePlaceholder,
} from "./mockConst";
import rightArrow from "./rightArrow.png";
import css from "./index.module.less";
import PopCom from "../../popCom";

const { TextArea } = Input;

const LineCol = ({ props, comValueUpdate, onDelete }) => {
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

  // 类型选项的 menu
  const items = [
    {
      key: "1",
      label: (
        <div className={css.col1}>
          <p>
            {`a)`}
            <span></span>:
          </p>
          <p>
            {`1)`}
            <span></span>;
          </p>
        </div>
      ),
      onClick: () => (
        setLeadWords(""), setSelectedType("1"), setValueData(initTypeOneData)
      ),
    },
    {
      key: "2",
      label: (
        <div className={css.col2}>
          <p>
            <span>{`Qualify`}</span>
            <span></span>:
          </p>
          <p>
            {`——`}
            <span></span>,
          </p>
        </div>
      ),
      onClick: () => (setLeadWords(""), handleSelectType("2")),
    },
    {
      key: "3",
      label: (
        <div className={css.col2}>
          <p>
            <span>{`Qualify`}</span>
            <span></span>:
          </p>
          <p>
            {`——`}
            <span></span>;
          </p>
        </div>
      ),
      onClick: () => (setLeadWords(""), handleSelectType("3")),
    },
  ];

  // type 1 : 第一层级（a级添加）
  const levelOneAdd = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const newLable = String.fromCharCode(data.levelOne.charCodeAt(0) * 1 + 1);
    newData.splice(curIndex + 1, 0, {
      ...typeOneObj,
      levelOne: newLable,
      id: createUidKey(),
      children: [{ ...typeOneObj.children[0], id: createUidKey() }],
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
                // autoSize={{ minRows: 2, maxRows: 6 }}
              />
              <div className={css.handle_btn}>
                <PlusCircleOutlined
                  onClick={() => (
                    !noChildren && levelOneAdd(el), setClickedBtnData(el)
                  )}
                />
                <PopCom
                  position={"left"}
                  title={"Sure to delete?"}
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
                      <PlusCircleOutlined />
                      <PopCom
                        position={"left"}
                        title={"Sure to delete?"}
                        // handleConfirm={() => lTwoDel(el, obj)}
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

  // 渲染类型 2 和 3
  const renderTypeTwo = () => {
    console.log("2");
  };

  const renderLineCol = () => {
    if (selectedType == "1") {
      return renderTypeOne();
    } else {
      return renderTypeTwo();
    }
  };

  return (
    <div
      style={colorCompMap[props.comType].midBg}
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <img
        style={{ position: "absolute", top: "19px", height: "18px" }}
        src={require(`../areaLeft/comps/icons/${props.comType}.png`).default}
        alt={props.desc}
      />

      {/* 选择样式 */}
      <div className={css.selector_wrapper}>
        <Input placeholder={typePlaceholder[selectedType]} readOnly />
        <Dropdown
          menu={{ items }}
          overlayClassName="lineCol_dropdown_root"
          placement="bottomLeft"
          arrow={{
            pointAtCenter: true,
          }}
          trigger={["click"]}
        >
          <div className={css.icon_btn}>
            <img src={rightArrow} style={{ width: "10px" }} />
          </div>
        </Dropdown>
      </div>

      {/* 引导语输入 */}
      <div style={{ margin: "12px 0 14px 31px" }}>
        <Input
          value={leadWords}
          onChange={(e) => setLeadWords(e.target.value)}
          placeholder="Please Input Leading Words"
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
