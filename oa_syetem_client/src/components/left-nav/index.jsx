import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import css from "./index.module.css";
import { menuItems } from "../../pages/config/menuConfig";

const LeftNav = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <div className={css["left_nav"]}>
      <Link to="/" className={css["left_nav_header"]}>
        <img className="App-logo" src={logo} alt="logo" />
        {!collapsed && <h1>OA System</h1>}
      </Link>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={menuItems}
        onClick={(e) => {
          navigate(e.key);
        }}
      />
    </div>
  );
};

export default LeftNav;
