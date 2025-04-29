import React, { useState, useEffect } from "react";
import { Input, Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import css from "./index.module.less";

const Rename = ({ teamWorkId, onClose, handleOk }) => {
  const [visible, setVisible] = useState(true);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    if (visible == false) {
      onClose();
    }
  }, [visible]);

  return (
    <Modal
      wrapClassName={css.modal}
      open={visible}
      width={500}
      centered
      title={null}
      footer={null}
      maskClosable={false}
      closable={false}
    >
      <div className={css.rename}>
        <div className={css.head}>
          <span className={css.title}>Edit viewname</span>
          <span className={`${css.close}`} onClick={() => setVisible(false)}>
            <CloseOutlined></CloseOutlined>
          </span>
        </div>
        <div className={css.content}>
          <Input
            placeholder="Please type in name"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          ></Input>
        </div>
        <div className={css.footer}>
          <div className={css.btnArea}>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => handleOk(teamWorkId, inputVal)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Rename;
