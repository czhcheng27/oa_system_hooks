import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import InputList from "../InputList";
import { inputData } from "../../mock";
import css from "./index.module.less";

const InputDetailModal = ({ clickItem, closeModal }) => {
  const [visible, setVisible] = useState(true);
  const [modalData, setModalData] = useState(clickItem);

  const renderBotRight = () => {
    return <div className={css.bot_right}>bot_right</div>;
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      closeModal();
    }, 500);
  };
  return (
    <Modal
      wrapClassName="inputDetailModal"
      open={visible}
      width={1000}
      centered
      maskClosable={false}
      footer={null}
      onCancel={closeModal}
    >
      <div className={css.content_wrapper}>
        <div className={css.header}>{modalData.inoutlistDesc}</div>
        <div className={css.bot}>
          <div className={css.list}>
            <InputList
              id={modalData.id}
              setModalData={setModalData}
              inputData={inputData}
            />
          </div>
          {renderBotRight()}
        </div>
        <div className={css.close_icon} onClick={() => handleClose()}>
          <CloseOutlined />
        </div>
      </div>
    </Modal>
  );
};

export default InputDetailModal;
