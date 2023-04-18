import React, { useState, useEffect, useRef } from "react";
import { Tabs, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { apiData, typeArray } from "./const";
import css from "./index.module.less";

const { TabPane } = Tabs;

const TodoList = (props) => {
  const [listData, setListData] = useState(apiData);
  const [actIdx, setActIdx] = useState(0);
  const [typeOffsetTop, setTypeOffsetTop] = useState(0);

  const getProjectNum = () => {
    return listData.reduce((pre, item) => {
      pre = pre + item.changeInfoList.length;
      return pre;
    }, 0);
  };

  const tabsChange = (key) => {
    setListData(key == "01" ? apiData : []);
  };

  const itemClick = (index) => {
    setActIdx(index);
    setTypeOffsetTop(index * 50);
  };

  return (
    <div className={css.todoList_wrap}>
      <div className={css.headerArea}>
        <div className={`${css.titleArea}`}>To Do List</div>
      </div>
      <div>
        <div
          style={{
            width: "210px",
            height: "100%",
            float: "left",
            borderRight: "#F1F4F7 solid 1px",
          }}
        >
          <Tabs centered onChange={tabsChange}>
            {typeArray.map((el) => {
              return (
                <TabPane tab={el.text} key={el.value}>
                  {/* numbers area */}
                  <div className={css.countNumDiv}>
                    <div className={css.chowInfoDiv}>
                      <p className={css.countClass}>{listData.length}</p>
                      <p className={css.lableClass}>Proj Num</p>
                    </div>
                    <div className={css.chowInfoDiv}>
                      <p className={css.countClass}>{getProjectNum()}</p>
                      <p className={css.lableClass}>Total Num</p>
                    </div>
                  </div>

                  {/* search area */}
                  <div style={{ marginTop: "10px" }}>
                    <Input
                      allowClear
                      className={css.inputClass}
                      suffix={<SearchOutlined />}
                      placeholder="Search Project No."
                    />
                  </div>

                  {/* list area */}
                  <div className={css.listSelectDiv}>
                    <div
                      className={css.typeActiveCard}
                      style={{
                        top: typeOffsetTop + "px",
                      }}
                    />
                    {!!listData.length &&
                      listData.map((item, index) => {
                        const { projectName, changeInfoList } = item;
                        return (
                          <div
                            key={index}
                            className={css.leftCardDiv}
                            onClick={() => itemClick(index)}
                          >
                            <div className={css.cardDiv}>
                              <div className={css.ecrNum}>
                                <div
                                  className={`${css.iconNor} ${
                                    actIdx == index ? css.icon : ""
                                  }`}
                                  style={{
                                    marginLeft: "6px",
                                  }}
                                ></div>
                                <div>
                                  <p
                                    className={css.nameSpan}
                                    style={{
                                      color:
                                        actIdx == index ? "white" : "#1f2631",
                                    }}
                                  >
                                    {projectName}
                                  </p>
                                  <p className={css.countClass}>
                                    Total No.：{changeInfoList.length}
                                    <span style={{ marginLeft: "5px" }}>
                                      / item
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {!listData.length && (
                      <div
                        style={{ margin: "67px", color: "rgba(0, 0, 0, 0.85)" }}
                      >
                        No Data Yet
                      </div>
                    )}
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
        <div className={css.content}>right</div>
      </div>
    </div>
  );
};

export default TodoList;
