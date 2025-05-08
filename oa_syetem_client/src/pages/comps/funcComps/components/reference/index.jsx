import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey } from "@/utils";
import { dataHasBeenUpdated, updateOutlineAllData } from "@/redux/actions";
import SwitchWrapper from "@/pages/comps/revision/switchWrapper";
import PopCom from "../popCom";
import CmTinymce from "../../cmTinymce";
import Ques from "../../imgs/ques.png";
import css from "./index.module.less";

const modalContent = () => {
  return (
    <div className={css.wrapper}>
      <div>
        根据文件中引用文件的具体情况，文件清单中列出的引用文件的排列顺序为：
      </div>
      <div>a）国家标准化文件，</div>
      <div>b） 行业标准化文件，</div>
      <div>c）本行政区域的地方标准化文件(仅适用于地方标准化文件的起草)，</div>
      <div>d）团体标准化文 件，</div>
      <div>e）企业标准，</div>
      <div>f）ISO、 ISO/IEC或IEC标准化文件，</div>
      <div>g）其他机构或组织的标准化文件，</div>
      <div>h）其他文献。</div>
      <div>
        其中，国家标准、ISO或IEC标准按文件顺序号排列；行业标准、地方标准、团体标准、其他国际标准化文件先按文件代号的拉丁字母和/或阿拉伯数字的顺序排列，再按文件顺序号排列。
      </div>
      <div>
        另外，集团级企业标准不允许向下引用文件，即不能引用专业级企业标准、技术中心级企业标准及技术说明书等文件。集团级企业标准也不允许引用其他企业的企业标准。
      </div>
    </div>
  );
};

const initContent = [
  {
    symbol: "1",
    value: "",
    id: "referenceObjId1",
  },
];

const contentObj = {
  symbol: "",
  value: "",
};
let mounts = true;

// eslint-disable-next-line react/display-name
const Reference = forwardRef(({ referenceData }, ref) => {
  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);
  const [valueData, setValueData] = useState(initContent);

  // useImperativeHandle(ref, () => ({
  //   getReference: () => {
  //     return valueData;
  //   },
  // }));

  useEffect(() => {
    mounts = false;
    if (referenceData) {
      setValueData(referenceData?.length ? referenceData : initContent);
      setTimeout(() => {
        mounts = true;
      }, 800);
    }
  }, [referenceData]);

  useEffect(() => {
    if (mounts) {
      outlineAllData[5].data = valueData;
      dispatch(dataHasBeenUpdated(true));
      // dispatch(updateOutlineAllData(outlineAllData));
    }
  }, [valueData]);

  // type 1 : 第一层级（a级添加）
  const contentAdd = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const newLable = String.fromCharCode(data.symbol.charCodeAt(0) * 1 + 1);
    newData.splice(curIndex + 1, 0, {
      ...contentObj,
      symbol: newLable,
      id: createUidKey(),
    });
    if (valueData.length > 1) {
      const afterArr = newData.slice(curIndex + 2);
      afterArr.forEach((el) => {
        el.symbol = String.fromCharCode(el.symbol.charCodeAt(0) * 1 + 1);
        return el;
      });
    }
    setValueData(newData);
  };

  // type 1 : 第一层级（a级删除）
  const contentDel = (data) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    const preArr = newData.slice(0, curIndex);
    const afterArr = newData.slice(curIndex + 1);
    afterArr.forEach((el) => {
      el.symbol = String.fromCharCode(el.symbol.charCodeAt(0) * 1 - 1);
      return el;
    });
    setValueData([...preArr, ...afterArr]);
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
              <p>{`[${el.symbol}]`}</p>
              <CmTinymce
                inline={true}
                value={el.value}
                selectorName="reference_top_fixed"
                onChange={(data) => contentTxtChange(data, el)}
              />
              <div className={css.symbol}>
                {index + 1 === valueData.length ? "。" : "；"}
              </div>
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => contentAdd(el)} />
                <PopCom
                  position={"left"}
                  title={"Delete?"}
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
    <div className={css.reference_wrapper}>
      <SwitchWrapper
        label={"Reference"}
        // imgSrc={Ques}
        disableSwitch={true}
        // modalTitle="规则说明"
        // modalContent={modalContent}
        wrapClassName="ref_explaination"
      >
        <div className={css.bot_wrapper}>{renderContent()}</div>
      </SwitchWrapper>
    </div>
  );
});

export default Reference;
