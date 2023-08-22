function Icon(props) {
  const { iconName, customClassName, onIconClick } = props;
  const handleIcon = () => onIconClick?.();
  return <i className={`iconfont ${iconName}`} onClick={handleIcon} />;
}

export default Icon;
