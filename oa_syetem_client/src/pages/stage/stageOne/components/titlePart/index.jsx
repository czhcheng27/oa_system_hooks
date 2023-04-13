import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import TitleTip from "../../../../../components/TitleTip";
import css from "./index.module.less";

const TitleParts = (props) => {
  return (
    <div>
      <TitleTip>Stage Info</TitleTip>
    </div>
  );
};

export default TitleParts;
