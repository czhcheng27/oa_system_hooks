import React, { useState, useEffect } from "react";
import ModalHeader from "./ModalHeader";
import css from "./index.module.less";

const Modal = ({ modalShow, closeHandle }) => {
  const [modalOpacity, setModalOpacity] = useState(false);

  useEffect(() => {
    if (modalShow) setTimeout(() => setModalOpacity(true), 10);
  }, [modalShow]);

  const closeModal = () => {
    setModalOpacity(false);
    setTimeout(() => closeHandle(), 500);
  };

  const compileContainer = () => {
    return (
      <div className={css.containerBox}>
        <div className={css.chartBox} id="modalChart"></div>
        aaaaa
      </div>
    );
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
          {compileContainer()}
        </div>
      </div>
    )
  );
};

export default Modal;
