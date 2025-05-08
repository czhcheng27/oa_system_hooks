import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Form, Input, Radio, Button } from "antd";
import { cloneDeep } from "@/utils";
import { updateOutlineAllData } from "@/redux/actions";
import { RevisionContext } from "../../..";
import css from "./index.module.less";

const { Item } = Form;

const AddAppx = ({ children, selectData, receiveData, action }) => {
  const [appxForm] = Form.useForm();

  const dispatch = useDispatch();

  const { forceUpdate } = useContext(RevisionContext);

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);
  const appxId = outlineAllData.findIndex((el) => el.id === "appendix");

  const [popVisible, setPopVisible] = useState(false);

  useEffect(() => {
    appxForm.setFieldsValue(receiveData);
  }, [receiveData]);

  const visibleChange = (visible) => {
    setPopVisible(visible);
    if (visible) {
      action !== "edit" && appxForm.resetFields();
    }
  };

  const addAppx = () => {
    const data = appxForm.getFieldsValue();
    const appxLength = outlineAllData[appxId].children.length;
    if (!appxLength) {
      outlineAllData[appxId].children.push({
        varIndex: `A`,
        id: `A`,
        name: `Appendix A`,
        coms: [],
        deletable: true,
        data,
      });
    } else {
      const lastSymbol = outlineAllData[appxId].children[appxLength - 1].id;
      const addSybmol = String.fromCharCode(lastSymbol.charCodeAt(0) + 1);
      const lastVarIdx =
        outlineAllData[appxId].children[appxLength - 1].varIndex;
      const addVarIdx = String.fromCharCode(lastVarIdx.charCodeAt(0) + 1);
      outlineAllData[appxId].children.push({
        varIndex: `${addVarIdx}`,
        id: `${addSybmol}`,
        name: `Appendix ${addVarIdx}`,
        coms: [],
        deletable: true,
        data,
      });
    }
    const _temp = cloneDeep(outlineAllData);
    dispatch(updateOutlineAllData(_temp));
    setPopVisible(false);
  };

  const editAppx = () => {
    selectData.data = appxForm.getFieldsValue();
    setPopVisible(false);
    forceUpdate();
  };

  const handleClick = () => {
    action === "edit" ? editAppx() : addAppx();
  };

  const renderContent = () => {
    return (
      <div>
        <Form form={appxForm} autoComplete="off">
          <Item label={"Type"} name="intention" initialValue={1}>
            <Radio.Group>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </Radio.Group>
          </Item>
          <Item label={"Title"} name="appxTitle">
            <Input placeholder={"Please type in title"} />
          </Item>
        </Form>
        <div className={css.btns}>
          <Button onClick={() => setPopVisible(false)}>Cancel</Button>
          <Button type="primary" onClick={() => handleClick()}>
            Submit
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
