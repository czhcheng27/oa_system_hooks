import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import classNames from "classnames";
import { Modal, message, Input, Table } from "antd";
import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { columns, mockData } from "./mock";
import css from "./index.module.less";

const TransferTableModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openHandle,
  }));
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [lSelectedRowKeys, setLSelectedRowKeys] = useState([]);
  const [rSelectedRowKeys, setRSelectedRowKeys] = useState([]);
  const [lCheckedData, setLCheckedData] = useState([]); //左侧选中的数据
  const [rCheckedData, setRCheckedData] = useState([]); //右侧选中的数据
  const [originalLeftData, setOriginalLeftData] = useState([]);
  const [lDataSource, setLDataSource] = useState([]); //左侧展示的数据
  const [rDataSource, setRDataSource] = useState([]); //右侧展示的数据
  const [toBtnUsable, setToBtnUsable] = useState(false); //去右侧的按钮
  const [backBtnUsable, setBackBtnUsable] = useState(false); //回左侧的按钮

  const openHandle = () => {
    setVisible(true);
  };

  const cancelHandle = () => {
    setVisible(false);
  };

  useEffect(() => {
    const { allProjectList, selectedProjectList } = mockData.data;
    let filteredLeftArr = allProjectList.filter((item) => {
      return (
        selectedProjectList.findIndex(
          (i) => i["projectId"] == item["projectId"]
        ) == -1
      );
    });
    setLDataSource(filteredLeftArr);
    setOriginalLeftData(allProjectList);
    setRDataSource(selectedProjectList);
  }, []);

  // 点击整行选择
  const onLSelectRow = (record) => {
    const selectedList = [...lSelectedRowKeys];
    if (selectedList.indexOf(record.projectId) >= 0) {
      selectedList.splice(selectedList.indexOf(record.projectId), 1);
    } else {
      selectedList.push(record.projectId);
    }
    console.log("selectedList", selectedList);
    setLSelectedRowKeys(selectedList);
    const rows = originalLeftData.reduce((pre, item) => {
      if (selectedList.includes(item.projectId)) {
        pre.push(item);
      }
      return pre;
    }, []);
    console.log("rows", rows);
    setLCheckedData(rows);
  };

  // 点击整行选择
  const onRSelectRow = (record) => {
    const selectedList = [...rSelectedRowKeys];
    if (selectedList.indexOf(record.projectId) >= 0) {
      selectedList.splice(selectedList.indexOf(record.projectId), 1);
    } else {
      selectedList.push(record.projectId);
    }
    setRSelectedRowKeys(selectedList);
    const rows = originalLeftData.reduce((pre, item) => {
      if (selectedList.includes(item.projectId)) {
        pre.push(item);
      }
      return pre;
    }, []);
    console.log("rows", rows);
    setRCheckedData(rows);
  };

  const handletoR = () => {
    !lCheckedData.length && message.warning("还没勾选数据");
    console.log("lCheckedData", lCheckedData);
    const latestRightData = [...rDataSource, ...lCheckedData];
    setRDataSource(latestRightData);
    setLDataSource((res) => {
      return res.filter(
        (item) => !lCheckedData.some((i) => i["projectId"] == item["projectId"])
      );
    });
    setLSelectedRowKeys([]);
    setLCheckedData([]);
  };

  const handletoL = () => {
    !rCheckedData.length && message.warning("还没勾选数据");
    const latestRightData = rDataSource.filter(
      (item) => !rCheckedData.some((i) => i["projectId"] == item["projectId"])
    );
    const lastestLeftData = [...lDataSource, ...rCheckedData];
    setRDataSource(latestRightData);
    handleSearch(
      searchValue ? lastestLeftData : originalLeftData,
      latestRightData,
      searchValue
    );
    setRCheckedData([]);
    setRSelectedRowKeys([]);
  };

  const handleSearch = (lastestLeftData, latestRightData = [], searchValue) => {
    // 左侧为过滤右侧已选数据后的数据
    const filterLeftData = lastestLeftData.filter(
      (item) =>
        !latestRightData.some((i) => i["projectId"] == item["projectId"])
    );
    // 用过滤右侧已选数据后的左侧数据，再对搜索值进行过滤
    setLDataSource(
      filterFunc(
        filterLeftData,
        ["projectName", "projectNo", "managerName"],
        searchValue
      )
    );
  };

  const filterFunc = (arr, filterParams, searchValue) => {
    let a = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < filterParams.length; j++) {
        const val = arr[i][filterParams[j]].toUpperCase();
        if (val.indexOf(searchValue.toUpperCase()) !== -1) {
          a.push(arr[i]);
          break;
        }
      }
    }
    return a;
  };

  return (
    <Modal
      open={true}
      //   open={visible}
      wrapClassName="addUpdate_modal_wrapper"
      title="Show Project Adjustment"
      centered={true}
      onCancel={cancelHandle}
      footer={null}
    >
      <div className={css.transfer_table_wrapper}>
        {/* left area */}
        <div className={css.left_area}>
          <p className={css.title}>待关联的业务单元</p>
          <div className={css.search_input}>
            <Input
              allowClear
              //   onChange={(e) => setSearchValue(e.target.value)}
              placeholder="输入活动&业务单元的名称/编号"
              suffix={<SearchOutlined className={css.search_icon} />}
            />
          </div>
          <Table
            rowKey={(record) => record.projectId}
            className={css.left_table}
            bordered
            pagination={false}
            dataSource={lDataSource}
            columns={columns}
            rowSelection={{
              selectedRowKeys: lSelectedRowKeys,
              onChange: (keys, rows) => (
                setLSelectedRowKeys(keys),
                setLCheckedData(rows),
                console.log("keys, rows", keys, rows)
              ),
            }}
            onRow={(record, y) => ({
              onClick: (e) => onLSelectRow(record),
            })}
            scroll={{
              y: 343,
            }}
          />
        </div>

        {/* transfer btn */}
        <div className={css.middle_rea}>
          <span
            className={`${toBtnUsable ? css.usable : css.normal}`}
            onClick={handletoR}
          >
            <RightOutlined />
          </span>
          <span
            className={`${backBtnUsable ? css.usable : css.normal}`}
            onClick={handletoL}
          >
            <LeftOutlined />
          </span>
        </div>

        {/* right area */}
        <div className={css.right_area}>
          <div className={css.title}>
            <span>已关联的业务单元</span>
            <span className={css.clear}>清空已选</span>
          </div>
          <div className={css.related_units}>
            已关联业务单元：<h4>{rDataSource.length}</h4>
          </div>
          <Table
            rowKey={(record) => record.projectId}
            className={css.right_table}
            bordered
            pagination={false}
            dataSource={rDataSource}
            columns={columns}
            rowSelection={{
              selectedRowKeys: rSelectedRowKeys,
              onChange: (keys, rows) => {
                setRSelectedRowKeys(rows);
                setRCheckedData(rows);
                if (rows.length) {
                  setBackBtnUsable(true);
                } else {
                  setBackBtnUsable(false);
                }
              },
            }}
            onRow={(record) => ({
              onClick: () => onRSelectRow(record),
            })}
            scroll={{
              y: 443,
            }}
          />
        </div>
      </div>
    </Modal>
  );
});

export default TransferTableModal;
