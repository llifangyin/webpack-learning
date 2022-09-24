const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { default: _default } = require('workbox-webpack-plugin');
 module.exports = {
  entry:'./src/main.js',
  output:{
    //文件名称/ 指定目录名称
    filename:'js/[name].js',
    //输出文件目录（将来所有资源输出的公共目录）
    path:path.resolve(__dirname,'build'),
  },
  module:{
    rules:[
    ]
  },
  resolve:{
    //配置解析路径的别名,缺点，没有提示
    alias:{
      '@':path.resolve(__dirname,'src')
    },
    // 可省略后缀的文件名 :名字一样先取前面的，可能有问题
    extensions:['.js','.json'],
    // 告诉webpack解析模块 去找哪个目录
    modules:[path.resolve(_default,'../../node_modules'),'node_modules'],
  },
  plugins:[
    new HtmlWebpackPlugin(),//不写回创建一个
    new CleanWebpackPlugin(),
    
  ],
  mode:'development'
}