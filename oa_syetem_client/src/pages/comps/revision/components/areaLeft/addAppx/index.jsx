import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Form, Input, Radio, Button } from "antd";
import { cloneDeep } from "lodash";
import { updateOutlineAllData } from "../../../../../../redux/actions";
import css from "./index.module.less";

const { Item } = Form;

const AddAppx = ({ children }) => {
  const [appxForm] = Form.useForm();

  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);
  const appxId = outlineAllData.findIndex((el) => el.id === "appendix");

  const [popVisible, setPopVisible] = useState(false);

  const visibleChange = (visible) => {
    visible && appxForm.resetFields();
    visible && setPopVisible(true);
  };

  const handleClick = () => {
    const data = appxForm.getFieldsValue();
    const appxLength = outlineAllData[appxId].children.length;
    if (!appxLength) {
      outlineAllData[appxId].children.push({
        varIndex: `A`,
        id: `A`,
        name: `附录A`,
        coms: [],
        deletable: true,
        data,
      });
    } else {
      const lastSymbol = outlineAllData[appxId].children[appxLength - 1].id;
      const addSybmol = String.fromCharCode(lastSymbol.charCodeAt(0) + 1);
      outlineAllData[appxId].children.push({
        varIndex: `${addSybmol}`,
        id: `${addSybmol}`,
        name: `附录${addSybmol}`,
        coms: [],
        deletable: true,
        data,
      });
    }
    const _temp = cloneDeep(outlineAllData);
    dispatch(updateOutlineAllData(_temp));
    setPopVisible(false);
  };

  const renderContent = () => {
    return (
      <div>
        <Form form={appxForm} autoComplete="off">
          <Item label={"附录作用"} name="intention" initialValue={1}>
            <Radio.Group>
              <Radio value={1}>规范性</Radio>
              <Radio value={2}>资料性</Radio>
            </Radio.Group>
          </Item>
          <Item label={"附录标题"} name="appxTitle">
            <Input placeholder={"请填写附录标题"} />
          </Item>
        </Form>
        <div className={css.btns}>
          <Button onClick={() => setPopVisible(false)}>取消</Button>
          <Button type="primary" onClick={() => handleClick()}>
            提交
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Popover
      content={renderContent()}
      overlayClassName="addAppx_popover"
      placement="right"
      trigger={["click"]}
      onOpenChange={visibleChange}
      open={popVisible}
    >
      <div>{children}</div>
    </Popover>
  );
};

export default AddAppx;
