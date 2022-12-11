import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.png";
import css from "./index.module.css";

const Login = (props) => {
  return (
    <div className={css.wrapper}>
      {/* header */}
      <header className={css.header}>
        <img src={Logo} alt="logo" />
        <h1>React Project: Office Admin System &amp; Function Examples</h1>
      </header>

      {/* login Form */}
      <div className={css.login_form}>login Form</div>
    </div>
  );
};

export default Login;
