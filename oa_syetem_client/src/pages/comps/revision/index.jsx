import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import classNames from "classnames";
import { cloneDeep, createUidKey } from "../../../utils";
import { updateOutlineAllData } from "../../../redux/actions";
import AreaLeft from "./components/areaLeft";
import AreaDoc from "./components/areaDoc";
import AreaCenter from "./components/areaCenter";
import { coms } from "./const";
import { mockOutline, getJsonAPI } from "./mock";
import css from "./index.module.less";

// 拖拽添加，拖拽排序，删除组件时，更新高亮大纲对象，全部大纲数据

const mockContent = getJsonAPI.data.mainBody;
class Revision extends React.Component {
  state = {
    isFold: false, // 右侧是否折叠
    activeOutline: { ...mockOutline[0] }, // 选中的激活的大纲对象
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
    this.setState({ activeOutline: { ...activeOutline, coms: comList } });
    const { index } = activeOutline;
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
  };

  setActiveOutline = (data) => {
    this.setState({ activeOutline: data });
  };

  handleDelete = (item, outlineAllData) => {
    const { activeOutline } = this.state;
    const { coms = [], index } = activeOutline;
    const filterData = coms.filter((el) => el.id !== item.id);
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
              this.autoSave(this.state.activeOutline, data);
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
          >
            {isFold ? `<` : ">"}
          </div>
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
