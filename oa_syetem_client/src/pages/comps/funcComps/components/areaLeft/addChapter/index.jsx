import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Input, message, Button } from "antd";
import { cloneDeep } from "@/utils";
import { updateOutlineAllData } from "@/redux/actions";
import { RevisionContext } from "../../..";
import css from "./index.module.less";

const AddChapter = ({ children, selectData = {}, fillName = "", action }) => {
  const { varIndex } = selectData;
  const dispatch = useDispatch();
  const { forceUpdate } = useContext(RevisionContext);

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);
  const cntId = outlineAllData.findIndex((el) => el.id === "content");

  const [chapterName, setChapterName] = useState(fillName);
  const [popVisible, setPopVisible] = useState(false);

  const visibleChange = (visible) => {
    setPopVisible(visible);
    if (visible) {
      action !== "edit" && setChapterName("");
    }
  };

  // 添加新章节
  const addChapter = (data) => {
    const arr = outlineAllData[cntId].children;
    const pre = arr.slice(1, 3);
    let falseCount = 0;
    // 需求改为不需要二三章的显隐眼睛，注掉
    // for (let i = 0; i < pre.length; i++) {
    //   !pre[i].visible && (falseCount = falseCount + 1);
    // }
    const supposeId = arr.length + 1;
    outlineAllData[cntId].children.push({
      varIndex: `${supposeId - falseCount}`,
      id: `${supposeId}`,
      name: `${supposeId - falseCount}.${data}`,
      coms: [],
      deletable: true,
    });
    const _temp = cloneDeep(outlineAllData);
    dispatch(updateOutlineAllData(_temp));
    setPopVisible(false);
  };

  // 编辑章节名称函数
  const editChapter = () => {
    selectData.name = `${varIndex}.${chapterName}`;
    setPopVisible(false);
    forceUpdate();
  };

  const addOrEdit = () => {
    action === "edit" ? editChapter() : addChapter(chapterName);
  };

  const handleOk = () => {
    chapterName
      ? addOrEdit(chapterName)
      : message.error("Please type in chapter name");
  };

  const renderContent = () => {
    return (
      <>
        <div className={css.top}>
          <p>Chapter Name：</p>
          <Input
            className={css.newChapterInput}
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            placeholder="Please type in chapter name"
          />
        </div>
        <div className={css.btns}>
          <Button onClick={() => setPopVisible(false)}>Cancel</Button>
          <Button type="primary" onClick={() => handleOk()}>
            Submit
          </Button>
        </div>
      </>
    );
  };

  return (
    <Popover
      content={renderContent()}
      overlayClassName="addChapter_popover"
      placement="right"
      trigger={["click"]}
      onOpenChange={visibleChange}
      open={popVisible}
    >
      <div>{children}</div>
    </Popover>
  );
};

export default AddChapter;
