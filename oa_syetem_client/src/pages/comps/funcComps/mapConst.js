import PrefaceImg from "./imgs/preface.svg";
import ActPreface from "./imgs/act_preface.svg";

export const categoryMap = [
  {
    label: "",
    id: "normalComps",
    compNo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

export const chapterOneComp = [
  {
    label: "",
    id: "chapterOneComp",
    compNo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

export const chapterTwoComp = [
  {
    label: "",
    id: "chapterTwoComp",
    compNo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

export const chapterThreeComp = [
  {
    label: "",
    id: "chapterThreeComp",
    compNo: [1, 2, 3, 4, 5, 13],
  },
];

export const outlineWithEyes = ["introduction", "reference"];

export const outlineIconMap = {
  Cover: require("./imgs/cover.png"),
  Preface: PrefaceImg,
  Introduction: require("./imgs/introduction.png"),
  Content: require("./imgs/content.png"),
  Reference: require("./imgs/appendix.png"),
  Appendix: require("./imgs/reference.png"),
};

export const actOutlineIconMap = {
  Cover: require("./imgs/act_cover.png"),
  Preface: ActPreface,
  Introduction: require("./imgs/act_introduction.png"),
  Content: require("./imgs/act_content.png"),
  Reference: require("./imgs/act_appendix.png"),
  Appendix: require("./imgs/act_reference.png"),
};

export const colorCompMap = {
  1: {
    left: { color: "#847bca", background: "rgba(191, 183, 248, 0.12)" },
    midBg: {
      background: "rgba(242,241,254,0.27)",
      border: "1px solid #E6ECFF",
    },
    midTxt: { color: "#8B80C5" },
    delIcon: { color: "#9E97D5" },
  },
  2: {
    left: { color: "#847bca", background: "rgba(191, 183, 248, 0.12)" },
    midBg: {
      background: "rgba(242,241,254,0.27)",
      border: "1px solid #E6ECFF",
    },
    midTxt: { color: "#8B80C5" },
    delIcon: { color: "#9E97D5" },
  },
  3: {
    left: { color: "#847bca", background: "rgba(191, 183, 248, 0.12)" },
    midBg: {
      background: "rgba(242,241,254,0.27)",
      border: "1px solid #E6ECFF",
    },
    midTxt: { color: "#8B80C5" },
    delIcon: { color: "#9E97D5" },
  },
  4: {
    left: { color: "#847bca", background: "rgba(191, 183, 248, 0.12)" },
    midBg: {
      background: "rgba(242,241,254,0.27)",
      border: "1px solid #E6ECFF",
    },
    midTxt: { color: "#8B80C5" },
    delIcon: { color: "#9E97D5" },
  },
  5: {
    left: { color: "#847bca", background: "rgba(191, 183, 248, 0.12)" },
    midBg: {
      background: "rgba(242,241,254,0.27)",
      border: "1px solid #E6ECFF",
    },
    midTxt: { color: "#8B80C5" },
    delIcon: { color: "#9E97D5" },
  },
  6: {
    left: {
      background: "rgba(255, 183, 154, 0.2)",
      color: "#d19980",
      boxShadow: "0 4px 8px 0 #d1998036",
    },
    midBg: {
      background: "rgba(255,241,235,0.32)",
      border: "1px solid rgba(209,153,128,0.10)",
    },
    midTxt: { color: "#CD9A89" },
    delIcon: { color: "#D19980" },
  },
  7: {
    left: {
      background: "rgba(185, 235, 165, 0.18)",
      color: "#56b277",
      boxShadow: "0 4px 8px 0 #B6D9C335",
    },
    midBg: { background: "rgba(185, 235, 165, 0.18)" },
    midTxt: { color: "rgb(86, 178, 119)" },
    delIcon: { color: "#56b277" },
  },
  8: {
    left: {
      background: "#F2FAFF",
      color: "#81AFCF",
      boxShadow: "0 4px 8px 0 #73a6cc2e",
    },
    midBg: {
      background: "#F7FBFE",
      border: "1px solid rgba(136,178,207,0.19)",
    },
    delIcon: { color: "#88B2CF" },
  },
  9: {
    left: {
      background: "#f0f3fb",
      color: "#6076B7",
      boxShadow: "0 4px 8px 0 #a5c1eb59",
    },
    midBg: {
      background: "#f0f3fb",
      border: "1px solid rgba(129,147,194,0.17)",
    },
    midTxt: { color: "#242F57" },
    delIcon: { color: "#242F57" },
  },
  10: {
    left: {
      background: "#EFF3FF",
      color: "#8193C2",
      boxShadow: "0 4px 8px 0 #788ece2e",
    },
    midBg: {
      background: "rgb(244, 247, 253)",
      border: "1px solid rgba(129,147,194,0.17)",
    },
    midTxt: { color: "#f4f7fd" },
    delIcon: { color: "#8193C2" },
  },
  11: {
    left: {
      background: "#FBF8F0",
      color: "#C1AC6B",
      boxShadow: "0 4px 8px 0 #bea35d2e",
    },
    midBg: { background: "#FCFBF4" },
    midTxt: { color: "#C1AC6B" },
    delIcon: { color: "#C1AC6B" },
  },
  12: {
    left: {
      background: "#F1EFFB",
      color: "#927CD6",
      boxShadow: "0 4px 8px 0 #865eff2e",
    },
    midBg: {
      background: "rgba(183,165,235,0.08)",
      border: "1px solid rgba(146,124,214,0.19)",
    },
    midTxt: { color: "#927CD6" },
    delIcon: { color: "#927CD6" },
  },
  13: {
    left: {
      background: "#E9FAF7",
      color: "#93ADA6",
      boxShadow: "0 4px 8px 0 #DCEEEC",
    },
    midBg: { background: "#EEF9F8", border: "1px solid #94b1aa1a" },
    midTxt: { color: "#94B1AA" },
    delIcon: { color: "#94B1AA" },
  },
};
