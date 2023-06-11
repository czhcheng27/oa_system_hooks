import React, { useState, useEffect } from "react";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";
import css from "./index.module.less";

const Modal = ({ modalShow, modalDict = {}, closeHandle }) => {
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
          <ModalHeader title="Assignment Distribute" closeModal={closeModal} />
          <ModalContent modalDict={modalDict} closeModal={closeModal} />
        </div>
      </div>
    )
  );
};

export default Modal;
