import React, { useState, useRef } from "react";
import { Modal, Switch } from "antd";
import Staple from "../imgs/staple.png";
import css from "./index.module.less";

const SwitchWrapper = ({
  children,
  label,
  imgSrc = "",
  modalTitle = "",
  wrapClassName = "",
  modalContent = () => <div></div>,
  noNeedStaple = false,
  interlock = false,
  from,
  switchVal = true,
  switchFunc,
  disableSwitch = false,
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
          {!disableSwitch && (
            <div className={css.switch_part}>
              <Switch checked={switchVal} onChange={handleSwitch} />
              <div>Enable</div>
            </div>
          )}
          {imgSrc && <img src={imgSrc} onClick={() => setOpenModal(true)} />}
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
