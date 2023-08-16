import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import FlipThreeD from "./FlipThreeD";
import css from "./index.module.css";

const Role = (props) => {
  return (
    <div style={{ height: "100%" }}>
      Role
      <FlipThreeD />
    </div>
  );
};

export default Role;
