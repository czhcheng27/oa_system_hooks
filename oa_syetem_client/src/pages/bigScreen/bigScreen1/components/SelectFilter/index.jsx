import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import selectCss from "../../index.module.less";
import css from "./index.module.less";

const SelectFilter = ({ mode, callback, type, initVal, options }) => {
  const handleChange = (val) => {
    console.log("val", val);
    if (!val.length) return;
    callback(val, type);
  };

  return (
    <div className={css.chartBox}>
      <div className={css.handleBox}>
        <Select
          className={css.selectBox}
          value={initVal}
          defaultActiveFirstOption
          placeholder="请选择"
          size="small"
          placement="bottomRight"
          mode={mode}
          maxTagCount={1}
          filterOption={false}
          listHeight={160}
          maxTagTextLength={104}
          dropdownMatchSelectWidth={false}
          maxTagPlaceholder={(omittedValues) => omittedValues.length + 1}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          suffixIcon={<CaretDownOutlined />}
          onChange={handleChange}
          options={options}
        ></Select>
      </div>
    </div>
  );
};

export default SelectFilter;
