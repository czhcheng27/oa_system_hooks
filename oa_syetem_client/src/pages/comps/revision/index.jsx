import React from "react";
import classNames from "classnames";

// const docx = require('docx-preview');
import AreaDoc from "./components/areaDoc";
import AreaCenter from "./components/areaCenter";
import AreaLeft from "./components/areaLeft";
import { cloneDeep } from "lodash";
import { coms, matchCom } from "./const";
import css from "./index.module.less";

export default class Revision extends React.Component {
  state = {
    comList: [
      {
        type: "1",
        title: "label 1",
        componentName: "Text1",
        values: {
          label: "",
          text: "",
        },
      },
    ],
    num: undefined, // 选中的组件索引
  };

  addCom = (item, num = this.state.comList.length) => {
    console.log("index-addCom-item", item, num);
    // const { comList } = this.state;
    const comList = cloneDeep(this.state.comList);
    const currentCom = coms.find((it) => it.type == item);
    comList.splice(num, 0, currentCom);
    this.setState({ comList });
    console.log("comList", this.state.comList);
  };

  render() {
    const { comList } = this.state;
    return (
      <div className={classNames(css.revision)}>
        <div className={css.left}>
          <AreaLeft addCom={(data, num) => this.addCom(data, num)} />
        </div>
        <div className={css.center}>
          <AreaCenter
            comList={comList}
            resetOrder={(data) => {
              this.setState({ comList: data });
            }}
          />
        </div>
        {/* <div className={css.preview}>
          <AreaDoc />
        </div> */}
      </div>
    );
  }
}
