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

interface GetItemParams {
  key: string;
  label: string;
  icon: any;
  children?: GetItemParams[];
}

function getItem(
  label: string,
  key: string,
  icon: any,
  children?: GetItemParams[]
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const menuItems = [
  // getItem("Products", "/products", <AppstoreOutlined />, [
  //   getItem("Category", "/category", <GoldOutlined />),
  //   getItem("Product", "/product", <WindowsOutlined />),
  // ]),
  // getItem("User", "/user", <UserOutlined />),
  // getItem("BigScreen", "/big_screen", <AreaChartOutlined />, [
  //   getItem("BigScreen1", "/big_screen_1", <AreaChartOutlined />),
  //   getItem("BigScreen2", "/big_screen_2", <AreaChartOutlined />),
  // ]),
  getItem("Dashboard", "/dahsboard", <AreaChartOutlined />),
  getItem("Home", "/home", <FundProjectionScreenOutlined />),
  getItem("AI Chat", "/ai_chat", <FundProjectionScreenOutlined />),
  getItem("Online Editor", "/online_editor", <MergeCellsOutlined />),
  getItem("Low Code", "/low_code", <WindowsOutlined />),
  getItem("Simples", "/simples", <PieChartOutlined />, [
    // getItem("Indicator", "/question_indicator", <ContainerOutlined />),
    getItem("VehicleRotation", "/vehicle_rotate", <LineChartOutlined />),
    getItem("SwitchTheme", "/switch_theme", <LineChartOutlined />),
    getItem("Clipboard", "/clipboard", <LineChartOutlined />),
    getItem("CssAdsorb", "/css_adsorb", <LineChartOutlined />),
    getItem("CrossTagMsg", "/cross_tag_msg", <LineChartOutlined />),
    getItem("AnimationDelay", "/animation_delay", <LineChartOutlined />),
    getItem(
      "ElectronicSignature",
      "/electronic_signature",
      <LineChartOutlined />
    ),
    getItem("SvgAnm", "/svg_animation", <LineChartOutlined />),
    getItem("LazyImg", "/lazy_img", <LineChartOutlined />),
    // getItem("Echarts", "/echarts_simples", <DesktopOutlined />),
  ]),
  getItem("Small Funcs", "/small_funcs", <FileOutlined />),
  // getItem("Components", "/components", <BlockOutlined />, [
  // getItem(
  //   "Comps Library",
  //   "/comps_library_sortablejs",
  //   <MergeCellsOutlined />
  // ),
  // getItem(
  //   "Comps Library",
  //   "/comps_library_sortablejs2",
  //   <MergeCellsOutlined />
  // ),
  // ]),
  getItem("Drag", "/drag", <ChromeOutlined />, [
    getItem(
      "Multi-Lists",
      "/drag_horizontal_multiple",
      <MergeCellsOutlined style={{ transform: "rotate(90deg)" }} />
    ),
    getItem("Single-Column", "/single_vertical_column", <MoreOutlined />),
    getItem("DND-dragDrop", "/DND_dragDrop", <MergeCellsOutlined />),
    // getItem("Attribute-dragDrop", "/attribute_dragDrop", <MoreOutlined />),
    // getItem("React-Sortable", "/react_sortable", <MoreOutlined />),
  ]),

  // getItem("Approval", "/approval", <ContainerOutlined />, [
  //   getItem("APR & Details", "/apr_det_one", <FlagOutlined />),
  // ]),
  // getItem("Stage", "/stage", <HeatMapOutlined />, [
  //   getItem("Stage Display", "/stage_display", <ApartmentOutlined />),
  //   getItem("TodoList", "/todo_list", <PicLeftOutlined />),
  // ]),
];
