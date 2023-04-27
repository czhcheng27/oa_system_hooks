import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Modal, message, Input, Table } from "antd";
import { RightOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";
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

  const openHandle = () => {
    setVisible(true);
    initialFunc();
  };

  const cancelHandle = () => {
    setVisible(false);
  };

  const initialFunc = () => {
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
  };

  // useEffect(() => {
  //   initialFunc()
  // }, []);

  // 点击整行选择
  const onLSelectRow = (record) => {
    const selectedList = [...lSelectedRowKeys];
    if (selectedList.indexOf(record.projectId) >= 0) {
      selectedList.splice(selectedList.indexOf(record.projectId), 1);
    } else {
      selectedList.push(record.projectId);
    }
    setLSelectedRowKeys(selectedList);
    const rows = originalLeftData.reduce((pre, item) => {
      if (selectedList.includes(item.projectId)) {
        pre.push(item);
      }
      return pre;
    }, []);
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
    setRCheckedData(rows);
  };

  const handletoR = () => {
    !lCheckedData.length && message.warning("No Data Selected");
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
    !rCheckedData.length && message.warning("No Data Selected");
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
    if (searchValue) {
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
    } else {
      let filteredLeftArr = originalLeftData.filter((item) => {
        return (
          rDataSource.findIndex((i) => i["projectId"] == item["projectId"]) ==
          -1
        );
      });
      return filteredLeftArr;
    }
  };

  useEffect(() => {
    handleSearch(originalLeftData, rDataSource, searchValue);
  }, [searchValue]);

  return (
    <Modal
      // open={true}
      open={visible}
      wrapClassName="addUpdate_modal_wrapper"
      title="Show Project Adjustment"
      centered={true}
      onCancel={cancelHandle}
      footer={null}
    >
      <div className={css.transfer_table_wrapper}>
        {/* left area */}
        <div className={css.left_area}>
          <p className={css.title}>Business units to be associated</p>
          <div className={css.search_input}>
            <Input
              allowClear
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter the name/number"
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
                setLSelectedRowKeys(keys), setLCheckedData(rows)
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
            className={`${lCheckedData.length ? css.usable : css.normal}`}
            onClick={handletoR}
          >
            <RightOutlined />
          </span>
          <span
            className={`${rCheckedData.length ? css.usable : css.normal}`}
            onClick={handletoL}
          >
            <LeftOutlined />
          </span>
        </div>

        {/* right area */}
        <div className={css.right_area}>
          <div className={css.title}>
            <span>Associated business units</span>
            {/* <span className={css.clear}>Clear Selected</span> */}
          </div>
          <div className={css.related_units}>
            Associated No.：<h4>{rDataSource.length}</h4>
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
              onChange: (keys, rows) => (
                setRSelectedRowKeys(keys), setRCheckedData(rows)
              ),
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
