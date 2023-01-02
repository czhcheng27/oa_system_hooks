import Icon1 from "./assets/1.png";
import Icon2 from "./assets/2.png";
import Icon3 from "./assets/3.png";
import Icon4 from "./assets/4.png";
import Icon5 from "./assets/5.png";
import Icon6 from "./assets/6.png";
import Icon7 from "./assets/7.png";
import Icon8 from "./assets/8.png";
import Icon9 from "./assets/9.png";
import Icon10 from "./assets/10.png";

const initial = {
  columns: {
    "column-0": {
      id: "column-0",
      title: "Selected",
      // items: getItems(100),
      items: [
        {
          id: "1",
          text: "1",
          icon: Icon1,
        },
        {
          id: "2",
          text: "2",
          icon: Icon2,
        },
        {
          id: "3",
          text: "3",
          icon: Icon3,
        },
        {
          id: "4",
          text: "4",
          icon: Icon4,
        },
        {
          id: "5",
          text: "5",
          icon: Icon5,
        },
      ],
    },
    "column-1": {
      id: "column-1",
      title: "Options",
      // items: getItems(100),
      items: [
        {
          id: "6",
          text: "6",
          icon: Icon6,
        },
        {
          id: "7",
          text: "7",
          icon: Icon7,
        },
        {
          id: "8",
          text: "8",
          icon: Icon8,
        },
        {
          id: "9",
          text: "9",
          icon: Icon9,
        },
        {
          id: "10",
          text: "10",
          icon: Icon10,
        },
      ],
    },
  },
  columnOrder: ["column-0", "column-1"],
};

export default function getInitialData() {
  return initial;
}
