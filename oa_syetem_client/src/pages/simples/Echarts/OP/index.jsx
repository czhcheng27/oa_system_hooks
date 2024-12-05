import React, { useState, useEffect } from "react";
import { DatePicker, Radio } from "antd";
import classNames from "classnames";
import { apiMockData } from "./mock";
import css from "./index.module.less";
import TaskBar from "./taskBar";

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
  const [radioValue, setRadioValue] = useState("");
  const [dateValue, setDateValue] = useState(["", ""]);
  const [echartsData, setEchartsData] = useState([]);

  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const editDatePicker = (date, dateStr) => {
    setDateValue(dateStr);
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
        <h3>Each Department OP Task Finish Rate</h3>
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

      <section>
        <TaskBar data={echartsData} />
      </section>
    </div>
  );
};

export default OP;
