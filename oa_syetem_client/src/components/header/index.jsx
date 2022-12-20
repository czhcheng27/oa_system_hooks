import React from "react";
import { Button, Modal, theme } from "antd";
import { useNavigate } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import InfoIcon from "../../assets/info-circle-fill.png";
import css from "./index.module.css";

const { confirm } = Modal;

const Header = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      className: "logout_modal",
      title: "Do you want to log out？",
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
      <div className={css.head_top}>
        <span>Welcome, {memoryUtils.user.username}</span> &nbsp;&nbsp;
        <Button type="link" style={{ padding: 0 }} onClick={showConfirm}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
