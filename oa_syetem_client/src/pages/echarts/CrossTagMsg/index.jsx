// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import { Button } from "antd";
// import { listenMsg, sendMsg } from "./crossTagMsg";
// import css from "./index.module.less";
// import useSyncState from "../../../components/UseSyncState/useSyncState";

// const CrossTagMsg = () => {
//   const [count, setCount] = useSyncState(10);

//   const unlisten = listenMsg((info) => {
//     console.log("info", info, count);
//     const { type, content } = info;
//     if (type === "add-count") {
//       handleAddCount(content);
//     }
//   });

//   const handleAddCount = (val) => {
//     const newVal = count + val;
//     console.log("newVal", newVal);
//     setCount(newVal, (count) => {
//       sendMsg("sendToAddCountPage", count);
//     });
//   };

//   useEffect(() => {
//     listenMsg();
//     return () => {
//       unlisten();
//     };
//   }, []);

//   const openTab = () => {
//     window.open(`cross_tag_msg_addCount?count=${count}`);
//     sendMsg("sendToAddCountPage", count);
//   };

//   return (
//     <div className={css.crossTagMsg}>
//       <div>count: {count}</div>
//       <Button onClick={openTab}>open new tab</Button>
//     </div>
//   );
// };

// export default CrossTagMsg;

import React, { Component } from "react";
import { Button } from "antd";
import { listenMsg, sendMsg } from "./crossTagMsg";
import css from "./index.module.less";

class CrossTagMsg extends Component {
  state = {
    count: 10,
  };

  componentDidMount() {
    this.unlisten = listenMsg((info) => {
      console.log("info", info);
      const { type, content } = info;
      if (type === "add-count") {
        this.handleAddCount(content);
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleAddCount = (content) => {
    const newVal = this.state.count + content;
    console.log("newVal", newVal);
    this.setState({ count: newVal });
    sendMsg("sendToAddCountPage", newVal);
  };

  openTab = () => {
    const { count } = this.state;
    window.open(`cross_tag_msg_addCount?count=${count}`);
    sendMsg("sendToAddCountPage", count);
  };

  render() {
    const { count } = this.state;
    return (
      <div className={css.crossTagMsg}>
        <div>count: {count}</div>
        <Button onClick={this.openTab}>open new tab</Button>
      </div>
    );
  }
}

export default CrossTagMsg;
