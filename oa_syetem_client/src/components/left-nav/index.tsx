import React from "react";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "src/pages/config/menuConfig";
import logo from "../../assets/logo.png";
import css from "./index.module.css";

interface LeftNavProps {
  collapsed: boolean;
}

const LeftNav: React.FC<LeftNavProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const openKey = menuItems?.find((obj) =>
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
        defaultOpenKeys={[openKey?.key as string]}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={menuItems}
        onClick={(e) => {
          if (e.key === "/chatty") {
            return window.open("https://chat-app-244z.onrender.com/");
          }
          navigate(e.key);
        }}
      />
    </div>
  );
};

export default LeftNav;
