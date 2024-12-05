// import React from "react";
// import { Button, Col, Form, Row, Tag, Typography } from "antd";
// import { useEditor } from "@craftjs/core";

// const SettingsPanel = () => {
//   const { actions, selected } = useEditor((state, query) => {
//     const currentNodeId = Array.from(state.events.selected)[0];
//     let selected:
//       | {
//           id: string;
//           name: string;
//           settings: React.ElementType<any>;
//           isDeletable: boolean;
//           props: Record<string, any>;
//         }
//       | undefined;

//     if (currentNodeId) {
//       selected = {
//         id: currentNodeId,
//         name: state.nodes[currentNodeId].data.name,
//         settings:
//           state.nodes[currentNodeId].related &&
//           state.nodes[currentNodeId].related.settings,
//         isDeletable: query.node(currentNodeId).isDeletable(),
//         props: state.nodes[currentNodeId].data.props,
//       };
//     }

//     return {
//       selected,
//     };
//   });

//   const [form] = Form.useForm();

//   console.log(`selected`, selected, form.getFieldsValue());

//   return selected ? (
//     <div
//       style={{
//         backgroundColor: "rgba(0, 0, 0, 0.06)",
//         marginTop: 0,
//         padding: 16,
//         width: "100%",
//       }}
//     >
//       <Form form={form} layout="vertical">
//         <Row gutter={[0, 16]}>
//           <Col span={24}>
//             <div style={{ paddingBottom: 16 }}>
//               <Row align="middle">
//                 <Col>
//                   <Typography.Text>Selected</Typography.Text>
//                 </Col>
//               </Row>
//               <Row align="middle">
//                 <Col>
//                   <Tag color="blue">{selected.name}</Tag>
//                 </Col>
//               </Row>
//             </div>
//           </Col>

//           <Col span={24}>
//             {selected.settings && React.createElement(selected.settings)}
//           </Col>

//           {selected.isDeletable && (
//             <Col span={24}>
//               <Button
//                 type="primary"
//                 danger
//                 onClick={() => {
//                   actions.delete(selected.id);
//                 }}
//                 style={{ width: "100%" }}
//               >
//                 Delete
//               </Button>
//             </Col>
//           )}
//         </Row>
//       </Form>
//     </div>
//   ) : null;
// };

// export default SettingsPanel;
