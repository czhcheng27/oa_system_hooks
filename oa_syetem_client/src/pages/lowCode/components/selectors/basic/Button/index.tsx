import { Button } from "antd";
import { useNode, UserComponent } from "@craftjs/core";

interface ButtonProps {
  text?: string;
}

export const ButtonUserComponent: UserComponent<ButtonProps> = ({ text }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref as any))}>
      <Button>{text}</Button>
    </div>
  );
};
