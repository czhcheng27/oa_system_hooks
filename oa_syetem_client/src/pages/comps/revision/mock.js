// 模拟 getJsonAPI 接口拿到的假数据
export const getJsonAPI = {
  code: 200,
  success: true,
  data: {
    cover: "{}", // JSON
    introduction: "{}", // JSON
    mainBody: [
      {
        index: "1",
        name: "1.Scope",
        coms: [
          {
            comType: 1,
            desc: "label 1",
            id: "mock1",
            content: {
              title: "制造方法",
              num: "1.1",
            },
            parentIndex: "1",
            properties: {},
          },
          {
            comType: 2,
            desc: "label 2",
            id: "mock2",
            content: {
              title: "制造方法详细步骤",
              num: "1.1.1",
            },
            parentIndex: "1.1",
            properties: {},
          },
          {
            comType: 6,
            desc: "TextArea",
            id: "mock6",
            content: "xxxxx",
            parentIndex: "1.1.1",
            properties: {},
          },
        ],
      },
      {
        index: "2",
        name: "2.Import Multi Files",
        coms: [],
      },
      {
        index: "3",
        name: "3.Definition",
        coms: [],
      },
      {
        index: "4",
        name: "4.Method",
        coms: [
          {
            comType: 1,
            desc: "label 1",
            id: "mock11",
            content: {
              title: "制造方法",
              num: "4.1",
            },
            parentIndex: "4",
            properties: {},
          },
          {
            comType: 2,
            desc: "label 2",
            id: "mock22",
            content: {
              title: "制造方法详细步骤",
              num: "4.1.1",
            },
            parentIndex: "4.1",
            properties: {},
          },
          {
            comType: 6,
            desc: "TextArea",
            id: "mock66",
            content: "xxxxx",
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
    name: "Cover",
    children: [],
  },
  {
    index: "introduction",
    name: "Introduction",
    children: [],
  },
  {
    index: "content",
    name: "Content",
    children: [],
  },
  {
    index: "reference",
    name: "Reference",
    children: [],
  },
  {
    index: "appendix",
    name: "Appendix",
    children: [],
  },
];

export const tempActOutline = {
  index: "1",
  name: "1.Scope",
  coms: [],
};
