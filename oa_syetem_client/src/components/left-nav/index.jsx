import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";
import css from "./index.module.css";
import menuList from "../../pages/config/menuConfig";

const { SubMenu } = Menu;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const LeftNav = ({ collapsed }) => {
  const getMenu = (menuList) => {
    return menuList.map((obj) => {
      console.log("asd", obj);
      if (!obj.children) {
        return (
          <Menu.Item key={obj.key} icon={obj.icon}>
            <Link to={obj.key}>{obj.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={obj.key} icon={obj.icon} title={obj.title}>
            {getMenu(obj.children)}
          </SubMenu>
        );
      }
    });
  };

  useEffect(() => {
    getMenu(menuList);
  }, []);
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
        // items={items}
        // items={getMenu(menuList)}
      >
        {getMenu(menuList)}
      </Menu>
    </div>
  );
};

export default LeftNav;
