import React, { useState, useEffect, useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Logo from "../../assets/logo.png";
import css from "./index.module.css";

const { Item } = Form;

const Login = (props) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
            name="basic"
            {...layout}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Item>

            <Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Item>

            <Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
