import React, { Component } from "react";
import { Button } from "antd";
import { listenMsg, sendMsg } from "./crossTabMsg";
import { getFullHashUrl } from "../../../utils/url";
import css from "./index.module.less";

class CrossTabMsg extends Component {
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
    const url = getFullHashUrl(`cross_tab_msg_addCount?count=${count}`);
    window.open(url);
    sendMsg("sendToAddCountPage", count);
  };

  render() {
    const { count } = this.state;
    return (
      <div className={css.crossTabMsg}>
        <div>count: {count}</div>
        <Button onClick={this.openTab}>open new tab</Button>
      </div>
    );
  }
}

export default CrossTabMsg;
