import React, {
  useState,
  useEffect,
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
import { mockCatList, apiCardList } from "./mockData";
import AutoTooltip from "src/components/AutoTooltip";
import ResizeBar from "../../../../../../../components/ResizeBar";
import PreviewPage from "./components/previewPage";

const DrawerTwo = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  const [visible, setVisible] = useState(false);
  const [docWidth, setDocWidth] = useState(314);
  const [catIdx, setCatIdx] = useState();
  const [cardLoadingTip, setCardLoadingTip] = useState({ show: false }); // 标准卡片加载tip
  const [catPageTip, setCatPageTip] = useState({ show: true, status: 0 }); // 目录卡片加载tip
  const [catBfFilter, setCatBfFilter] = useState([]); // 左侧目录进行筛选过滤前的数组数组
  const [previewData, setPreviewData] = useState(); // 传递给预览页面的数据
  const [showPreviewPage, setShowPreviewPage] = useState(false); // 是否展示预览页面

  useEffect(() => {
    setTimeout(() => {
      setCatPageTip({ show: false });
      setCatBfFilter(apiCardList);
    }, 300);
  }, []);

  const openHandle = () => {
    setVisible(true);
  };

  const closeHandle = () => {
    setVisible(false);
  };

  // 预览页面点击关闭的函数
  const goBack = () => {
    setShowPreviewPage(false);
    setCatIdx(null);
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

  // 整体右下部份：带有搜索栏
  const renderCardList = () => {
    return (
      <Checkbox.Group
        value={catBfFilter.flatMap((el) =>
          el.standardChapterId ? [] : [el.standardInfoId]
        )}
      >
        <div
          id="innerDrawerOpenHere"
          style={{ padding: "24px 0 24px 32px", height: "100%" }}
        >
          <div className={css.input_search}>
            <Input
              allowClear
              style={{ width: "500px" }}
              // onChange={(e) => (
              //   setCardSearchVal(e.target.value),
              //   e.type == "click" && getCardList("")
              // )}
              // onPressEnter={(e) => getCardList(e.target.value)}
              placeholder="keyword search"
              suffix={
                <img
                  src={SearchIcon}
                  // onClick={() => getCardList(cardSearchVal)}
                  style={{ width: "15px", cursor: "pointer" }}
                />
              }
            />
          </div>
          {<div>aaaaaaa</div>}
        </div>
      </Checkbox.Group>
    );
  };

  const renderBotContent = () => {
    return (
      <>
        <div
          style={{
            display: showPreviewPage ? "block" : "none",
            height: "100%",
          }}
        >
          {showPreviewPage && (
            <PreviewPage goBack={goBack} receiveData={previewData} />
          )}
        </div>
        <div
          style={{
            display: !showPreviewPage ? "block" : "none",
            height: "100%",
          }}
        >
          {renderCardList()}
        </div>
      </>
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
          <div className={css.botRight_wrap}>{renderBotContent()}</div>
        </div>
      </div>
    </Drawer>
  );
});

export default DrawerTwo;
