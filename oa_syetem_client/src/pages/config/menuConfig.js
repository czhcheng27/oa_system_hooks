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
  FlagOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  PicLeftOutlined,
  AreaChartOutlined,
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
    getItem("DND-dragDrop", "/DND_dragDrop", <MergeCellsOutlined />),
  ]),
  getItem("Func", "/echarts", <PieChartOutlined />, [
    getItem("Indicator1", "/project_indicator", <DesktopOutlined />),
    getItem("Indicator2", "/question_indicator", <ContainerOutlined />),
    getItem("Indicator3", "/line_charts", <LineChartOutlined />),
    getItem("Indicator4", "/lazy_img", <LineChartOutlined />),
    getItem("Clipboard", "/clipboard", <LineChartOutlined />),
    getItem("CssAdsorb", "/css_adsorb", <LineChartOutlined />),
  ]),
  getItem("Approval", "/approval", <ContainerOutlined />, [
    getItem("APR & Details", "/apr_det_one", <FlagOutlined />),
  ]),
  getItem("Stage", "/stage", <HeatMapOutlined />, [
    getItem("Stage Display", "/stage_display", <ApartmentOutlined />),
    getItem("TodoList", "/todo_list", <PicLeftOutlined />),
  ]),
  getItem("BigScreen", "/big_screen", <AreaChartOutlined />, [
    getItem("BigScreen1", "/big_screen_1", <AreaChartOutlined />),
    getItem("BigScreen2", "/big_screen_2", <AreaChartOutlined />),
  ]),
];
