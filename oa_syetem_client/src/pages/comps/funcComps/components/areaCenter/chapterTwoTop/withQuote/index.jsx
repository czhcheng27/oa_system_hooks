import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
// import { DcpTinymce } from "dcp-design-react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { cloneDeep, createUidKey } from "@/utils";
// import PopCom from "../../../../../popCom";
// import SwitchWrapper from "@/pages/comps/revision/switchWrapper";
// import Ques from "../../../../imgs/ques.png";
// import { toolkitInit } from "../../../../const";
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
    symbol: "a",
    value: "",
    id: "withQuoteObjId1",
  },
];

const contentObj = {
  symbol: "",
  value: "",
};

// eslint-disable-next-line react/display-name
const WithQuote = forwardRef(
  ({ id, quoteData, noQuoteStch, comValueUpdate, setNoQuoteStch }, ref) => {
    const isdragging = useSelector((s) => s.rdcDragStart);

    const [valueData, setValueData] = useState(initContent);

    const isFirstRef = useRef(true);

    useImperativeHandle(ref, () => ({
      getWithQuote: () => {
        return valueData;
      },
    }));

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
      comValueUpdate(null, null, null, id, {
        noQuote: noQuoteStch,
        valueData: newData,
      });
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
      comValueUpdate(null, null, null, id, {
        noQuote: noQuoteStch,
        valueData: [...preArr, ...afterArr],
      });
    };

    // 一级文本更改时更新数据函数
    const contentTxtChange = (txt, obj) => {
      const newData = cloneDeep(valueData);
      newData.map((el) => {
        if (el.id === obj.id) el.value = txt;
        return el;
      });
      setValueData(newData);
      const combineData = { noQuote: noQuoteStch, valueData: newData };
      !isFirstRef.current && comValueUpdate(null, null, null, id, combineData);
    };

    // const renderContent = () => {
    //   return (
    //     valueData.length &&
    //     valueData.map((el, index) => {
    //       const disable = valueData.length === 1;
    //       return (
    //         <div key={index} className={css.content_wrapper}>
    //           <div className={css.content}>
    //             {/* <p>{`${el.symbol})`}</p> */}
    //             <DcpTinymce
    //               value={el.value}
    //               className={css.content_chapter2_quote}
    //               tinymce={{
    //                 ...toolkitInit,
    //                 selector: "content_chapter2_quote",
    //               }}
    //               onChange={(data) => contentTxtChange(data, el)}
    //             />
    //             {/* <div className={css.symbol}>{index + 1 === valueData.length ? '。' : ';'}</div> */}
    //             <div className={css.handle_btn}>
    //               <PlusCircleOutlined onClick={() => contentAdd(el)} />
    //               <PopCom
    //                 position={"left"}
    //                 title={"确定删除?"}
    //                 disable={disable}
    //                 handleConfirm={() => contentDel(el)}
    //               >
    //                 {
    //                   <MinusCircleOutlined
    //                     className={classNames({ [css.diable_hover]: disable })}
    //                   />
    //                 }
    //               </PopCom>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })
    //   );
    // };

    useEffect(() => {
      if (isFirstRef.current) {
        setTimeout(() => {
          isFirstRef.current = false;
        }, 500);
      }
      if (quoteData) {
        setValueData(quoteData ?? initContent);
      }
    }, [quoteData]);

    return (
      <div>
        {/* <SwitchWrapper
          label={"引用文件(有引用)"}
          interlock={true}
          from="b"
          imgSrc={Ques}
          modalTitle="规则说明"
          modalContent={modalContent}
          wrapClassName="chapterTwo_withQuote"
          switchVal={!noQuoteStch}
          switchFunc={setNoQuoteStch}
        >
          <div style={{ marginBottom: "12px" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            下列文件中的内容通过文中的规范性引用而构成本文件必不可少的条款。其中，注日期的引用文件，仅该日期对应的版本适用于本文件；不注日期的引用文件，其最新版本（包括所有的修改单）适用于本文件。
          </div>
          <div className={css.bot_wrapper}>{renderContent()}</div>
          {isdragging && <div className={css.overlay} />}
        </SwitchWrapper> */}
      </div>
    );
  }
);

export default WithQuote;
