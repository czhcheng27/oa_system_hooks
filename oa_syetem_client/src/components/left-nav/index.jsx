import React from "react";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import css from "./index.module.css";
import { menuItems } from "../../pages/config/menuConfig";

const LeftNav = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { key: openKey } = menuItems.find((obj) =>
    obj.children?.find((cItem) => cItem.key === location.pathname)
  );

  return (
    <div className={css["left_nav"]}>
      <Link to="/" className={css["left_nav_header"]}>
        <img className="App-logo" src={logo} alt="logo" />
        {!collapsed && <h1>OA System</h1>}
      </Link>
      <Menu
        theme="dark"
        defaultOpenKeys={[openKey]}
        selectedKeys={[location.pathname]}
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
