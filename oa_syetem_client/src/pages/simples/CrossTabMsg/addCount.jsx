/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { listenMsg, sendMsg } from "./crossTabMsg";

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

  const getQueryFromHash = () => {
    const hash = window.location.hash || "";
    const queryIndex = hash.indexOf("?");
    if (queryIndex === -1) return {};
    const queryStr = hash.slice(queryIndex + 1);
    return Object.fromEntries(new URLSearchParams(queryStr));
  };

  useEffect(() => {
    const searchParam = getQueryFromHash();
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
