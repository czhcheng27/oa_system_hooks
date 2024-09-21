import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header/index";
import memoryUtils from "../../utils/memoryUtils";
import css from "./index.module.less";

const MOBILE_WIDTH = 992;
const { Content, Footer, Sider } = Layout;

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const resizeHandler = () => {
    const rect = document.body.getBoundingClientRect();
    const value = rect.width - 1 < MOBILE_WIDTH;
    setCollapsed(value);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler, false);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const user = memoryUtils.user;
  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout style={{ height: "100%" }}>
      {/* <Layout style={{ height: "100vh" }}> */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <LeftNav collapsed={collapsed} />
      </Sider>
      <Layout style={{ height: "100%" }}>
        <Header style={{ background: "white" }} />
        <Content className={css.content}>
          <div className={css.content_wrapper}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", padding: "0px 50px 16px 50px" }}>
          Develop By Michael Cheng
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
