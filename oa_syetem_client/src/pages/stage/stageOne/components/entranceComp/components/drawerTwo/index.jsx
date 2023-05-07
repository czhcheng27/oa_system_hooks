import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Drawer, Button, Input, message, Spin, Skeleton, Checkbox } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TopRightIcon from "./imgs/topRight.png";
import LeftIcon from "./imgs/leftIcon.png";
import SearchIcon from "./imgs/searchIcon.png";
import DelIcon from "./imgs/delIcon.png";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import css from "./index.module.less";
import LoadingTip from "../../../../../../../components/LoadingTip";
import { mockCatList } from "./mockData";
import AutoTooltip from "../../../../../../../components/AutoTooltip";
import ResizeBar from "../../../../../../../components/ResizeBar";

const DrawerTwo = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  const [visible, setVisible] = useState(false);
  const [docWidth, setDocWidth] = useState(314);
  const [catIdx, setCatIdx] = useState();
  const [cardLoadingTip, setCardLoadingTip] = useState({ show: false }); // 标准卡片加载tip
  const [catPageTip, setCatPageTip] = useState({ show: true, status: 0 }); // 目录卡片加载tip

  useEffect(() => {
    setTimeout(() => {
      setCatPageTip({ show: false });
    }, 300);
  }, []);

  const openHandle = () => {
    setVisible(true);
  };

  const closeHandle = () => {
    setVisible(false);
  };

  // 点击每一行的目录的函数
  const clickCatFunc = (data, index) => {
    console.log("点击每一行的目录", data);
    setCatIdx(index);
  };

  // 大纲目录 list 中 ChapterNo 格式化
  const formatChapterNo = (chpNo, pId) => {
    if (chpNo === "content") {
      return "正文";
    } else if (chpNo === "appendix") {
      return "附录";
    } else if (pId == "appendix") {
      return "附录" + chpNo;
    } else {
      return chpNo;
    }
  };

  const renderLabelBtns = () => {
    return (
      <div className={css.top}>
        <div>
          <img src={TopRightIcon} />
          <h3>{"First Class Project"}</h3>
          <span>{"ZJB-20230414-10"}</span>
        </div>
        {
          <div className={css.btnArea}>
            <Button>Rename</Button>
            <Button type="primary">Save</Button>
          </div>
        }
      </div>
    );
  };

  const renderLeftSearch = () => {
    return (
      <div className={css.input_search}>
        <Input
          allowClear
          //   onChange={(e) => (setCatSearchVal(e.target.value), e.type == 'click' && catSearch(''))}
          //   onPressEnter={(e) => catSearch(e.target.value)}
          placeholder="keyword search"
          suffix={
            <img
              src={SearchIcon}
              //   onClick={() => catSearch(catSearchVal)}
              style={{ width: "15px", cursor: "pointer" }}
            />
          }
        />
      </div>
    );
  };

  const renderCatList = () => {
    return (
      <div className={css.catalog_list}>
        {mockCatList.map((el, index) => {
          const { standardName, chapterNo, chapterPid: pId } = el;
          return (
            <div
              key={index}
              className={`${css.each_wrap} ${
                index == catIdx ? css.active : null
              }`}
            >
              <div
                className={`${css.each_item}`}
                onClick={() => clickCatFunc(el, index)}
              >
                <div>
                  <AutoTooltip txt={standardName}>{standardName}</AutoTooltip>
                </div>
                {chapterNo && (
                  <div>章节号：{formatChapterNo(chapterNo, pId)}</div>
                )}
              </div>
              <img
                src={DelIcon}
                // onClick={() => delModalRef.current.openHandle(el)}
                className={css.delIcon}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Drawer
      className={css.drawer}
      width="100%"
      open={visible}
      onClose={closeHandle}
    >
      <div className={css.details}>
        <DrawerHeader
          background="white"
          pageName={`${"Edit"} Component Pack`}
          backPrev={() => closeHandle()}
        >
          <div
            className={css.closeIcon}
            style={{ cursor: "pointer" }}
            onClick={closeHandle}
          >
            <CloseOutlined />
          </div>
        </DrawerHeader>

        {renderLabelBtns()}

        <div className={css.bot_contents}>
          <div className={css.botLeft_wrap} style={{ width: docWidth + "px" }}>
            <div className={css.addComp}>
              <img src={LeftIcon} />
              <span>Component Catalog</span>
            </div>
            <div className={css.searchNList}>
              {renderLeftSearch()}
              {catPageTip.show ? (
                <div style={{ height: "calc(100% - 40px)" }}>
                  <LoadingTip
                    status={catPageTip.status}
                    // retry={getCatalogList}
                  />
                </div>
              ) : (
                renderCatList()
              )}
              <ResizeBar min={200} func={setDocWidth} />
            </div>
          </div>
          <div className={css.botRight_wrap}>sss</div>
        </div>
      </div>
    </Drawer>
  );
});

export default DrawerTwo;
