import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

const menuList = [
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
    icon: <MailOutlined />,
    children: [
      {
        title: "品类管理",
        key: "/category",
        icon: <MailOutlined />,
      },

      {
        title: "商品管理",
        key: "/product",
        icon: <MailOutlined />,
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

export default menuList;
