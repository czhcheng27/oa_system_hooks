import React, { useState, useEffect } from "react";
import { Input } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey } from "@/utils";
import DelPop from "../delPop";
import PopCom from "../popCom";
import { colorCompMap } from "../../mapConst";
import css from "./index1.module.less";

const { TextArea } = Input;

const initNotes = [
  {
    label: "",
    id: "initNotesId",
  },
];

let mount = true;

const Notes = ({ props, comValueUpdate, onDelete, drag }) => {
  const { content, id } = props;

  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [valueData, setValueData] = useState(initNotes);

  const txtChange = (txt, obj) => {
    const newData = cloneDeep(valueData);
    newData.map((el) => {
      if (el.id === obj.id) el.label = txt;
      return el;
    });
    setValueData(newData);
  };

  const btnAction = (data, action) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    if (action === "add") {
      newData.splice(curIndex + 1, 0, { ...initNotes[0], id: createUidKey() });
    } else if (action === "del") {
      newData.splice(curIndex, 1);
    }
    setValueData(newData);
  };

  const renderNotes = () => {
    const disable = valueData.length === 1;
    return (
      !!valueData.length &&
      valueData.map((el, index) => {
        return (
          <div key={index} className={css.type_wrapper}>
            <div className={css.notes}>
              <p style={{ width: "24px", paddingTop: "1px" }}>{`注`}</p>
              <TextArea
                value={el.label}
                onChange={(e) => txtChange(e.target.value, el)}
              />
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => btnAction(el, "add")} />
                <PopCom
                  position={"left"}
                  title={"确定删除?"}
                  disable={disable}
                  handleConfirm={() => !disable && btnAction(el, "del")}
                >
                  {
                    <MinusCircleOutlined
                      className={classNames({ [css.diable_hover]: disable })}
                    />
                  }
                </PopCom>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  useEffect(() => {
    if (props) {
      mount = false;
      setValueData(content ? JSON.parse(content).notesList : initNotes);
      setTimeout(() => {
        mount = true;
      }, 800);
    }
  }, [props]);

  useEffect(() => {
    mount && comValueUpdate(id, { notesList: valueData });
  }, [valueData]);

  return (
    <div
      {...drag}
      style={colorCompMap[props.comType].midBg}
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <img
        style={{ position: "absolute", top: "18px", height: "18px" }}
        src={require(`../areaLeft/comps/icons/${props.comType}.png`)}
        alt={props.desc}
      />

      <div className={css.notes_wrapper}>{renderNotes()}</div>

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
