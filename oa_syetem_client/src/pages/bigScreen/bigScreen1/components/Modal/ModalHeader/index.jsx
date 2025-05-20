import css from "./index.module.less";

const ModalHeader = ({ title, type, closeModal }) => {
  return (
    <>
      <div className={css.modalBg}></div>
      <div className={css.modalBottomBorder}></div>
      <div className={css.modalLeftBorder}></div>
      <div className={css.modalRightBorder}></div>
      <div className={css.modalTitle}>
        {title}
        {type !== "alert" ? <span>Target System</span> : null}
      </div>
      <div className={css.modalIcon} onClick={closeModal} />
    </>
  );
};

export default ModalHeader;
