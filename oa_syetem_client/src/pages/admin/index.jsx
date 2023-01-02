import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import memoryUtils from "../../utils/memoryUtils";
import css from "./index.module.css";

const { Content, Footer, Sider } = Layout;

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = memoryUtils.user;
  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <LeftNav collapsed={collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: colorBgContainer }} />
        <Content style={{ margin: "16px" }}>
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
