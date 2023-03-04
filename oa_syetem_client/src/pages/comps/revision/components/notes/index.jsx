import React, { useState, useEffect } from "react";
import { Input, Dropdown, Menu, Popconfirm } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import CompWrapper from "../compWrapper";
import PopCom from "../../popCom";
import { cloneDeep, createUidKey } from "../../../../../utils";
import css from "./index.module.less";

const { TextArea } = Input;

const initNotes = [
  {
    label: "",
    id: "initNotesId",
  },
];

const Notes = ({ props, onDelete, comValueUpdate }) => {
  const { content, id } = props;

  const [valueData, setValueData] = useState(initNotes);

  useEffect(() => {
    comValueUpdate(id, { notesList: valueData });
  }, [valueData]);

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
              <p style={{ width: "42px", paddingTop: "1px" }}>{`Note`}</p>
              <TextArea
                value={el.label}
                onChange={(e) => txtChange(e.target.value, el)}
              />
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => btnAction(el, "add")} />
                <PopCom
                  position={"left"}
                  title={"Sure to Delete?"}
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
    props && setValueData(content ? JSON.parse(content).notesList : initNotes);
  }, [props]);

  return (
    <CompWrapper prop={{ props, onDelete }}>
      <div className={css.notes_wrapper}>{renderNotes()}</div>
    </CompWrapper>
  );
};

export default Notes;
