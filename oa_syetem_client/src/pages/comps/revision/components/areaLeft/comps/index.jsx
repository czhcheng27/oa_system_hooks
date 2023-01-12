import React from "react";
import { Col, Row } from "antd";
import Sortable from "sortablejs";
import { categoryMap, typeCompsMap } from "../../../mapConst";
import css from "./index.module.less";

const Comps = ({ addCom }) => {
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
        onEnd: (evt) => {
          console.log("evt", evt);
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
            <Col span={24} key={index} data-id={item.type}>
              <div className={css.each_comp}>
                <span>{item.name}</span>
                <img
                  src={require("./icons/" + item.type + ".png").default}
                  alt={item.type}
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
        const renderIcons = typeCompsMap.reduce((pre, item) => {
          if (obj.compNo.includes(item.type)) {
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
