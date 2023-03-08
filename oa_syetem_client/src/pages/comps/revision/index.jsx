import React from "react";
import { connect } from "react-redux";
import { message } from "antd";
import _ from "lodash";
import classNames from "classnames";
import { cloneDeep, createUidKey, generateParentIndex } from "../../../utils";
import { updateOutlineAllData } from "../../../redux/actions";
import AreaLeft from "./components/areaLeft";
import AreaDoc from "./components/areaDoc";
import AreaCenter from "./components/areaCenter";
import { coms, independentComps } from "./const";
import { mockOutline, getJsonAPI, tempActOutline } from "./mock";
import css from "./index.module.less";

const mockContent = getJsonAPI.data.mainBody;
class Revision extends React.Component {
  state = {
    isFold: false, // right area isFold
    activeOutline: { ...mockOutline[0] }, // select active obj
  };

  parentRef = React.createRef();

  addCom = (item, num = this.state.activeOutline?.coms.length ?? 0) => {
    const { activeOutline } = this.state;
    const comList = cloneDeep(activeOutline?.coms ?? []);
    const currentCom = coms.find((it) => it.comType == item);
    comList.splice(num, 0, { ...currentCom, id: createUidKey() });
    this.autoSave(activeOutline, comList);
  };

  // 第一个参数：选中的激活大纲 需要当作入参传入，因为 resetOrder 处结构的不是最新值，需要用 this.state.方式
  autoSave = (activeOutline, comList) => {
    if (generateParentIndex(comList, activeOutline)) {
      // comlist 的顺序是对的， coms 的值是对的
      const { index, coms } = activeOutline;
      comList.forEach((item) => {
        coms.forEach((el) => {
          if (item.id === el.id) {
            item.content = el.content;
          }
        });
      });
      this.setState({ activeOutline: { ...activeOutline, coms: comList } });
      const { outlineAllData } = this.props;
      outlineAllData.reduce((pre, item) => {
        if (item.index === index) {
          item["coms"] = comList;
        } else if (item.children) {
          item.children.map((el) => {
            if (el.index === index) {
              el["coms"] = comList;
            }
          });
        }
        return pre;
      }, []);
      this.props.updateOutlineAllData(outlineAllData);
    } else {
      return message.error("Incorrect Drag");
    }
  };

  beforeAutoSave = (activeOutline, comList) => {
    if (generateParentIndex(comList, activeOutline)) {
      this.autoSave(activeOutline, comList);
    } else {
      const _activeOutline = cloneDeep(activeOutline);
      this.setActiveOutline(tempActOutline);
      setTimeout(() => {
        this.setActiveOutline(_activeOutline);
      });
      return message.error("Incorrect Drag");
    }
  };

  setActiveOutline = (data) => {
    // 非正文部分正常 set 设置，正文组件部分需要 generateParentIndex 判断
    const indep = independentComps.includes(data.index);
    !indep && generateParentIndex(data.coms, data);
    this.setState({ activeOutline: data });
  };

  handleDelete = (item, outlineAllData) => {
    const { activeOutline } = this.state;
    const { coms = [], index } = activeOutline;
    const filterData = coms.filter((el) => el.id !== item.id);
    // 判断删除后的数组是否符合逻辑
    const res = generateParentIndex(filterData, activeOutline);
    if (res) {
      this.setActiveOutline({ ...activeOutline, coms: filterData });
      outlineAllData.forEach((obj) => {
        if (obj.index === index) {
          obj.coms = filterData;
        } else if (obj.children) {
          const findObj = obj.children.find((el) => el.index === index);
          findObj && (findObj.coms = filterData);
        }
      });
      const _temp = cloneDeep(outlineAllData);
      this.props.updateOutlineAllData(_temp);
    } else {
      message.error("Incorrect Delete");
    }
  };

  // 提交函数，调用 AreaCenter 子组件方法
  handleSubmit = () => {
    this.parentRef.current.handleSubmit();
  };

  componentDidMount() {
    mockOutline[2].children = mockContent;
    this.props.updateOutlineAllData(mockOutline);
  }

  render() {
    const { isFold, activeOutline } = this.state;
    const { outlineAllData } = this.props;
    return (
      <div className={classNames(css.revision)}>
        <div className={css.revision_left}>
          <AreaLeft
            actIdx={activeOutline.index}
            activeOutline={activeOutline}
            setActiveOutline={this.setActiveOutline}
            addCom={(data, num) => this.addCom(data, num)}
          />
        </div>
        <div className={css.revision_center}>
          <AreaCenter
            activeOutline={activeOutline}
            ref={this.parentRef}
            handleDelete={(item) => this.handleDelete(item, outlineAllData)}
            resetOrder={(data) => {
              this.beforeAutoSave(this.state.activeOutline, data);
            }}
          />
        </div>
        <div
          className={classNames(css["right"], css[isFold ? "fold" : "expand"])}
        >
          {/* 折叠展开按钮 */}
          <div
            className={classNames(
              css["fold_btn"],
              css[isFold ? "foldBtn" : "expandBtn"]
            )}
            onClick={() => this.setState({ isFold: !isFold })}
          ></div>
          <AreaDoc handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    outlineAllData: state.rdcOutlineAllData,
  }),
  { updateOutlineAllData }
)(Revision);
