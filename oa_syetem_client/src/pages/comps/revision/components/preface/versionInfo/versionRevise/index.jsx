import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey } from "@/utils";
import SwitchWrapper from "../../../../switchWrapper";
import css from "./index.module.less";
import CmTinymce from "../../../../cmTinymce";
import PopCom from "../../../../popCom";

const initContent = [
  {
    value: "",
    id: "reviseVersionId1",
  },
];

const contentObj = {
  value: "",
};

// eslint-disable-next-line react/display-name
const VersionRevise = forwardRef(
  ({ vrData, firstLunchStch, setFirstLunchStch }, ref) => {
    const [valueData, setValueData] = useState(initContent);

    useImperativeHandle(ref, () => ({
      getVersionRevise: () => {
        return valueData;
      },
    }));

    useEffect(() => {
      setValueData(vrData ?? initContent);
    }, [vrData]);

    // type 1 : 第一层级（a级添加）
    const contentAdd = (data) => {
      const curIndex = valueData.findIndex((el) => el.id === data.id);
      const newData = cloneDeep(valueData);
      newData.splice(curIndex + 1, 0, {
        ...contentObj,
        id: createUidKey(),
      });
      setValueData(newData);
    };

    // type 1 : 第一层级（a级删除）
    const contentDel = (data) => {
      const result = valueData.filter((el) => el.id !== data.id);
      setValueData(result);
    };

    // 一级文本更改时更新数据函数
    const contentTxtChange = (txt, obj) => {
      const newData = cloneDeep(valueData);
      newData.map((el) => {
        if (el.id === obj.id) el.value = txt;
        return el;
      });
      setValueData(newData);
    };

    const renderContent = () => {
      return (
        valueData.length &&
        valueData.map((el, index) => {
          const disable = valueData.length === 1;
          return (
            <div key={index} className={css.content_wrapper}>
              <div className={css.content}>
                <div>
                  <span></span>
                </div>
                <CmTinymce
                  value={el.value}
                  inline={true}
                  selectorName="replaceFile_bot_content"
                  onChange={(data) => contentTxtChange(data, el)}
                />
                <div className={css.symbol}>
                  {index + 1 === valueData.length ? "。" : ";"}
                </div>
                <div className={css.handle_btn}>
                  <PlusCircleOutlined onClick={() => contentAdd(el)} />
                  <PopCom
                    position={"left"}
                    title={"确定删除?"}
                    disable={disable}
                    handleConfirm={() => contentDel(el)}
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

    return (
      <SwitchWrapper
        label={"Version Information (Revision)"}
        interlock={true}
        from="b"
        switchVal={!firstLunchStch}
        switchFunc={setFirstLunchStch}
        noNeedStaple={true}
      >
        <div className={css.bot_wrapper}>{renderContent()}</div>
      </SwitchWrapper>
    );
  }
);

export default VersionRevise;
