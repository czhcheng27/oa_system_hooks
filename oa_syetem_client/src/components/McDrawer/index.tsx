import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Drawer, Button, Input, message, Spin } from "antd";
import css1 from "../../assets/css/antdC.module.less";
import AdvanceFilter from "./components/AdvanceFilter/index";
import { McDrawerRef, McDrawerProps, OpenHandleParams, DictRef } from "./type";
import AmplfyIcon from "./assets/amplfier.svg";
import CloseIcon from "./assets/close.svg";
import css from "./index.module.less";

const initDictValue = {
  type: "",
  confirmBtnTxt: "Confirm",
  closeBtnTxt: "Cancel",
};

export const McDrawer = forwardRef<McDrawerRef, McDrawerProps>((props, ref) => {
  const { callback } = props;
  const drawerRef = useRef<DictRef>(null);

  const [dictValue, setDictValue] = useState<OpenHandleParams>(initDictValue);
  const [visible, setVisible] = useState<boolean>(false);
  const [drawerLoading, setDrawerLoading] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [disableConfirm, setDisableConfirm] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  useEffect(() => {
    const dom = document.getElementById("mcDrawer");
    dom && dom.style.setProperty("--radius", isFullscreen ? "0px" : "16px");
  }, [isFullscreen]);

  const openHandle = (data: OpenHandleParams) => {
    setDictValue({ ...initDictValue, ...data });
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
    try {
      //   callCloseBack();
    } catch {
      //
    }
  };

  //  确认数据
  const callBackData = async () => {
    if (!drawerRef.current) return;
    let res = await drawerRef.current.getSelectData();
    if (res.code == 200) {
      console.log("确认数据", res);
      callback(dictValue.type, res);
      setDictValue(initDictValue);
      closeDrawer();
    } else {
      message.error(res.message);
    }
  };

  const cancelFunc = () => {
    let func;
    if (dictValue?.type === "advanceFilter") {
      func = drawerRef.current?.resetValueFunc();
    } else {
      func = cancelFunc;
    }
    return func;
  };

  return (
    <Drawer
      className={`${css.mcDrawer} ${css1.antdC}`}
      open={visible}
      width={isFullscreen ? "100%" : dictValue.width ?? "30%"}
      onClose={closeDrawer}
      destroyOnClose
    >
      <Spin tip="loading..." spinning={drawerLoading}>
        <div className={css.mcDrawer_details}>
          <div className={css.drawerHeader}>
            <div>{dictValue?.title}</div>
            <div className={css.headerIcons}>
              <img
                onClick={() => setIsFullscreen(!isFullscreen)}
                src={AmplfyIcon}
              />
              <img onClick={closeDrawer} src={CloseIcon} />
            </div>
          </div>

          {/* center content */}
          <div className={css.center_content}>
            {/* 高级搜索 */}
            {dictValue.type === "advanceFilter" ? (
              <AdvanceFilter
                ref={drawerRef}
                setDisableConfirm={setDisableConfirm}
              />
            ) : null}
          </div>

          {/* bot btns */}
          <div className={css.bot_btns}>
            <Button onClick={cancelFunc}>{dictValue.closeBtnTxt}</Button>
            <Button
              type="primary"
              disabled={disableConfirm}
              onClick={() => callBackData()}
            >
              {dictValue.confirmBtnTxt}
            </Button>
          </div>
        </div>
      </Spin>
    </Drawer>
  );
});
