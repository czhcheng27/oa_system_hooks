import React, { useState, useRef } from "react";
import { Modal, Switch } from "antd";
import Staple from "../../imgs/staple.png";
import css from "./index.module.less";

const SwitchWrapper = ({
  children,
  label, // 左侧 label
  imgSrc = "", // 右上角 icon src，想要弹窗功能则为必填
  modalTitle = "", // 弹窗的header的label
  wrapClassName = "", // 弹窗的样式名
  modalContent = () => <div></div>, // modal的内容
  modalIconOnlyOpenShow = true, // modal的小图标是否指在switch开关为true时展示
  noNeedStaple = false, // 是否需要展示左上角图钉📌
  interlock = false, // 是否需要互锁功能
  from, // 如若需要互锁需要定义来自哪里，例如 from='a', from='b'
  switchVal = true, // switch开关的值（true/false）
  switchFunc, // switch开关动作时的callback函数
  disableSwitch = false, // 是否禁用switch开关
}) => {
  const childrenRef = useRef();

  const [openModal, setOpenModal] = useState(false);

  const handleSwitch = (checked) => {
    if (!interlock) {
      switchFunc(checked);
    } else {
      if (from === "b") {
        switchFunc(switchVal);
      } else {
        switchFunc(!switchVal);
      }
    }
  };

  // modal 弹窗的 icon 是否只在 switchValue 为 true 时展示
  const isModalIconOnlyOpenShow = () => {
    if (modalIconOnlyOpenShow) {
      return switchVal;
    } else {
      return true;
    }
  };

  return (
    <div
      className={`${css.content_wrapper} ${switchVal ? "" : css.switchOff} `}
    >
      {switchVal && !noNeedStaple && (
        <img src={Staple} className={css.staple_icon} alt="" />
      )}
      <div className={css.content_top}>
        <div>{label}</div>
        <div className={css.top_right}>
          {imgSrc && isModalIconOnlyOpenShow() && (
            <img src={imgSrc} onClick={() => setOpenModal(true)} />
          )}
          {!disableSwitch && (
            <div className={css.switch_part}>
              <Switch checked={switchVal} onChange={handleSwitch} />
              <div>{switchVal ? "Enabled" : "Disabled"}</div>
            </div>
          )}
        </div>
      </div>
      <div
        ref={childrenRef}
        className={css.content_bottom}
        style={{ display: switchVal ? "block" : "none" }}
      >
        {children}
      </div>
      {openModal && (
        <Modal
          wrapClassName={wrapClassName}
          title={modalTitle}
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
          centered={true}
        >
          {modalContent()}
        </Modal>
      )}
    </div>
  );
};

export default SwitchWrapper;
