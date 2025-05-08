import Text1 from "./components/text1/index";
import Text2 from "./components/text2/index";
import Text3 from "./components/text3/index";
import Text4 from "./components/text4/index";
import Text5 from "./components/text5/index";
import TextArea from "./components/textArea/index";
import TinyTable from "./components/tinyTable/index";
import Formula from "./components/formula/index";
// import Notes from './components/notes/index';
import Notes from "./components/notes/index1";
import FootNotes from "./components/footNotes/index";
import LineCol from "./components/lineCol";
import TechTerm from "./components/techTerm";

export const independentComps = [
  "cover",
  "preface",
  "introduction",
  "reference",
  "appendix",
];

export const hasRichTextNum = [10, 12];

export const coms = [
  {
    comType: 1,
    desc: "label 1",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 2,
    desc: "label 2",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 3,
    desc: "label 3",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 4,
    desc: "label 4",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 5,
    desc: "label 5",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 6,
    desc: "TextArea",
    name: "TextArea",
    content: "",
    parentIndex: "",
    properties: {},
  },
  {
    comType: 7,
    desc: "Foot Notes",
    name: "Foot Notes",
    content: "",
    parentIndex: "",
    properties: {},
  },
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
  // {
  //   comType: 9,
  //   desc: "Image",
  //   name: "",
  //   content: "",
  //   parentIndex: "",
  //   properties: {},
  // },
  {
    comType: 10,
    desc: "Table",
    name: "",
    content: "",
    parentIndex: "",
    properties: {},
  },
  // {
  //   comType: 11,
  //   desc: "注",
  //   name: "注",
  //   content: "",
  // content: '{"notesList":[{"label":""}],"footnoteList":[{"label":"","code":"a1"}]}',
  //   parentIndex: "",
  //   properties: {},
  // },

  {
    comType: 12,
    desc: "Formula",
    name: "Formula",
    content: "",
    parentIndex: "",
    properties: {
      claimData: "",
      withQuote: "1",
      quoteNo: "",
    },
  },
  {
    comType: 13,
    desc: "Tech Notes",
    name: "Tech Notes",
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
    4: Text4,
    5: Text5,
    6: TextArea,
    7: FootNotes,
    8: LineCol,
    // 9: ImageCol,
    10: TinyTable,
    11: Notes,
    12: Formula,
    13: TechTerm,
  };
  return all[key];
};

export const tinymceInit = {
  toolbar_mode: "wrap",
  plugins:
    "preview autolink directionality visualblocks visualchars fullscreen image link media code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help emoticons autosave kityformula-editor",
  toolbar: [
    "code undo redo restoredraft| cut copy paste pastetext |forecolor backcolor bold italic underline strikethroug link anchor| alignleft aligncenter alignright alignjustify | outdent indent | blockauote subscript superscript removeformat styleselect formatselect fontselect fontsizeselect| bullist numlist |table | media charmap emoticons | pagebreak insertdatetime preview |image |fullscreen kityformula-editor",
  ],
};

export const toolkitInit = {
  inline: true,
  toolbar_mode: "wrap",
  plugins:
    "preview autolink directionality visualblocks visualchars fullscreen image link media code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help emoticons autosave kityformula-editor",
  toolbar: [
    "alignleft aligncenter alignright alignjustify| blockauote subscript superscript removeformat styleselect formatselect fontselect fontsizeselect| charmap fullscreen kityformula-editor",
  ],
  menubar: "false",
  placeholder: "Please input",
};

export const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
