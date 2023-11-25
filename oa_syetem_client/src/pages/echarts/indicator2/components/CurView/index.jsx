import React, { useEffect, useState } from "react";
import css from "./index.module.less";
import { getMonthArray, getNowFormatDate } from "../../utils";

const CurView = () => {
  const monthArray = getMonthArray();
  console.log("monthArray", monthArray);
  return <div>CurView</div>;
};

export default CurView;
