import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Button, Modal, theme } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import memoryUtils from "../../utils/memoryUtils";
import InfoIcon from "../../assets/info-circle-fill.png";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
const { confirm } = Modal;

const Header = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      className: "logout_modal",
      title: "你确定要退出吗？",
      icon: (
        <img
          src={InfoIcon}
          style={{ float: "left", width: "25px", marginRight: "5px" }}
          alt="icon"
        />
      ),
      onOk() {
        storageUtils.removeUser();
        memoryUtils.user = {};
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <div
      style={{ background: colorBgContainer }}
      className={css.header_wrapper}
    >
      {/* left title */}
      <span className={css.header_title}>title</span>

      {/* right part */}
      <div className="head-top">
        <span>Welcome, {memoryUtils.user.username}</span> &nbsp;&nbsp;
        <Button type="link" style={{ padding: 0 }} onClick={showConfirm}>
          退出
        </Button>
      </div>
    </div>
  );
};

export default Header;
