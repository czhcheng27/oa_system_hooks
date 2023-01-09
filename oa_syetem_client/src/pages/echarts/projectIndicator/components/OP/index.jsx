import React, { useState, useEffect, useCallback, useRef } from "react";
import { DatePicker, Radio } from "antd";
import classNames from "classnames";
import { apiMockData } from "./mock";
import css from "./index.module.css";

const { RangePicker } = DatePicker;

const filterOptions = [
  {
    label: "Department",
    value: "01",
  },
  {
    label: "Role",
    value: "02",
  },
  {
    label: "Activity",
    value: "03",
  },
];

const OP = (props) => {
  const { setSearchType, setDatePickerData, setSelectedBar, timeChangeFunc } =
    props;

  const [radioValue, setRadioValue] = useState("");
  const [dateValue, setDateValue] = useState(["", ""]);
  const [echartsData, setEchartsData] = useState([]);

  const onRadioChange = (e) => {
    setSearchType(e.target.value);
    setRadioValue(e.target.value);
  };

  const editDatePicker = (date, dateStr) => {
    setDatePickerData(dateStr);
    setDateValue(dateStr);
    timeChangeFunc(dateStr);
  };

  const clickBar = (data) => {
    setSelectedBar(data);
  };

  const sortopInfoMapData = (data, name) => {
    const sortBy = (field) => {
      return (x, y) => {
        return x[field] - y[field];
      };
    };
    data.map((obj) => {
      obj.opInfoMap.sort(sortBy(name));
      return obj;
    });
    return data;
  };

  //   api request
  const getBarData = () => {
    console.log("api params", dateValue, radioValue);
    const dataAfterSort = sortopInfoMapData(apiMockData.data, "taskStatus");
    setEchartsData(dataAfterSort);
  };

  useEffect(() => {
    getBarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue, radioValue]);

  return (
    <div className={classNames(css.wrapper)}>
      <header className={classNames(css.top)}>
        <h3>各部门OP级任务完成率</h3>
        <div className={classNames(css.filter_wrapper)}>
          <div>
            <RangePicker
              onChange={(date, dateStr) => editDatePicker(date, dateStr)}
            />
          </div>
          <div className={css.radioParam}>
            <Radio.Group
              onChange={onRadioChange}
              optionType="button"
              buttonStyle="solid"
              defaultValue={"01"}
            >
              {filterOptions.map((obj, index) => {
                return (
                  <Radio value={obj.value} key={index}>
                    {obj.label}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        </div>
      </header>

      <section></section>
    </div>
  );
};

export default OP;
