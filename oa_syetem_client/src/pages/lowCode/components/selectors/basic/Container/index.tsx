import { useNode, UserComponent } from "@craftjs/core";
import React from "react";

const ContainerUserComponent: UserComponent = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return <div ref={(ref) => connect(drag(ref as any))}>{children}</div>;
};

export default ContainerUserComponent;
