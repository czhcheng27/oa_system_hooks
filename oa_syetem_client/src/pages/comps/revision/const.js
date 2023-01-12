import Text1 from "./components/text1/index";
import Text2 from "./components/text2/index";
import Text3 from "./components/text3/index";
import MainText from "./components/mainText/index";

export const coms = [
  {
    type: "1",
    id: "11",
    title: "label 1",
    componentName: "Text1",
    values: {
      label: "",
      text: "",
    },
  },
  {
    type: "2",
    id: "22",
    title: "label 2",
    componentName: "Text2",
    values: {
      label: "",
      text: "",
    },
  },
  {
    type: "3",
    id: "33",
    title: "label 3",
    componentName: "Text3",
    values: {
      label: "",
      text: "",
    },
  },
  {
    type: "6",
    id: "66",
    title: "TextArea",
    componentName: "MainText",
    values: {
      text: "",
    },
  },
];

export const matchCom = (key) => {
  const all = {
    Text1,
    Text2,
    Text3,
    MainText,
  };
  return all[key];
};
