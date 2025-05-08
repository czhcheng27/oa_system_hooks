import React, { useState, useEffect } from "react";
import { Input } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import DelPop from "../delPop";
import PopCom from "../popCom";
import { cloneDeep, createUidKey, inputToNum } from "@/utils";
import { colorCompMap } from "../../mapConst";
import css from "./index.module.less";

const { TextArea } = Input;

const initNotes = [
  {
    footCode: "",
    footTxt: "",
    id: "initNotesId",
  },
];

let mount = true;

const FootNotes = ({ props, comValueUpdate, onDelete, drag }) => {
  const { content, id } = props;

  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [valueData, setValueData] = useState(initNotes);

  const valueChange = (value, obj, name) => {
    const newData = cloneDeep(valueData);
    newData.map((el) => {
      if (el.id === obj.id) el[name] = value;
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
              <p style={{ width: "95px", marginRight: "16px" }}>
                <Input
                  value={el.footCode}
                  placeholder="Code"
                  onChange={(e) =>
                    valueChange(inputToNum(e.target.value), el, "footCode")
                  }
                />
              </p>
              <TextArea
                value={el.footTxt}
                onChange={(e) => valueChange(e.target.value, el, "footTxt")}
                placeholder="Please type in content"
              />
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => btnAction(el, "add")} />
                <PopCom
                  position={"left"}
                  title={"Delete?"}
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
      }, 300);
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

      <div className={css.notes_wrapper}>
        <p style={colorCompMap[props.comType].midTxt}>Foot Notes</p>
        {renderNotes()}
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

export default FootNotes;
