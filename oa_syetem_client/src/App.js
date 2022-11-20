import React from "react";
import { ConfigProvider, Button, Radio, Checkbox } from "antd";
import { theme, theme2 } from "./themeConfig";

const App = (props) => {
  return (
    <ConfigProvider theme={theme}>
      app...
      <ConfigProvider theme={theme2}>
        <Button type="primary">asd</Button>
      </ConfigProvider>
      <Radio>Radio</Radio>
      <Checkbox>Checkbox</Checkbox>
    </ConfigProvider>
  );
};

export default App;
