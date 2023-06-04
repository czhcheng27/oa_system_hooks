import css from "./index.module.less";

const ModalHeader = ({ title, closeModal }) => {
  return (
    <>
      <div className={css.modalBg}></div>
      <div className={css.modalBottomBorder}></div>
      <div className={css.modalLeftBorder}></div>
      <div className={css.modalRightBorder}></div>
      <div className={css.modalTitle}>
        {title}
        <span>Target System</span>
      </div>
      <div className={css.modalIcon} onClick={closeModal} />
    </>
  );
};

export default ModalHeader;
