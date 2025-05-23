// 模拟 getJsonAPI 接口拿到的假数据
export const getJsonAPI = {
  code: 200,
  success: true,
  data: {
    cover: "{}", // JSON
    introduction: "{}", // JSON
    mainBody: [
      {
        varIndex: "1",
        id: "1",
        name: "1.Scope",
        coms: [
          {
            comType: 9,
            desc: "Table",
            name: "",
            id: "mock9",
            content: "",
            parentIndex: "1.1.1",
            properties: {},
          },
          {
            comType: 1,
            code: "1.1",
            desc: "label 1",
            name: "",
            id: "mock1",
            content: '"this is a mock data label 1"',
            parentIndex: "1",
            properties: {},
          },
          {
            comType: 2,
            code: "1.1.1",
            desc: "label 2",
            name: "",
            id: "mock2",
            content: '"this is a mock data label 2"',
            parentIndex: "1.1",
            properties: {},
          },
          {
            comType: 6,
            desc: "TextArea",
            name: "TextArea",
            id: "mock6",
            content: "",
            parentIndex: "1.1.1",
            properties: {},
          },
        ],
      },
      {
        varIndex: "2",
        id: "2",
        name: "2.Import Multi Files",
        visible: true,
        coms: [],
      },
      {
        varIndex: "3",
        id: "3",
        name: "3.Definition",
        visible: true,
        coms: [],
      },
    ],
  },
};

export const mockOutline = [
  {
    index: "cover",
    id: "cover",
    name: "Cover",
    children: [],
  },
  {
    index: "preface",
    id: "preface",
    name: "Preface",
    children: [],
    data: {
      basisStd: {
        stdNo: "",
        stdName: "",
        switchStatus: true,
      },
      fileRel: {
        switchStatus: true,
        infoData: {
          stdNo: "",
          stdName: "",
          partNo: "",
          publishedNo: "",
        },
        valueData: [
          {
            partNo: "",
            contentTxt: "",
            id: "initContentId",
          },
        ],
      },
      replaceFile: {
        switchStatus: true,
        infoData: {
          stdNo: "",
          stdName: "",
          publishedNo: "",
        },
        valueData: [
          {
            symbol: "a",
            value: "",
            unicode: 97,
            id: "replaceFileId1",
          },
        ],
      },
      versionInfo: {
        isFirstLunch: true,
        valueData: [
          {
            value: "",
            id: "reviseVersionId1",
          },
        ],
      },
    },
  },
  {
    varIndex: "0",
    id: "introduction",
    name: "Introduction",
    children: [],
    coms: [],
    data: {
      contentData: {
        switchStatus: true,
        value: null,
      },
      standardNameData: {
        switchStatus: true,
        namePart: {
          standardNo: "",
          standardContent: "",
          num: "",
        },
        valueData: [
          {
            partNum: "1",
            value: "",
            id: "leveloneId1",
          },
        ],
      },
    },
  },
  {
    index: "content",
    id: "content",
    name: "Content",
    children: [],
  },
  {
    index: "reference",
    id: "reference",
    name: "Reference",
    children: [],
  },
  {
    index: "appendix",
    id: "appendix",
    name: "Appendix",
    children: [],
  },
];

export const tempActOutline = {
  index: "1",
  name: "1.Scope",
  coms: [],
};

export const numToSymbol = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
  7: "g",
  8: "h",
  9: "i",
  10: "j",
  11: "k",
  12: "l",
  13: "m",
  14: "n",
  15: "o",
  16: "p",
  17: "q",
  18: "r",
  19: "s",
  20: "t",
  21: "u",
  22: "v",
  23: "w",
  24: "x",
  25: "y",
  26: "z",
};
