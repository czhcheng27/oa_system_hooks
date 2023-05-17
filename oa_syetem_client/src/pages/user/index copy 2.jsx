import React, { Component, createContext, PureComponent } from "react";
import { memo } from "react";

const MyContext = createContext();
export default class User extends Component {
  state = {
    username: "aaaa",
    age: 11,
  };
  render() {
    const { username, age } = this.state;
    return (
      <div>
        <div>{username}</div>
        {/* <MyContext.Provider value={{ username, age }}>
          <button onClick={() => this.setState({ username: "555555" })}>
            changeName
          </button>
          <A />
        </MyContext.Provider> */}
        <A />
        {/* <FuncA /> */}
        <button onClick={() => this.setState({ username: "555555" })}>
          changeName
        </button>
      </div>
    );
  }
}

class A extends PureComponent {
  componentDidMount() {
    console.log("A");
  }
  render() {
    console.log("render");
    return (
      <div>
        {console.log("AAAAA")}
        AAAA
        {/* <B /> */}
      </div>
    );
  }
}

class B extends Component {
  static contextType = MyContext;
  componentDidMount() {
    console.log("B");
  }
  render() {
    return (
      <div>
        {console.log("BBBB")}
        BBB
        <div>{this.context.age}</div>
      </div>
    );
  }
}

const FuncA = memo(() => {
  console.log("FuncA");
  return <div>FuncA{console.log("FuncAFuncAFuncA")}</div>;
});
