const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* 设置node环境变量:据欸的那个使用browserlist的哪个环境 */
// process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production';
/* 
  webpack5 
  treeshaking 更好
  .......
*/
module.exports = {
// 单入口
  entry: './src/main.js',
  output: {
    // [name]取entry里对应的名字
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'build'),,

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
