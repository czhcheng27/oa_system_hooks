import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import css from "./index.module.css";

const LeftNav = ({ collapsed }) => {
  return (
    <div className={css["left_nav"]}>
      <Link to="/" className={css["left_nav_header"]}>
        <img className="App-logo" src={logo} alt="logo" />
        {!collapsed && <h1>OA System</h1>}
      </Link>
    </div>
  );
};

export default LeftNav;
