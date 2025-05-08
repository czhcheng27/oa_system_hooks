import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
const { TextArea } = Input;
import DelPop from "../delPop";
import css from "./index.module.less";
import { colorCompMap } from "../../mapConst";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const Notes = ({ props, comValueUpdate, onDelete }) => {
  const { content, id } = props;

  useEffect(() => {
    if (props && content) {
      const listObj = JSON.parse(content);
      setNotesList(listObj.notesList || []);
      setFootnoteList(listObj.footnoteList || []);
    }
  }, [props]);

  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [notesList, setNotesList] = useState([]);
  const [footnoteList, setFootnoteList] = useState([]);

  //  编译注列表
  const compileNotesList = () => {
    return (
      <>
        {notesList.map((item, index) => {
          return (
            <div className={css.notesBox} key={index}>
              <div className={css.notesLabel}>注</div>
              <TextArea
                value={item.label}
                placeholder="请输入注"
                autoSize={{ minRows: 2, maxRows: 6 }}
                onChange={(e) => {
                  setNotes(e.target.value, index);
                }}
              />
              <div className={css.notesHandle}>
                {index ? (
                  <MinusCircleOutlined
                    onClick={() => {
                      deleteNode("notes", index);
                    }}
                  />
                ) : (
                  <PlusCircleOutlined
                    onClick={() => {
                      addNode("notes");
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  //  编译脚注列表
  const compileFootnoteList = () => {
    return (
      <>
        {footnoteList.map((item, index) => {
          return (
            <div className={css.footnoteBox} key={index}>
              <div className={css.notesLabel}>{item.code}</div>
              <TextArea
                value={item.label}
                placeholder="请输入脚注"
                autoSize={{ minRows: 2, maxRows: 6 }}
                onChange={(e) => {
                  setFootnote(e.target.value, index);
                }}
              />
              <div className={css.notesHandle}>
                {index ? (
                  <MinusCircleOutlined
                    onClick={() => {
                      deleteNode("footnote", index);
                    }}
                  />
                ) : (
                  <PlusCircleOutlined
                    onClick={() => {
                      addNode("footnote");
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const addNode = (type, index) => {
    let list = type == "notes" ? [...notesList] : [...footnoteList];
    if (type == "notes") {
      list.push({ label: "" });
      postUpdateValue(list, null);
    } else {
      list.push({ label: "", code: "a" + (list.length + 1) });
      postUpdateValue(null, list);
    }
  };

  const deleteNode = (type, index) => {
    let list = type == "notes" ? [...notesList] : [...footnoteList];
    list.splice(index, 1);
    if (type == "notes") {
      postUpdateValue(list, null);
    } else {
      postUpdateValue(null, list);
    }
  };

  const setNotes = (value, index) => {
    let list = [...notesList];
    list[index].label = value;
    postUpdateValue(list, null);
  };

  const setFootnote = (value, index) => {
    let list = [...footnoteList];
    list[index].label = value;
    postUpdateValue(null, list);
  };

  const postUpdateValue = (list1, list2) => {
    if (list1) {
      setNotesList(list1);
    } else if (list2) {
      setFootnoteList(list2);
    }
    comValueUpdate(
      id,
      {
        notesList: list1 || notesList,
        footnoteList: list2 || footnoteList,
      },
      null
    );
  };

  return (
    <div
      style={colorCompMap[props.comType].midBg}
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <div className={css.formBox}>
        <div className={css.leftBox}>
          <img
            src={require(`../areaLeft/comps/icons/${props.comType}.png`)}
            alt={props.desc}
          />
        </div>
        <div className={css.rightBox}>
          {compileNotesList()}
          {compileFootnoteList()}
        </div>
      </div>
      <DelPop
        props={props}
        onDelete={onDelete}
        setBtnClicked={setBtnClicked}
        hoverStatus={hoverStatus}
        setHoverStatus={setHoverStatus}
      />
    </div>
  );
};

export default Notes;
