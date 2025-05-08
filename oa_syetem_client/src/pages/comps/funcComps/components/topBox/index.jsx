import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Button, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { getNowDate } from "@/utils";
import ReviseModal from "../reviseModal";
// import SaveIcon from "../../../../assets/save.png";
// import DownIcon from "./downArrow.png";
// import EditIcon from "./editIcon.svg";
import css from "./index.module.less";

const TopBox = (
  {
    rowData,
    preData,
    generateId,
    reRenderContent,
    handleSaveData,
    goHome,
    saveBeforeReturn,
    setPreData,
    type,
    reShowWPS,
    setDocData,
  },
  ref
) => {
  // console.log('topBox', type);
  // const initData = preData?.infoData?.standardName
  //   ? {
  //       id: generateId,
  //       ...preData.infoData,
  //       ...preData.infoData,
  //       ...preData.statementData,
  //       ...preData,
  //     }
  //   : rowData;
  // const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);
  // const dataHasUpdated = useSelector((s) => s.rdcDataHasUpdated);
  // const useData = outlineAllData[0].data.standardName
  //   ? outlineAllData[0].data
  //   : rowData;
  // const { standardName: stdName = "" } = useData;

  // const [importTopName, setImportTopName] = useState(rowData.standardName);
  // const [nowData, setNowData] = useState(rowData.updated);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [showPopTxt, setShowPopTxt] = useState(false);

  // useImperativeHandle(ref, () => ({
  //   setNowData: setNowDataFunc,
  // }));

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowPopTxt(true);
  //     setTimeout(() => {
  //       setShowPopTxt(false);
  //     }, 3000);
  //   }, 150);
  //   // setShowPopTxt(true);
  //   // setTimeout(() => {
  //   //   setShowPopTxt(false);
  //   // }, 3000);
  // }, []);

  // const setNowDataFunc = () => {
  //   setNowData(getNowDate());
  // };

  // //  保存回调
  // const handleConfirm = () => {
  //   saveBeforeReturn();
  // };

  // const items = [
  //   {
  //     key: "1",
  //     label: <div>编辑基本信息</div>,
  //     onClick: () => setShowEditModal(true),
  //   },
  // ];

  return (
    <div className={css.top}>
      {/* left */}
      <div className={css.topLeft}>
        <div className={css.leftBack} onClick={goHome}>
          <LeftOutlined />
          <span>返回</span>
        </div>
        <div className={css.divider} />
        {/* <div className={css.handleBox}>
          <Dropdown overlayClassName="update_previse_drop" menu={{ items }}>
            <div style={{ cursor: 'pointer' }}>
              {type == 'import' ? importTopName : stdName}
              <Tooltip placement="right" open={showPopTxt} title="修改标准基本信息入口">
                <img src={DownIcon} />
              </Tooltip>
            </div>
          </Dropdown>
          <div className={css.editArea} onClick={() => setShowEditModal(true)}>
            修改基本信息
          </div>
        </div> */}
      </div>

      {/* right */}
    </div>
  );
};

export default forwardRef(TopBox);
