/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { listenMsg, sendMsg } from "./crossTagMsg";

let searchParam = {};

const AddCount = () => {
  const [passNum, setPassNum] = useState(0);
  const handleAdd = () => {
    sendMsg("add-count", 1);
  };

  const unlisten = listenMsg((info) => {
    console.log("AddCount-info", info);
    if (info.type === "sendToAddCountPage") {
      setPassNum(info.content);
    }
  });

  useEffect(() => {
    const searchParamToObj = (url = location.href) =>
      Object.fromEntries(new URL(url).searchParams);
    searchParam = searchParamToObj(window.location.href);
    console.log("searchParam", searchParam);
    setPassNum(searchParam.count * 1);
    listenMsg();
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div>
      <div>
        <Button onClick={handleAdd}>add count</Button>
      </div>
      count from prevPage: {passNum}
    </div>
  );
};

export default AddCount;
