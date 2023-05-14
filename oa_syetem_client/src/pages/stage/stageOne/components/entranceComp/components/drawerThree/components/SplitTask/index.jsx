import React, { useState } from "react";
import { Input } from "antd";
import addTaskIcon from "../../img/addTask.png";
import CardBg from "../../img/card_bg.png";
import CardBgSel from "../../img/card_bg_sel.png";
import TaskIcon from "../../img/task_icon.png";
import css from "./index.module.less";

const SplitTask = ({ taskData, addTask, nameClick, cardClickCb }) => {
  const [inputVal, setInputVal] = useState("");
  const [selectIdx, setSelectIdx] = useState(
    !taskData.length ? 0 : taskData.length - 1
  );

  const handleCardClick = (id, isTyping, idx, name) => {
    setSelectIdx(idx);
    if (isTyping) {
      nameClick(name ? name : inputVal, id);
    } else {
      cardClickCb(id);
      setInputVal("");
    }
  };

  const createNewSub = () => {
    addTask();
    setInputVal("");
    setSelectIdx(taskData.length);
  };

  return (
    <div className={css.split_task_wrap}>
      <div className={css.testCol}>
        {taskData.map((el, index) => {
          const { name, id, isTyping } = el;
          return (
            <div key={index} className={css.each_item}>
              <img src={selectIdx == index && isTyping ? CardBgSel : CardBg} />
              <div
                className={css.card}
                onClick={() => handleCardClick(id, isTyping, index, name)}
              >
                <div className={css.seq}>{index + 1}</div>
                <div className={css.task_icon}>
                  <img src={TaskIcon} />
                </div>
                <div className={css.task_name}>
                  {!isTyping || selectIdx !== index ? (
                    name ? (
                      name
                    ) : (
                      "Subtask name"
                    )
                  ) : (
                    <Input
                      defaultValue={name}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={(e) => nameClick(e.target.value, id, "onBlur")}
                      onChange={(e) => setInputVal(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className={css.add_task} onClick={() => addTask && createNewSub()}>
          <img src={addTaskIcon} />
          <div>Create New SubTask</div>
        </div>
      </div>
    </div>
  );
};

export default SplitTask;
