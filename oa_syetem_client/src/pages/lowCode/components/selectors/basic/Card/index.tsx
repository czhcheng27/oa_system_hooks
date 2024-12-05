// import React, { useState, useRef, useEffect } from "react";
// import classNames from "classnames";
// import { Card, Tag, Checkbox } from "antd";
// import { useEditor, useNode } from "@craftjs/core";
// import { UserOutlined } from "@ant-design/icons";
// import { CardSettings } from "./CardSetting";
// import { priorityOpts } from "./const";
// import { CardProps } from "../type";
// import css from "./index.module.less";

// const defaultProps: CardProps = {
//   text: "Card",
//   title: "Test",
//   description: "descriptiondescriptiondescriptiondescriptiondescription",
//   priority: "high",
//   checked: false,
//   owner: "Michael",
// };

// const CardUserComponent = (props: Partial<CardProps>) => {
//   const resProps = { ...defaultProps, ...props };
//   const { title, description, priority, checked, owner } = resProps;

//   const {
//     connectors: { connect, drag },
//     selected,
//     actions: { setProp },
//   } = useNode((node) => ({
//     selected: node.events.selected,
//   }));

//   const { enabled } = useEditor((state) => ({
//     enabled: state.options.enabled,
//   }));

//   const [editable, setEditable] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target as Node)
//       ) {
//         setEditable(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const { label, color } =
//     priorityOpts.find((el) => el.value === priority) || {};

//   const getCardTitle = () => {
//     return (
//       <div className={css.title_box}>
//         <div className={css.left}>
//           <div
//             className={css.title}
//             style={{
//               textDecoration: checked ? "line-through" : "none",
//             }}
//           >
//             {title}
//           </div>
//           <div>
//             <Tag color={color}>{label}</Tag>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       ref={(ref) => connect(drag(ref as any))}
//       style={{ position: "relative" }}
//       className={classNames({
//         [css.moduleBox]: true,
//         [css.moduleBox_selected]: selected,
//       })}
//     >
//       <div ref={wrapperRef}>
//         <Card title={getCardTitle()}>
//           <div className={css.desc}>{description}</div>

//           <div className={css.last}>
//             <Checkbox
//               checked={checked}
//               onChange={(e) => {
//                 setProp((props) => (props.checked = e.target.checked));
//               }}
//             >
//               <span>Done</span>
//             </Checkbox>
//             <div className={css.fir}>
//               <div>
//                 <UserOutlined />
//                 <span>{owner}</span>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CardUserComponent;

// CardUserComponent.craft = {
//   props: defaultProps,
//   related: {
//     settings: CardSettings,
//   },
// };
