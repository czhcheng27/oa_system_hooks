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
