import React, { useState } from "react";
import { data2, initViewList } from "../../const";
import Rename from "../Rename";
import css from "./index.module.less";

const ViewFilter = ({ data, setListData, loadingFunc }) => {
  const [renameId, setRenameId] = useState("");
  const [viewList, setViewList] = useState(initViewList);
  const [checkedView, setCheckedView] = useState(null);
  const [renameVisible, setRenameVisible] = useState(false);

  const handleRename = (item, event) => {
    event.stopPropagation();
    setRenameId(item.teamWorkId);
    setRenameVisible(true);
  };

  const handleOk = (id, txt) => {
    const res = initViewList.map((el) => {
      if (el.teamWorkId === id) {
        el.teamworkName = txt;
      }
      return el;
    });
    setRenameVisible(false);
    setViewList(res);
  };

  const renderOperationBox = (item) => {
    return (
      <div className={css.operationBox}>
        <div className={css.content}>
          <div
            className={`${css.rename} ${css.list}`}
            onClick={(e) => handleRename(item, e)}
          >
            <span className={css.text}>重命名</span>
          </div>
          <div
            className={`${css.delete} ${css.list}`}
            // onClick={(e) => {
            //   handleDelete(item, e);
            // }}
          >
            <span className={css.text}>删除</span>
          </div>
        </div>
      </div>
    );
  };

  const itemClick = (teamWorkId, idx) => {
    loadingFunc();
    if (idx == 0) {
      setListData(data);
    } else if (idx == 1) {
      setListData(data.slice(0, 5));
    } else if (idx == 2) {
      setListData(data.slice(-5));
    }
    setCheckedView(teamWorkId);
  };

  return (
    <div className={css.viewFilter}>
      <div className={css.leftArea}>
        <ul>
          {viewList.map((item, index) => {
            const { teamWorkId, teamworkName } = item;
            return (
              <li
                className={`${teamWorkId == null ? css.all : css.item} ${
                  checkedView == teamWorkId ? css.current : ""
                }`}
                onClick={() => itemClick(teamWorkId, index)}
                key={index}
              >
                <span className={css.text}>{teamworkName}</span>
                <span className={css.drop}></span>
                {teamWorkId && renderOperationBox(item)}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={css.rightArea}>right area</div>
      {renameVisible && (
        <Rename
          teamWorkId={renameId}
          handleOk={handleOk}
          onClose={() => setRenameVisible(false)}
        ></Rename>
      )}
    </div>
  );
};

export default ViewFilter;
