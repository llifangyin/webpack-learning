const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* loader 1、下载  2、使用 配置loader */
/* plugin 1、下载 2、引入 3、使用 */

/* 设置node环境变量:据欸的那个使用browserlist的哪个环境 */
// process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production';

module.exports = {
// 单入口
  // entry: './src/main.js',
  // 多入口
  entry:{
      main:'./src/main.js',
      test:'./src/test.js'
  },
  output: {
    // [name]取entry里对应的名字
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization:{
    //1、将node_modules代码单独打成一个chunk
    //2、 自动分析多入口chunk有没有公共的文件，如果有会单独打包一个chunnks
    splitChunks:{
      chunks:'all'
    }
  },
  plugins: [
    // 功能 创建一个空的html ,自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify:{
        collapseWhitespace:true, // 移除空格
        removeComments:true,//移除注释
      }
    }),
    new CleanWebpackPlugin(),
  ],
  mode: 'production',
};
