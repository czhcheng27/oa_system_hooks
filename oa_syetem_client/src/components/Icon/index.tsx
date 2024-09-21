import React from "react";

interface IconProps {
  iconName: string;
  customClassName?: string;
  onIconClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  iconName,
  customClassName,
  onIconClick,
}) => {
  const handleIcon = () => onIconClick?.();
  return <i className={`iconfont ${iconName}`} onClick={handleIcon} />;
};

export default Icon;
