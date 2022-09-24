const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
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
      // loader的配置
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        include:path.resolve(__dirname,'src'),
        enforce:'pre',//优先执行 post延后执行 默认之间执行
        loader:'eslint-loader',
        options:{},//配置项
      },
      {
        //以下配置只会生效一个
        oneOf:[

        ],
      }

    ]
  },
  plugins:[
    new HtmlWebpackPlugin(),//不写回创建一个
    new CleanWebpackPlugin(),
    
  ],
  mode:'development'
}