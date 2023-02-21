import { createUidKey } from "../../../../../utils/index";
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
      {
        levelTwo: "1",
        value: "",
        id: "leveltwoId1",
      },
    ],
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
  ],
};

export const typeTwoObj = {
  levelOne: "——",
  value: "",
  children: [],
};

export const typePlaceholder = {
  1: "Current Select Type One，*Note：Switch Type Will Refresh Data！",
  2: "Current Select Type Two，*Note：Switch Type Will Refresh Data！",
  3: "Current Select Type Three，*Note：Switch Type Will Refresh Data！",
};
