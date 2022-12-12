import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Navigate, Outlet } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import css from "./index.module.less";

const Admin = (props) => {
  const user = memoryUtils.user;
  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return <div>Welcome {user.username}</div>;
};

export default Admin;
