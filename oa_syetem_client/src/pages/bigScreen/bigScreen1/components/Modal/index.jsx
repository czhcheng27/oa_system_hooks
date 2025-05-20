import React, { useState, useEffect } from "react";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";
import { SUGGEST_HEIGHT, SUGGEST_WIDTH } from "../../const";
import css from "./index.module.less";

const Modal = ({
  modalShow,
  modalDict = {},
  closeHandle,
  title = "Assignment Distribute",
  type,
}) => {
  const [modalOpacity, setModalOpacity] = useState(false);

  useEffect(() => {
    if (modalShow) setTimeout(() => setModalOpacity(true), 10);
  }, [modalShow]);

  const closeModal = () => {
    setModalOpacity(false);
    setTimeout(() => closeHandle(), 500);
  };

  return (
    modalShow && (
      <div
        className={css.modalMosk}
        style={{ opacity: modalOpacity ? 1 : 0 }}
        onClick={() => closeModal()}
      >
        <div className={css.modalBox} onClick={(e) => e.stopPropagation()}>
          <ModalHeader title={title} type={type} closeModal={closeModal} />
          {type === "alert" ? (
            <div className={css.alertContent}>
              <div>Your browser resolution is too low.</div>
              <div>
                It is recommended to use a device with a resolution of at least{" "}
                <strong>{`${SUGGEST_WIDTH}x${SUGGEST_HEIGHT}`}</strong> for the
                best viewing experience of this dashboard.
              </div>
            </div>
          ) : (
            <ModalContent modalDict={modalDict} closeModal={closeModal} />
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
