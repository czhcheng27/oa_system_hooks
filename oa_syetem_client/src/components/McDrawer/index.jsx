import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Drawer, Button, Input, message, Spin } from "antd";
import css1 from "../../assets/css/antdC.module.less";
import AdvanceFilter from "./components/AdvanceFilter";
import AmplfyIcon from "./assets/amplfier.svg";
import CloseIcon from "./assets/close.svg";
import css from "./index.module.less";

const initDictValue = {
  confirmBtnTxt: "确定",
  closeBtnTxt: "取消",
};

/* eslint-disable react/display-name */
export const McDrawer = forwardRef((props, ref) => {
  McDrawer.displayName = "McDrawer";
  const { callback } = props;
  const drawerRef = useRef(null);

  const [dictValue, setDictValue] = useState(initDictValue);
  const [visible, setVisible] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [disableConfirm, setDisableConfirm] = useState(false);

  // const dictContainer = {
  //     advanceDrawer: {title: '设置筛选条件'}
  // }

  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  useEffect(() => {
    const dom = document.getElementById("mcDrawer");
    dom && dom.style.setProperty("--radius", isFullscreen ? 0 : "16px");
  }, [isFullscreen]);

  const openHandle = (data) => {
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
      func = drawerRef.current.resetValueFunc();
    } else {
      func = cancelFunc;
    }
    return func;
  };

  return (
    <Drawer
      id="mcDrawer"
      className={`${css.mcDrawer} ${css1.antdC}`}
      open={visible}
      width={isFullscreen ? "100%" : dictValue.width ?? "30%"}
      onClose={closeDrawer}
      destroyOnClose
    >
      <Spin tip="加载中..." spinning={drawerLoading}>
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
                isFullscreen={isFullscreen}
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
