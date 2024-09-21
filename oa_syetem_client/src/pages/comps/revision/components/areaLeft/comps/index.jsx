import React from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "antd";
import Sortable from "sortablejs";
import { dragStart } from "src/redux/actions";
import { categoryMap, colorCompMap } from "../../../mapConst";
import { coms } from "../../../const";
import css from "./index.module.less";

const Comps = ({ addCom }) => {
  const dispatch = useDispatch();
  // 拖拽相关方法
  const sortableGroupDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const options = {
        group: {
          name: "shared",
          pull: "clone",
          revertClone: true,
          put: false, // 不允许拖拽进这个列表
        },
        animation: 150,
        sort: false,
        onStart: () => dispatch(dragStart(true)),
        onEnd: (evt) => {
          console.log("evt", evt);
          dispatch(dragStart(false));
          if (evt.to.className === "modalList") {
            addCom(evt.item.getAttribute("data-id"), evt.newIndex);
            setTimeout(() => {
              let i = 0;
              while (i < evt.to.childNodes.length) {
                if (evt.to.childNodes[i].className === "dragList") {
                  i++;
                } else {
                  evt.to.removeChild(evt.to.childNodes[i]);
                }
              }
            }, 0);
          }
        },
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  const renderCategoryComp = (renderIcons) => {
    return (
      <Row gutter={[0, 24]} ref={sortableGroupDecorator}>
        {renderIcons.map((item, index) => {
          return (
            <Col
              span={24}
              key={`${item.comType}-${index}`}
              data-id={item.comType}
            >
              <div
                className={`${css.each_comp}`}
                style={colorCompMap[item.comType].left}
              >
                <p>{item.desc}</p>
                <img
                  src={require("./icons/" + item.comType + ".png").default}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <div className={css.wrapper}>
      {categoryMap.map((obj, index) => {
        const renderIcons = coms.reduce((pre, item) => {
          if (obj.compNo.includes(item.comType)) {
            pre.push(item);
          }
          return pre;
        }, []);
        return (
          <div key={index}>
            {obj.label && <title>{obj.label}</title>}
            {renderCategoryComp(renderIcons)}
          </div>
        );
      })}
    </div>
  );
};

export default Comps;
