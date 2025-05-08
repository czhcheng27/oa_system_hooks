import {
  intro_contentData_warnMsg,
  intro_standardNameData_namePart_warnMsg,
  intro_standardNameData_valueData_warnMsg,
  preface_basisStd_warnMsg,
  preface_fileRel_valueData_warnMsg,
  preface_fileRel_warnMsg,
  preface_replaceFile_valueData_warnMsg,
  preface_replaceFile_warnMsg,
  preface_infoPanel_warnMsg,
  preface_versionInfo_valueData_warnMsg,
} from "./warnMsg";

export const initOutline = [
  {
    id: "cover",
    index: "cover",
    name: "Cover",
    children: [],
    data: {
      standardName: "Sample",
      standardNo: "",
      systemNo: "",
      replaceNo: "",
      publishDate: "",
      implementDate: "",
    },
  },
  {
    id: "preface",
    index: "preface",
    name: "Preface",
    children: [],
    data: {
      basisStd: {
        stdNo: "",
        stdName: "",
        switchStatus: false,
        warnMsg: preface_basisStd_warnMsg,
      },
      fileRel: {
        switchStatus: false,
        infoData: {
          stdNo: "",
          stdName: "",
          partNo: "",
          publishedNo: "",
          warnMsg: preface_fileRel_warnMsg,
        },
        valueData: [
          {
            partNo: "",
            contentTxt: "",
            id: "initContentId",
            warnMsg: preface_fileRel_valueData_warnMsg,
          },
        ],
      },
      replaceFile: {
        switchStatus: false,
        infoData: {
          stdNo: "",
          stdName: "",
          publishedNo: "",
          warnMsg: preface_replaceFile_warnMsg,
        },
        valueData: [
          {
            symbol: "a",
            value: "",
            unicode: 97,
            id: "replaceFileId1",
            warnMsg: preface_replaceFile_valueData_warnMsg,
          },
        ],
      },
      infoPanel: {
        drafterCompany: "",
        drafterPerson: "",
        switchStatus: true,
        warnMsg: preface_infoPanel_warnMsg,
      },
      versionInfo: {
        isRevisedVersion: false,
        valueData: [
          {
            value: "",
            id: "reviseVersionId1",
            warnMsg: preface_versionInfo_valueData_warnMsg,
          },
        ],
      },
    },
  },
  {
    id: "introduction",
    varIndex: "0",
    name: "Introduction",
    visible: false,
    children: [],
    coms: [],
    data: {
      contentData: {
        switchStatus: false,
        value: null,
        warnMsg: intro_contentData_warnMsg,
      },
      standardNameData: {
        switchStatus: false,
        namePart: {
          standardNo: "",
          standardContent: "",
          num: "",
          warnMsg: intro_standardNameData_namePart_warnMsg,
        },
        valueData: [
          {
            partNum: "1",
            value: "",
            id: "leveloneId1",
            warnMsg: intro_standardNameData_valueData_warnMsg,
          },
        ],
      },
    },
  },
  {
    id: "content",
    index: "content",
    name: "Content",
    children: [
      {
        varIndex: "1",
        id: "1",
        name: "1.Scope",
        data: {
          state: {
            switchStatus: false,
            value: "",
          },
          scope: {
            switchStatus: false,
            value: "",
          },
        },
        coms: [],
      },
      {
        varIndex: "2",
        id: "2",
        visible: true,
        name: "2.Files",
        data: {
          noQuote: true,
          valueData: [
            {
              symbol: "a",
              value: "",
              id: "withQuoteObjId1",
            },
          ],
        },
        coms: [],
      },
      {
        varIndex: "3",
        id: "3",
        visible: true,
        name: "3.Definition",
        data: { radioOpt: 1, content: "" },
        coms: [],
      },
    ],
  },
  {
    varIndex: "appendix",
    id: "appendix",
    index: "appendix",
    name: "Reference",
    children: [],
    data: "",
  },
  {
    id: "reference",
    index: "reference",
    name: "Appendix",
    visible: false,
    children: [],
    data: [],
  },
];

export const mockOutline = [
  {
    id: "cover",
    index: "cover",
    name: "Cover",
    children: [],
    data: {
      standardName: "",
      standardNo: "",
      systemNo: "",
      replaceNo: "",
      publishDate: "",
      implementDate: "",
    },
  },
  {
    id: "preface",
    index: "preface",
    name: "Preface",
    children: [],
    data: {},
  },
  {
    id: "introduction",
    index: "introduction",
    name: "Introduction",
    children: [],
  },
  {
    id: "content",
    index: "content",
    name: "Content",
    children: [],
  },
  {
    id: "appendix",
    index: "appendix",
    name: "Reference",
    children: [],
  },
  {
    id: "reference",
    index: "reference",
    name: "Appendix",
    children: [],
  },
];

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
