import { useState } from "react";
import {
  MenuOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import css from "./index.module.css";

const mockList = [
  {
    label: "Item1",
  },
  {
    label: "Item2",
  },
  {
    label: "Item3",
    visible: "1",
  },
  {
    label: "Item4",
    visible: "1",
  },
  {
    label: "Item5",
    visible: "1",
  },
  {
    label: "Item6",
    visible: "1",
  },
  {
    label: "Item7",
    visible: "1",
  },
  {
    label: "Item8",
    visible: "1",
  },
  {
    label: "Item9",
  },
  {
    label: "Item10",
  },
];

const lineHeight = 42;

const JSDrag = () => {
  const [list, setList] = useState(mockList);
  const [dragging, setDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [startPageY, setStartPageY] = useState(0);
  const [offsetPageY, setOffsetPageY] = useState(0);

  const undragIndex = [0, 1, list.length - 2, list.length - 1];

  const move = (arr, startIndex, toIndex) => {
    arr = arr.slice();
    arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
    return arr;
  };

  const handleMounseDown = (evt, index) => {
    // 如果index等于这几个则不能drag
    if (undragIndex.includes(index)) return;
    // if (index === 0 || index === list.length - 1) return;
    setDragging(true);
    setStartPageY(evt.pageY);
    setDraggingIndex(index);
  };

  const handleMouseUp = () => {
    setDragging(false);
    setStartPageY(0);
    setDraggingIndex(-1);
  };

  const handleMouseMove = (evt) => {
    let offset = evt.pageY - startPageY;
    // console.log("handleMouseMove", draggingIndex, list.length - 1);
    //此处决定底部哪几个不能移动
    if (offset > lineHeight && draggingIndex < list.length - 3) {
      // move down
      offset -= lineHeight;
      setList((pre) => move(pre, draggingIndex, draggingIndex + 1));
      setDraggingIndex((pre) => pre + 1);
      setStartPageY((pre) => pre + lineHeight);
    } else if (offset < -lineHeight && draggingIndex > 2) {
      //此处决定顶部哪几个不能移动
      // move up
      offset += lineHeight;
      setList((pre) => move(pre, draggingIndex, draggingIndex - 1));
      setDraggingIndex((pre) => pre - 1);
      setStartPageY((pre) => pre - lineHeight);
    }
    setOffsetPageY(offset);
  };

  const getDraggingStyle = (index) => {
    if (index !== draggingIndex) return {};
    return {
      backgroundColor: "lightsteelblue",
      transform: `translate(10px, ${offsetPageY}px)`,
    };
  };

  const iconClick = (obj) => {
    const visibleNum = obj.visible * 1;
    const temp = list.reduce((pre, item) => {
      if (item.label === obj.label) {
        item.visible = visibleNum ? "0" : "1";
      }
      return [...pre, item];
    }, []);
    setList(temp);
  };

  return (
    <div className={css.my_dnd}>
      <ul>
        {list.map((obj, i) => (
          <li
            key={i}
            // onMouseDown={(evt) => handleMounseDown(evt, i)}
            style={getDraggingStyle(i)}
          >
            <div onMouseDown={(evt) => handleMounseDown(evt, i)}>
              {console.log("list", list)}
              <MenuOutlined
                style={{
                  marginRight: "16px",
                  visibility: undragIndex.includes(i) ? "hidden" : "visible",
                }}
                // onMouseDown={(evt) => handleMounseDown(evt, i)}
              />
              {obj.label}
            </div>
            {!undragIndex.includes(i) && (
              <div className={css.eye_wrapper} onClick={() => iconClick(obj)}>
                {!!(obj.visible * 1) ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {dragging && (
        <div
          className={css.my_dnd_mask}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}
    </div>
  );
};
export default JSDrag;
