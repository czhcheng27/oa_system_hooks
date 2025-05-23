import React, { useState, useEffect, useRef } from "react";
import { Button, Popover, Form, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { reqLogin } from "src/api";
import memoryUtils from "../../utils/memoryUtils";
import Logo from "../../assets/logo.png";
import css from "./index.module.css";
import storageUtils from "../../utils/storageUtils";

const { Item } = Form;

const Login = (props) => {
  const navigate = useNavigate();

  const validatePwd = (_, value) => {
    if (value.length < 4 || value.length > 12) {
      return Promise.reject("Password length must be 4~12 digits");
    }
    const reg = /^[a-zA-Z0-9_]+$/;
    const flag = reg.test(value);
    if (!flag) {
      return Promise.reject("Password should be letters,numbers or underscore");
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    const { username, password } = values;
    const { status, data } = await reqLogin(username, password);
    if (status === 0) {
      message.success("login successfully");
      //save user
      memoryUtils.user = data;
      storageUtils.saveUser(data); //save to localStorage
      navigate("/", { replace: true });
    } else {
      message.error("username or password not correct");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const content = (
    <div>
      <p>Username: admin</p>
      <p>Password: admin</p>
    </div>
  );

  useEffect(() => {
    const user = memoryUtils.user;
    if (user && user._id) {
      return navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className={css.wrapper}>
      {/* header */}
      <header className={css.header}>
        <img src={Logo} alt="logo" />
        <h1>React Project: Office Admin System &amp; Function Examples</h1>
      </header>

      {/* login Form */}
      <div className={css.login_form}>
        <header>User Login</header>
        <div className={css.form}>
          <Form
            name="loginForm"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input your username!",
                },
                { min: 4, message: "Username should at least 4 digits" },
                { max: 12, message: "Username can not longer than 12 digits" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "Username should be letters,numbers or underscore",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Item>

            <Item name="password" rules={[{ validator: validatePwd }]}>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Item>

            <Item>
              <Space size={"large"}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Popover
                  placement="right"
                  title={"Default Value"}
                  content={content}
                  trigger="hover"
                >
                  <Button>Hint Info</Button>
                </Popover>
              </Space>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
