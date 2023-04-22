import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import classNames from "classnames";
import { Modal, Button, Input, Table } from "antd";
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
  const onSelectRow = (record) => {
    const selectedList = [...selectedRowKeys];
    if (selectedList.indexOf(record.projectId) >= 0) {
      selectedList.splice(selectedList.indexOf(record.projectId), 1);
    } else {
      selectedList.push(record.projectId);
    }
    setSelectedRowKeys(selectedList);
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
            bordered
            pagination={false}
            dataSource={lDataSource}
            columns={columns}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            onRow={(record) => ({
              onClick: () => onSelectRow(record),
            })}
          />
        </div>

        {/* transfer btn */}
        <div className={css.middle_rea}>
          <Button
            onClick={() => console.log("selectedRowKeys", selectedRowKeys)}
          >
            aaa
          </Button>
        </div>

        {/* right area */}
        <div className={css.right_area}>right area</div>
      </div>
    </Modal>
  );
});

export default TransferTableModal;
