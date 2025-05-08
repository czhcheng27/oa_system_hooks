import React from "react";
import { Menu } from "antd";
import { createUidKey } from "@/utils";
import css from "./lineColNV.module.less";

export const mockData = [
  {
    levelOne: "a",
    value: "sadasd",
    id: "1",
    children: [
      {
        levelTwo: "1",
        value: "zxczxcxc",
        id: "54ysdugdf",
      },
      {
        levelTwo: "2",
        value: "qweqwerew",
        id: "456yvcsda",
      },
      {
        levelTwo: "3",
        value: "2345678",
        id: "erdfwser",
      },
      {
        levelTwo: "4",
        value: "hjkl;",
        id: "opmm",
      },
    ],
  },
  {
    levelOne: "b",
    value: "fghjf",
    id: "2",
    children: [
      {
        levelTwo: "1",
        value: "ertryhvd",
        id: "456bhgf",
      },
      {
        levelTwo: "2",
        value: "asdwervcw",
        id: "t6ghb",
      },
    ],
  },
  {
    levelOne: "c",
    value: "333333",
    id: "3",
    children: [
      {
        levelTwo: "1",
        value: "3333",
        id: "asdqbgfrty",
      },
      {
        levelTwo: "2",
        value: "3333",
        id: "ghv",
      },
    ],
  },
  {
    levelOne: "d",
    value: "444444",
    id: "4",
    children: [
      {
        levelTwo: "1",
        value: "4444",
        id: "wqeqw",
      },
      {
        levelTwo: "2",
        value: "444",
        id: "325tfde",
      },
    ],
  },
];

export const initTypeOneData = [
  {
    levelOne: "a",
    value: "",
    id: "leveloneId1",
    children: [
      // {
      //   levelTwo: '1',
      //   value: '',
      //   id: 'leveltwoId1',
      // },
      // {
      //   levelTwo: '2',
      //   value: '',
      //   id: 'leveltwoId2',
      // },
    ],
  },
  {
    levelOne: "b",
    value: "",
    id: "leveloneId2",
    children: [],
  },
];

export const initTypeTwoData = [
  {
    levelOne: "——",
    value: "",
    children: [],
    id: createUidKey(),
  },
];

export const typeOneObj = {
  levelOne: "",
  value: "",
  children: [
    {
      levelTwo: "1",
      value: "",
    },
    {
      levelTwo: "2",
      value: "",
    },
  ],
};

export const typeTwoObj = {
  levelOne: "——",
  value: "",
  children: [],
};

export const typePlaceholder = {
  1: "Current Type 1，*Remind：Data will be refreshed once switch type！",
  2: "Current Type 2，*Remind：Data will be refreshed once switch type！",
  3: "Current Type 3，*Remind：Data will be refreshed once switch type！",
};

// 类型选项的 menu
export const menuOpts = (
  setLeadWords,
  setSelectedType,
  setValueData,
  handleSelectType
) => {
  return (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div className={css.col1}>
              <div>
                {`a)`}
                <span></span>
                <div>:</div>
              </div>
              <div>
                {`1)`}
                <span></span>
                <div>;</div>
              </div>
            </div>
          ),
          onClick: () => (
            setLeadWords(""),
            setSelectedType("1"),
            setValueData(initTypeOneData)
          ),
        },
        {
          key: "2",
          label: (
            <div className={css.col2}>
              <div>
                <span>{`必须满足`}</span>
                <span></span>
                <div>:</div>
              </div>
              <div>
                {`——`}
                <span></span>
                <div>,</div>
              </div>
            </div>
          ),
          onClick: () => (setLeadWords(""), handleSelectType("2")),
        },
        {
          key: "3",
          label: (
            <div className={css.col2}>
              <div>
                <span>{`必须满足`}</span>
                <span></span>
                <div>:</div>
              </div>
              <div>
                {`——`}
                <span></span>
                <div>;</div>
              </div>
            </div>
          ),
          onClick: () => (setLeadWords(""), handleSelectType("3")),
        },
      ]}
    />
  );
};

// 添加按钮的下拉菜单 menu
export const addMenus = (levelOneAdd, addChildProj, clickedBtnData) => {
  return (
    <Menu
      items={[
        {
          key: "addProj",
          label: <div className={css.addProj}>项目</div>,
          onClick: () => levelOneAdd(clickedBtnData),
        },
        {
          key: "addChildProj",
          label: <div className={css.addChildProj}>子项目</div>,
          onClick: () => addChildProj(),
        },
      ]}
    />
  );
};
