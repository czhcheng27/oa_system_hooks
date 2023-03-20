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
        coms: [],
      },
      {
        varIndex: "3",
        id: "3",
        name: "3.Definition",
        coms: [],
      },
      {
        varIndex: "4",
        id: "4",
        name: "4.Method",
        coms: [
          {
            comType: 1,
            code: "4.1",
            desc: "label 1",
            name: "",
            id: "mock11",
            content: '"hhhh"',
            parentIndex: "4",
            properties: {},
          },
          {
            comType: 2,
            desc: "label 2",
            id: "mock22",
            content: "",
            parentIndex: "4.1",
            properties: {},
          },
          {
            comType: 6,
            desc: "TextArea",
            id: "mock66",
            content: '"xxxxx"',
            parentIndex: "4.1.1",
            properties: {},
          },
        ],
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
  },
  {
    index: "introduction",
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
