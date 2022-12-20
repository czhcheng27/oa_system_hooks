import React, { useState } from "react";
import { Layout, Menu, theme, Breadcrumb } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import memoryUtils from "../../utils/memoryUtils";
import css from "./index.module.less";
import LeftNav from "../../components/left-nav";

const { Header, Content, Footer, Sider } = Layout;

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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <LeftNav collapsed={collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 16, background: "white", height: "100%" }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Develop By Michael Cheng
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
