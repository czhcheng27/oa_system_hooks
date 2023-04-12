import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { initViewList } from "../../const";
import css from "./index.module.less";

const ViewFilter = (props) => {
  const [viewList, setViewList] = useState(initViewList);
  const [checkedView, setCheckedView] = useState(null);

  const renderOperationBox = (item) => {
    return (
      <div className={css.operationBox}>
        <div className={css.content}>
          <div
            className={`${css.rename} ${css.list}`}
            // onClick={(e) => {
            //   handleRename(item, e);
            // }}
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

  return (
    <div className={css.viewFilter}>
      <div className={css.leftArea}>
        <ul>
          {viewList.map((item, index) => {
            return (
              <li
                className={`${item.teamWorkId == null ? css.all : css.item} ${
                  checkedView == item.teamWorkId ? css.current : ""
                }`}
                key={index}
              >
                <span className={css.text}>{item.teamworkName}</span>
                <span className={css.drop}></span>
                {item.teamWorkId && renderOperationBox(item)}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={css.rightArea}>right area</div>
    </div>
  );
};

export default ViewFilter;
