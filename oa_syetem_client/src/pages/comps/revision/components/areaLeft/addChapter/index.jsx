import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Input, message, Button } from "antd";
import { cloneDeep } from "lodash";
import { updateOutlineAllData } from "../../../../../../redux/actions";
import css from "./index.module.less";

const AddChapter = ({ children }) => {
  const dispatch = useDispatch();
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);
  const cntId = outlineAllData.findIndex((el) => el.id === "content");

  const [chapterName, setChapterName] = useState("");
  const [popVisible, setPopVisible] = useState(false);

  const visibleChange = (visible) => {
    visible && setChapterName("");
    visible && setPopVisible(true);
  };

  const addChapter = (data) => {
    const arr = outlineAllData[cntId].children;
    const pre = arr.slice(1, 3);
    let falseCount = 0;
    for (let i = 0; i < pre.length; i++) {
      !pre[i].visible && (falseCount = falseCount + 1);
    }
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

  const handleOk = () => {
    chapterName ? addChapter(chapterName) : message.error("请输入章节名称");
  };

  const renderContent = () => {
    return (
      <>
        <div className={css.top}>
          <p>章节名称：</p>
          <Input
            className={css.newChapterInput}
            defaultValue={""}
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            placeholder="请填写章节名称"
          />
        </div>
        <div className={css.btns}>
          <Button onClick={() => setPopVisible(false)}>取消</Button>
          <Button type="primary" onClick={() => handleOk()}>
            提交
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
