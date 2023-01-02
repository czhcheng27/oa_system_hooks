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
} from "@ant-design/icons";

export const menuList = [
  {
    title: "首页",
    key: "/home",
    icon: <PieChartOutlined />,
    isPublic: true,
    disabled: true,
  },

  {
    title: "商品",
    key: "/products",
    icon: <GoldOutlined />,
    children: [
      {
        title: "品类管理",
        key: "/category",
        icon: <GoldOutlined />,
      },

      {
        title: "商品管理",
        key: "/product",
        icon: <GoldOutlined />,
      },
    ],
  },

  {
    title: "用户管理",
    key: "/user",
    icon: <DesktopOutlined />,
  },

  {
    title: "角色管理",
    key: "/role",
    icon: <ContainerOutlined />,
  },

  // {
  //     title: '图表管理',
  //     key: '/charts',
  //     icon: <AppstoreOutlined />,
  //     children: [
  //         {
  //             title: 'Bar Chart',
  //             key: '/charts/bar',
  //             icon: <AppstoreOutlined />
  //         },
  //         {
  //             title: 'Line Chart',
  //             key: '/charts/line',
  //             icon: <AppstoreOutlined />
  //         },
  //         {
  //             title: 'Pie Chart',
  //             key: '/charts/pie',
  //             icon: <AppstoreOutlined />
  //         },
  //     ]
  // },
];

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
  getItem("Drag", "/drag", <ChromeOutlined />, [
    getItem(
      "Multi-Lists",
      "/drag_horizontal_multiple",
      <MergeCellsOutlined style={{ transform: "rotate(90deg)" }} />
    ),
    getItem("Single-Column", "/single_vertical_column", <MoreOutlined />),
  ]),
  // getItem("Drag", "/drag_horizontal_multiple", <ChromeOutlined />),
];
