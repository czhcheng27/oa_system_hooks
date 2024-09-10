import React, { useState } from "react";
import { RedoOutlined, UndoOutlined } from "@ant-design/icons";
import { useEditor } from "@craftjs/core";
import { Button, Col, Input, message, Modal, Row, Switch } from "antd";
import lz from "lzutf8";

export const Topbar = () => {
  const { actions, query, enabled, canUndo, canRedo } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: state.options.enabled && query.history.canUndo(),
      canRedo: state.options.enabled && query.history.canRedo(),
    })
  );

  const { TextArea } = Input;
  const [modalVisible, setModalVisible] = useState(false);
  const [stateToLoad, setStateToLoad] = useState("");

  const showMessage = (content: any) => {
    message.info(content);
  };

  return (
    <div style={{ background: "#fff" }}>
      <Row align="middle">
        <Col flex="auto">
          <Switch
            checked={enabled}
            onChange={(value) =>
              actions.setOptions((options) => (options.enabled = value))
            }
            checkedChildren="启用"
            unCheckedChildren="禁用"
          />
          <Button
            size="small"
            icon={<UndoOutlined />}
            style={{ marginLeft: "10px" }}
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
          >
            撤销
          </Button>
          <Button
            icon={<RedoOutlined />}
            size="small"
            style={{ marginRight: "10px" }}
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
          >
            重做
          </Button>
        </Col>
        <Col>
          <Button
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => {
              const json = query.serialize();
              console.log(json);
              console.log("-------------------------");
              console.log(lz.encodeBase64(lz.compress(json)));
            }}
          >
            保存
          </Button>
          <Button size="small" onClick={() => setModalVisible(true)}>
            加载
          </Button>
          <Modal
            title="加载状态"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={() => {
              setModalVisible(false);
              const json = lz.decompress(lz.decodeBase64(stateToLoad));
              actions.deserialize(json);
              showMessage("状态已加载");
            }}
          >
            <TextArea
              rows={4}
              placeholder='粘贴从"复制当前状态"按钮复制的内容'
              value={stateToLoad}
              onChange={(e) => setStateToLoad(e.target.value)}
            />
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default Topbar;
