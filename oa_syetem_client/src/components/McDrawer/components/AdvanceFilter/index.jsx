import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Form, Input, Select, Popover, DatePicker } from "antd";
import moment from "moment";
import classNames from "classnames";
import { useUpdateEffect } from "ahooks";
import { cloneDeep, debounce } from "../../../../utils";
import {
  initFilterOpts,
  dictCodeMap,
  firstIndexZeroOpts,
  firstOpts,
  specialRelatedUpdateArr,
  specialCompMap,
  dateComp,
  singleSelectArr,
  WHEN,
  EQUAL,
  STANDARDNO,
  STANDARDNAME,
  DRAFTPERSON,
  fieldNameMap,
  DRAFTINS,
  DRAFTDEPT,
} from "./const";
import { mockStandardNoName, mockDrafterHospital } from "./mock";
import AddIcon from "../../assets/add.svg";
import CloseIcon from "../../assets/close.svg";
import css from "./index.module.less";

let isComposition = false;
const dateFormat = "YYYY-MM-DD";
const { Item, List } = Form;
const { RangePicker } = DatePicker;

const AdvanceFilter = forwardRef(({ setDisableConfirm, isFullscreen }, ref) => {
  const [form] = Form.useForm();
  const advanceFilter = Form.useWatch("advanceFilter", form) || [];

  const [filterOpts, setFilterOpts] = useState(cloneDeep(initFilterOpts)); // 可选添加条件的选项状态
  const [stdNoOpts, setStdNoOpts] = useState([]); // 标准号下拉选项
  const [stdNoOrgOpts, setStdNoOrgOpts] = useState([]); // 全量标准号的下拉选数据
  const [stdNameOpts, setStdNameOpts] = useState([]); // 标准名称下拉选项
  const [stdNameOrgOpts, setStdNameOrgOpts] = useState([]); // 全量标准名称的下拉选数据
  const [draftInsOpts, setDraftInsOpts] = useState([]); // 起草院下拉选项
  const [draftInsOrgOpts, setDraftInsOrgOpts] = useState([]); // 全量起草院的下拉选数据
  const [personArr, setPersonArr] = useState([]); // 起草人数据

  useImperativeHandle(ref, () => ({
    getSelectData,
    resetValueFunc,
  }));

  const getSelectData = async () => {
    const formatValue = await form
      .validateFields()
      .then((result) => {
        const formData = result.advanceFilter;
        const res = getFormatFormData(cloneDeep(formData));
        const passToQryData = getFormatFormData(cloneDeep(formData), "qry");
        // console.log('getSelectData', res);
        const data = {
          logicalOperator: formData[1]?.firstVal ?? "",
          conditionVOList: res,
        };
        saveAdcFilterCache(data);
        return {
          code: 200,
          data: {
            logicalOperator: formData[1]?.firstVal ?? "",
            conditionVOList: passToQryData,
          },
        };
      })
      .catch((e) => {
        return {
          code: 500,
          message: e.errorFields[0].errors[0],
        };
      });
    return formatValue;
  };

  const getFormatFormData = (dataArr, code) => {
    return dataArr.map((el, index) => {
      const hasDateComp = dateComp.includes(el.name);
      if (hasDateComp) {
        const isRangePicker = el.values.length == 2;
        if (isRangePicker) {
          el.values = [
            el.values[0].format(dateFormat),
            el.values[1].format(dateFormat),
          ];
        } else {
          el.values = el.values.format(dateFormat);
        }
      }
      if (el.name === DRAFTPERSON && code === "qry") {
        el.values = el.values.map((el) => el.value);
      }
      const formatVal = Array.isArray(el.values) ? el.values : [el.values];
      return { name: el.name, values: formatVal, operator: el.operator };
    });
  };

  const saveAdcFilterCache = (data) => {
    const { conditionVOList, logicalOperator } = data;
    const res = conditionVOList.reduce((prev, item) => {
      let obj = item;
      if (item.name === DRAFTPERSON) obj.values = personArr;
      prev.push(obj);
      return prev;
    }, []);
  };

  const resetValueFunc = () => {
    const res = advanceFilter.map((el) => {
      const targetObj = initFilterOpts.find((opt) => opt.name === el.name);
      el.values = targetObj.values;
      return el;
    });
    console.log("resetValueFunc", res);
    form.setFieldValue("advanceFilter", res);
  };

  useUpdateEffect(() => {
    setDisableConfirm(!advanceFilter.length);
  }, [advanceFilter.length]);

  useEffect(() => {
    getStdNoList();
    getStdNameList();
    getDraftInsList();
    // getDraftDeptList();
    setDisableConfirm(true);
  }, []);

  const getFormInitialData = (initData) => {
    // 对 initData 进行时间的格式化处理，之后在对 form 进行赋值
    const formatInitData = formatInitDataFunc(initData);
    form.setFieldValue("advanceFilter", formatInitData);
  };

  // 对初始数据进行格式化，目前只针对时间控件
  const formatInitDataFunc = (initData) => {
    const { logicalOperator = WHEN, conditionVOList = [] } = initData;
    const res = conditionVOList.map((el, index) => {
      const hasDateComp = dateComp.includes(el.name);
      if (hasDateComp) {
        const isRangePicker = el.values.length == 2;
        if (isRangePicker) {
          el.values = [
            moment(el.values[0], dateFormat),
            moment(el.values[1], dateFormat),
          ];
        } else {
          el.values = moment(el.values[0], dateFormat);
        }
      }
      if (el.name === DRAFTPERSON) {
        el.mode = singleSelectArr.includes(el.operator) ? "single" : "multiple";
        setPersonArr(el.values);
        const formatVal = el.values.flatMap((el) => [
          { label: el.name, value: el.id },
        ]);
        el.values = formatVal;
      }
      const initTargetObj = initFilterOpts.find((opt) => opt.name === el.name);
      const specialCode = specialCompMap[el.operator];
      const obj = {
        ...initTargetObj,
        firstVal: index == 0 ? WHEN : logicalOperator,
        code: specialCode ?? initTargetObj.code,
        operator: el.operator,
        mode: el.mode ?? initTargetObj.mode,
        values: el.values,
        disabled: true,
      };
      return obj;
    });
    return res;
  };

  // 标准号调用接口
  const getStdNoList = (searchParams) => {
    setStdNoOpts(mockStandardNoName);
    setStdNoOrgOpts(mockStandardNoName);
  };

  // 标准名称调用接口
  const getStdNameList = (searchParams) => {
    setStdNameOpts(mockStandardNoName);
    setStdNameOrgOpts(mockStandardNoName);
  };

  // api 起草院下拉选数据
  const getDraftInsList = (searchParams) => {
    setDraftInsOpts(mockDrafterHospital);
    setDraftInsOrgOpts(mockDrafterHospital);
  };

  // api 起草部门下拉选数据
  const getDraftDeptList = (searchParams) => {};

  // 新增, 删除 筛选条件时的操作
  useUpdateEffect(() => {
    const res = advanceFilter.map((el, index) => {
      if (index == 0) el.firstVal = WHEN;
      if (index == 1)
        el.firstVal = el.firstVal ? el.firstVal : firstOpts[0].value;
      if (index > 1) el.firstVal = advanceFilter[1]?.firstVal;
      return el;
    });
    form.setFieldValue("advanceFilter", res);

    // 针对 filterOpts 筛选项处理
    updateFilterOptsDisabledStatus();
  }, [advanceFilter?.length]);

  // 针对 filterOpts 内各对象的 disabled 禁用状态做更新
  const updateFilterOptsDisabledStatus = (formArr = advanceFilter) => {
    const appliedFilterTypeArr = formArr.map((el) => el.name);
    const res = filterOpts.map((el, index) => {
      const applied = appliedFilterTypeArr.includes(el.name);
      el.disabled = applied;
      return el;
    });
    setFilterOpts(res);
  };

  // 渲染顶部添加按钮
  const renderAddFilterPop = (add) => {
    return (
      <Popover
        overlayClassName="action_popover"
        placement="bottomRight"
        title={null}
        content={() => renderPopContent(add)}
      >
        <div className={css.addFilter}>
          <img src={AddIcon} />
          Add Filter
        </div>
      </Popover>
    );
  };

  // 渲染顶部浮窗
  const renderPopContent = (add) => {
    return filterOpts?.map((el, index) => {
      return (
        <div
          className={classNames({
            [css.eachOne]: true,
            [css.disabled]: el.disabled,
          })}
          key={index}
          onClick={() => !el.disabled && add(el)}
        >
          {el.label}
        </div>
      );
    });
  };

  // 渲染第二列下拉选
  const renderSecondColSelect = (index) => {
    const opts_clone = cloneDeep(filterOpts);
    // 此处下拉选项需要额外再把当前自己的 disabled 置为 false
    const options = opts_clone.map((el) => {
      if (el.name == advanceFilter[index].name) el.disabled = false;
      return el;
    });
    return (
      <Select
        popupClassName="custom_selectPop"
        placeholder="请选择"
        options={options}
        listHeight={196}
        fieldNames={{
          label: "label",
          value: "name",
        }}
        onChange={(key, obj) => secondColChangeFunc(key, obj, index)}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      />
    );
  };

  const firstColChangeFunc = (key) => {
    const res = advanceFilter.map((el, index) => {
      if (index == 1) el.firstVal = key;
      if (index > 1) el.firstVal = key;
      return el;
    });
    form.setFieldValue("advanceFilter", res);
  };

  // 第二列下拉选变化需要的操作：1、变更项的第三列、第四列重置为 initFilterOpts 对应的对象。2、更新禁用状态
  const secondColChangeFunc = (key, obj, index) => {
    // console.log('secondColChangeFunc', key, obj, index);
    // 1、变更项的第三列、第四列重置为 initFilterOpts 对应的对象。
    const res = advanceFilter.map((el, i) => {
      if (i === index) {
        const initTargetObj = initFilterOpts.find((el) => el.name === key);
        el = { ...initTargetObj, firstVal: el.firstVal };
      }
      return el;
    });
    form.setFieldValue("advanceFilter", res);

    // 更新禁用状态：当前 advanceFilter 的选项，在 filterOpts 里对应的 disabled 都应置为 true
    updateFilterOptsDisabledStatus(res);
  };

  /**
   * 第三列：第四列值置空
   * 且如果是选择时间，需要额外判断时间组件类型
   * 且如果是选人组件，需要额外更改人员 state 状态、及修改 选人组件单选多选模式
   */
  const thirdColChangeFunc = (key, obj, index) => {
    const isRelated = specialRelatedUpdateArr.includes(
      advanceFilter[index].name
    );
    const res = advanceFilter.map((el, i) => {
      if (i == index) {
        el.values = undefined;
        el.operator = key;
        if (isRelated) el.code = specialCompMap[key];
        if (el.name === DRAFTPERSON) {
          setPersonArr([]);
          el.mode = singleSelectArr.includes(key) ? "single" : "multiple";
        }
      }
      return el;
    });
    form.setFieldValue("advanceFilter", res);
  };

  const handleShouldUpdate = (prevValues, curValues, index) => {
    return (
      prevValues?.advanceFilter[index]?.["name"] !==
      curValues?.advanceFilter[index]?.["name"]
    );
  };

  const renderItem = (field, index) => {
    const curItem = advanceFilter[index];
    const isDrafePerson = curItem.name === DRAFTPERSON;
    return (
      <Item
        {...field}
        name={[field.name, "values"]}
        validateTrigger={isDrafePerson ? ["onChange", "onBlur"] : "onChange"}
        rules={[
          isDrafePerson
            ? {
                validator: (_, value) => checkPerson(_, value, curItem),
              }
            : {
                required: true,
                message: curItem.msg,
              },
        ]}
      >
        {formItem[curItem.code](advanceFilter[index])}
      </Item>
    );
  };

  const checkPerson = (_, value, curItem) => {
    if (personArr.length) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(curItem.msg));
  };

  /**
   * 10: Input
   * 20: Select
   * 30: DatePicker
   * 40: RangePicker
   * 50：Dynamic Remote Search: 下拉选，不直接获取全部数据，支持接口动态搜索
   * 60：SelectUserModal
   * 70：Normal Select With Filter: 下拉选，直接获取全部数据，前端进行搜索过滤
   */
  const formItem = {
    10: (curItem) => renderInput(curItem),
    20: (curItem) => renderSelector(curItem),
    30: () => renderDatePicker(),
    40: () => renderRangePicker(),
    50: (curItem) => renderDynamicRemoteSelect(curItem),
    60: (curItem) => renderSelectUser(curItem),
    70: (curItem) => renderFrontFilterSelect(curItem),
  };

  // 10: 普通输入框
  const renderInput = (curItem) => {
    return <Input placeholder="请输入内容" />;
  };

  // 20：普通下拉选
  const renderSelector = (curItem) => {
    // const [dictCode, dictType] = dictCodeMap[curItem.name].split('|');
    // const opts = dictArray[dictCode].filter((el) => (dictType ? !el.parentId : el));
    // return (
    //   <Select
    //     allowClear
    //     popupClassName="custom_selectPop"
    //     mode={curItem.mode}
    //     placeholder={curItem.msg}
    //     options={opts}
    //     listHeight={196}
    //     getPopupContainer={(triggerNode) => triggerNode.parentNode}
    //   ></Select>
    // );
  };

  // 30：单点时间组件
  const renderDatePicker = () => {
    return (
      <DatePicker getPopupContainer={(triggerNode) => triggerNode.parentNode} />
    );
  };

  // 40：范围时间组件
  const renderRangePicker = () => {
    return (
      <RangePicker
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      />
    );
  };

  // 将接口获取到数据格式化成 label id
  const formatFunc = (arr, mapObj) => {
    return arr.reduce((prev, item) => {
      prev.push({ label: item[mapObj.label], value: item[mapObj.id] });
      return prev;
    }, []);
  };

  // 输入拼音时搜索文字的处理
  const handleComposition = (ev) => {
    isComposition = ev.type !== "compositionend";
  };

  // 远程动态搜索 config 配置
  const dynamicRemoteSelectPropsMap = {
    [STANDARDNO]: {
      // loading: stdNoLoading,
      opts: formatFunc(stdNoOpts, fieldNameMap[STANDARDNO]),
      dynamicSearchFunc: getStdNoList,
    },
    [STANDARDNAME]: {
      // loading: stdNameLoading,
      opts: formatFunc(stdNameOpts, fieldNameMap[STANDARDNAME]),
      dynamicSearchFunc: getStdNameList,
    },
    [DRAFTINS]: {
      // loading: draftInsLoading,
      opts: formatFunc(draftInsOpts, fieldNameMap[DRAFTINS]),
      dynamicSearchFunc: getDraftInsList,
    },
    // [DRAFTDEPT]: {
    //   loading: draftDeptLoading,
    //   opts: formatFunc(draftDeptOpts, fieldNameMap[DRAFTDEPT]),
    //   dynamicSearchFunc: getDraftDeptList,
    // },
  };

  // 50：远程搜索下拉选
  const renderDynamicRemoteSelect = (curItem) => {
    // console.log('curItem', curItem);
    const { opts, loading, dynamicSearchFunc } =
      dynamicRemoteSelectPropsMap[curItem.name];
    return (
      <Select
        popupClassName="custom_selectPop"
        showSearch
        allowClear
        options={opts}
        listHeight={196}
        mode={"multiple"}
        placeholder={curItem.msg}
        filterOption={false}
        defaultActiveFirstOption={false}
        onClear={() => {}}
        onSearch={(txt) => remoteSearchFunc(txt, dynamicSearchFunc)}
        onChange={(value) => dynamicSearchValChange50(curItem, value)}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        dropdownRender={(menu) => <>{menu}</>}
      />
    );
  };

  // 搜索时调用方法
  const remoteSearchFunc = debounce((txt, dynamicSearchFunc) => {
    let searchTxt;
    if (!isComposition) searchTxt = txt;
    searchTxt !== undefined && dynamicSearchFunc(searchTxt);
  }, 300);

  // 额外需求：可选条件为 “等于” 时，变为单选，目前只写了根据可选条件判断，没加类型匹配，懒得写了，后续可以配字典实现
  const dynamicSearchValChange50 = (curItem, value) => {
    const { name, operator } = curItem;
    if (operator !== EQUAL) return;
    const res = advanceFilter.map((el) => {
      if (el.name === name) el.values = value.slice(-1);
      return el;
    });
    form.setFieldValue("advanceFilter", res);
  };

  // 60: 选人对应组件
  const renderSelectUser = (curItem) => {
    // return (
    //   <Select
    //     allowClear
    //     mode="multiple"
    //     // maxTagCount="responsive"
    //     placeholder={curItem.msg}
    //     onClick={() => setSelPersonModal(true)}
    //     onChange={personChange}
    //     open={false}
    //   />
    // );
  };

  // 前端静态搜索 config 配置
  const frontFilterSelectPropsMap = {
    [STANDARDNO]: {
      opts: formatFunc(stdNoOpts, fieldNameMap[STANDARDNO]),
      orgOpts: stdNoOrgOpts,
      setFunc: setStdNoOpts,
    },
    [STANDARDNAME]: {
      opts: formatFunc(stdNameOpts, fieldNameMap[STANDARDNAME]),
      orgOpts: stdNameOrgOpts,
      setFunc: setStdNameOpts,
    },
    [DRAFTINS]: {
      opts: formatFunc(draftInsOpts, fieldNameMap[DRAFTINS]),
      orgOpts: draftInsOrgOpts,
      setFunc: setDraftInsOpts,
    },
    // [DRAFTDEPT]: {
    //   opts: formatFunc(draftDeptOpts, fieldNameMap[DRAFTDEPT], DRAFTDEPT),
    //   orgOpts: draftDeptOrgOpts,
    //   setFunc: setDraftDeptOpts,
    // },
  };

  // 70: Normal Select With Filter: 下拉选，直接获取全部数据，前端进行搜索过滤
  const renderFrontFilterSelect = (curItem) => {
    const { opts, orgOpts, setFunc } = frontFilterSelectPropsMap[curItem.name];
    return (
      <Select
        popupClassName="custom_selectPop"
        showSearch
        allowClear
        options={opts}
        listHeight={196}
        mode={"multiple"}
        placeholder={curItem.msg}
        filterOption={false}
        defaultActiveFirstOption={false}
        onSearch={(val) =>
          frontFilterSelectSearch70(val, curItem, orgOpts, setFunc)
        }
        onChange={(value) =>
          frontFilterSelectChange70(curItem, value, orgOpts, setFunc)
        }
        onClear={() => {}}
        // onBlur={() => frontFilterSelectBlur(curItem)}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      />
    );
  };

  // 失焦后，判断是否有选中选项，如果没有，下拉选项重置为全部选项
  // const frontFilterSelectBlur = (curItem) => {
  //   const { orgOpts, setFunc } = frontFilterSelectPropsMap[curItem.name];
  //   curItem.values ? null : setFunc(orgOpts);
  // };

  const frontFilterSelectSearch70 = debounce(
    (val, curItem, orgOpts, setFunc) => {
      let searchTxt;
      if (!isComposition) searchTxt = val;
      const labelName = fieldNameMap[curItem.name].label;
      const res = orgOpts.filter((el) =>
        el[labelName].toLowerCase().includes(val.toLowerCase())
      );
      setFunc(searchTxt ? res : orgOpts);
    },
    300
  );

  const frontFilterSelectChange70 = (curItem, value, orgOpts, setFunc) => {
    setFunc(orgOpts); // 选中后，可供选择是下拉选项重置为原始全部选项
    const { name, operator } = curItem;
    if (!singleSelectArr.includes(operator)) return;
    // 当条件选项是“等于”或“不等于”，需要只取最后一个值
    const res = advanceFilter.map((el) => {
      if (el.name === name) el.values = value.slice(-1);
      return el;
    });
    form.setFieldValue("advanceFilter", res);
    // if (!value.length) setFunc(orgOpts);
  };

  // 删除筛选条件时
  const deleteFilter = (remove, fieldName, index) => {
    remove(fieldName);
    const curDelItemType = advanceFilter[index].name;
    // 重置更新 filterOpts
    const res = filterOpts.map((el) => {
      if (el.name === curDelItemType) {
        el = initFilterOpts.find((el) => el.name === curDelItemType);
      }
      return el;
    });
    setFilterOpts(res);
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      className={classNames({
        // [css.fullscreen]: isFullscreen,
        [css.advancedForm]: true,
      })}
    >
      <List name="advanceFilter">
        {(fields, { add, remove }) => (
          <>
            {advanceFilter.length
              ? fields.map((field, index) => (
                  <div key={field.key} className={css.eachRow}>
                    <div className={css.firstCol}>
                      <Item {...field} name={[field.name, "firstVal"]}>
                        <Select
                          popupClassName="custom_selectPop"
                          placeholder="please select"
                          disabled={index != 1}
                          bordered={index == 1}
                          options={index == 0 ? firstIndexZeroOpts : firstOpts}
                          onChange={firstColChangeFunc}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                          }
                        />
                      </Item>
                    </div>
                    <div className={css.secondCol}>
                      <Item {...field} name={[field.name, "name"]}>
                        {renderSecondColSelect(index)}
                      </Item>
                    </div>

                    <div className={css.thirdCol}>
                      <Item {...field} name={[field.name, "operator"]}>
                        <Select
                          popupClassName="custom_selectPop"
                          placeholder="please select"
                          options={advanceFilter[index].conditionOpts}
                          onChange={(key, obj) =>
                            thirdColChangeFunc(key, obj, index)
                          }
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                          }
                        />
                      </Item>
                    </div>

                    <div className={css.fourthCol}>
                      <Item
                        shouldUpdate={(prevValues, curValues) =>
                          handleShouldUpdate(prevValues, curValues, index)
                        }
                      >
                        {() => renderItem(field, index)}
                      </Item>
                    </div>
                    <div className={css.btns}>
                      <img
                        src={CloseIcon}
                        className={css.actBtn}
                        onClick={() => deleteFilter(remove, field.name, index)}
                      />
                    </div>
                  </div>
                ))
              : null}
            {renderAddFilterPop(add)}
          </>
        )}
      </List>
    </Form>
  );
});
AdvanceFilter.displayName = "AdvanceFilter";
export default AdvanceFilter;
