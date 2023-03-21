import {
  FundProjectionScreenOutlined,
  UserOutlined,
  FileOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  GoldOutlined,
  WindowsOutlined,
  ChromeOutlined,
  MergeCellsOutlined,
  MoreOutlined,
  BlockOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const menuItems = [
  getItem("Home", "/home", <FundProjectionScreenOutlined />),
  getItem("Products", "/products", <AppstoreOutlined />, [
    getItem("Category", "/category", <GoldOutlined />),
    getItem("Product", "/product", <WindowsOutlined />),
  ]),
  getItem("User", "/user", <UserOutlined />),
  getItem("Role", "/role", <FileOutlined />),
  getItem("Components", "/components", <BlockOutlined />, [
    getItem(
      "Comps Library",
      "/comps_library_sortablejs",
      <MergeCellsOutlined />
    ),
  ]),
  getItem("Drag", "/drag", <ChromeOutlined />, [
    getItem(
      "Multi-Lists",
      "/drag_horizontal_multiple",
      <MergeCellsOutlined style={{ transform: "rotate(90deg)" }} />
    ),
    getItem("Single-Column", "/single_vertical_column", <MoreOutlined />),
  ]),
  getItem("ECharts", "/echarts", <PieChartOutlined />, [
    getItem("Indicator1", "/project_indicator", <DesktopOutlined />),
    getItem("Indicator2", "/question_indicator", <ContainerOutlined />),
    getItem("Indicator3", "/line_charts", <LineChartOutlined />),
  ]),
];
