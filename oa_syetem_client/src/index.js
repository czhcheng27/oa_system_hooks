import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

// get user from localStorage and save to memory, in case for refresh page
const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(<App />, document.getElementById("root"));
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.Fragment>
//     <App />
//   </React.Fragment>
// );
