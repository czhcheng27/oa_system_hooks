import React, { useState } from "react";
import { Input, message, Modal } from "antd";
import { debounce } from "lodash";
import css from "./index.module.less";

const AddChapter = ({ visible, close, addChapter }) => {
  const [chapterName, setChapterName] = useState("");

  const handleChange = debounce((e) => {
    setChapterName(e.target.value);
  }, 300);

  const handleOk = () => {
    chapterName
      ? addChapter(chapterName)
      : message.error("Please Input Chapter Name");
  };

  return (
    <Modal title="Add Chapter" open={visible} onOk={handleOk} onCancel={close}>
      <div>
        New Chapter Name：
        <Input
          defaultValue={chapterName}
          onChange={handleChange}
          placeholder="Please Input Chapter Name"
        />
      </div>
    </Modal>
  );
};

export default AddChapter;
