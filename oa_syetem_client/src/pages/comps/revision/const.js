import Text1 from "./components/text1/index";
import Text2 from "./components/text2/index";
import Text3 from "./components/text3/index";
import TextArea from "./components/textArea/index";
import RichList from "./components/richList/index";
import Formula from "./components/formula/index";
import Formula1 from "./components/formula/index1";
import LineCol from "./components/lineCol/index";
import Notes from "./components/notes";
import TinyTable from "./components/tinyTable";

export const independentComps = [
  "cover",
  "preface",
  "introduction",
  "reference",
  "appendix",
];

export const coms = [
  {
    comType: 1,
    desc: "label 1",
    name: "",
    content: "",
    parentIndex: "4",
    properties: {},
  },
  {
    comType: 2,
    desc: "label 2",
    name: "",
    content: "",
    parentIndex: "4.1",
    properties: {},
  },
  {
    comType: 3,
    desc: "label 3",
    name: "",
    content: "",
    parentIndex: "4.1.2",
    properties: {},
  },
  {
    comType: 6,
    desc: "TextArea",
    name: "TextArea",
    content: "",
    parentIndex: "4.1.2",
    properties: {},
  },
  // {
  //   comType: 7,
  //   desc: "Options",
  //   content: "<span>1</span>",
  //   parentIndex: "4.1.2",
  //   properties: {},
  // },
  {
    comType: 8,
    desc: "Options",
    name: "",
    content: "",
    parentIndex: "",
    properties: {
      type: "1",
      leadWords: "",
    },
  },
  {
    comType: 9,
    desc: "Table",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 10,
    desc: "Notes",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 12,
    desc: "Formula",
    name: "Formula",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 13,
    desc: "Formula1",
    name: "Formula1",
    content: "",
    parentIndex: "",
    properties: {},
  },
];

export const matchCom = (key) => {
  const all = {
    1: Text1,
    2: Text2,
    3: Text3,
    6: TextArea,
    7: RichList,
    8: LineCol,
    9: TinyTable,
    10: Notes,
    12: Formula,
    13: Formula1,
  };
  return all[key];
};

export const toolkitInit = {
  inline: true,
  toolbar_mode: "wrap",
  plugins:
    "print preview autolink directionality visualblocks visualchars fullscreen image link media templat search replace code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattel help emoticons autosave kityformula-editor",
  toolbar: [
    "alignleft aligncenter alignright alignjustify| blockauote subscript superscript removeformat styleselect formatselect fontselect fontsizeselect| charmap fullscreen kityformula-editor",
  ],
  menubar: "false",
  placeholder: "Please fill in the contents",
};
