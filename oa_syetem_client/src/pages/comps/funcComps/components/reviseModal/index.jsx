import React, { useState, useRef, forwardRef } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
// import { apiModalSaveUpdate } from "@/modules/main/api/sdc015";
import css from "./index.module.less";

/*
type: comp / import, 代表是组件制标前导页 / 文件导入前导页
*/
const ReviseModal = (
  {
    initData = {},
    closeModal,
    type,
    preData,
    setNowDataFunc,
    setImportTopName,
    setPreData,
    reShowWPS,
    setDocData,
    reRenderContent,
  },
  ref
) => {
  // console.log('ReviseModal', type);
  const preRef = useRef();

  const [open, setOpen] = useState(true);
  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

  const handleOk = async () => {
    const data = await preRef.current.getPreData();
    console.log("handleOk", data, outlineAllData);
    const upload = data?.uploadData;
    const formatData = { ...data, ...upload };
    console.log("ReviseModal-formatData", formatData);
    preData && setPreData(formatData);
    updateBasicInfo(formatData);
  };

  const updateBasicInfo = async (data) => {
    // apiModalSaveUpdate({
    //   ...data.infoData,
    //   ...data.statementData,
    //   ...data.uploadData,
    //   content: JSON.stringify({ data: JSON.stringify(outlineAllData) }),
    //   formType: type === "comp" ? "01" : "02",
    //   id: initData.id,
    // }).then((res) => {
    //   type == "comp"
    //     ? reRenderContent(res.data.content)
    //     : (reShowWPS({ sourceFileid: data?.uploadData?.sourceFileid }, ""),
    //       setImportTopName(data.infoData.standardName));
    //   cancelHandle();
    //   setNowDataFunc();
    //   setDocData({});
    // });
  };

  //  关闭抽屉
  const cancelHandle = () => {
    setOpen(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };
  return (
    <Modal
      wrapClassName="edit_basic_modal"
      open={open}
      width={1340}
      title={`编辑基本信息`}
      onOk={handleOk}
      onCancel={cancelHandle}
      // confirmLoading={loading}
      destroyOnClose={true}
    ></Modal>
  );
};

export default forwardRef(ReviseModal);
