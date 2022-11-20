const CracoLessPlugin = require("craco-less");

module.exports = {
  //按需引入
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          //可以设置为true即是less,注意！！！！此时不需要加引号
          //也可以设置为css,css需要加引号
          style: true,
        },
      ],
    ],
  },
  //自定义主题
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
        lessLoaderOptions: {
          lessOptions: {
            //颜色即为自定义颜色
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
