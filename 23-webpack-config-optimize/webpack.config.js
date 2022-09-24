const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
/* loader 1、下载  2、使用 配置loader */
/* plugin 1、下载 2、引入 3、使用 */

/* 设置node环境变量:据欸的那个使用browserlist的哪个环境 */
// process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production';

module.exports = {
// 单入口
  entry: './src/main.js',
  // 多入口
  // entry:{
  //     main:'./src/main.js',
  //     test:'./src/test.js'
  // },
  output: {
    // [name]取entry里对应的名字
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'build'),,

  },
  optimization:{
    //1、将node_modules代码单独打成一个chunk
    //2、 自动分析多入口chunk有没有公共的文件，如果有会单独打包一个chunnks
    splitChunks:{
      chunks:'all',
      // 以下是默认值：

      miniSize:30*1024,//分割的chunk最小为30kb
      maxSize:0,//最大没有限制
      minChunks:1,//要提取的chunks最少被引用1次
      maxAsyncRequest:5,//按需加载时并行加载的文件的最大数量，超过不打包
      maxInitialRequest:3,//入口js文件最大并行数量
      automaticNameDelimiter:'~',//名称连接符
      name:true,//使用name命名规则
      cacheGroups:{//node_modules 文件会被打包到venders chunk中
        // venders~hash.js 会满足上面规则
        venders:{
          test:/ [\\/]node_modules[\\/] /,
          priority:-10,//优先级
        },
        default:{
          minChunks:2,//要提取的chunk最少引用2次
          priority:-20,
          //如果当前要打包的模块，和之 例如前已经被提取的模块是同一个，就会复用，而不是重新打包
          // 两个包都印了一个包， 上一个包打过了，下一个就不打了
          reuseExistingChunk:true,
        }
      }
    },
    runtimeChunk:{
    // 情景：使用splitechunk，打成俩包；同时使用import().then(xxx) webpackchunkname ，也达成俩包
    //作用：将当前模块的记录其他模块的hash单独打包成一个runtime-mian.js   
    // 解决：修改a文件 导致的b文件hash值变动。
      name:entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer:[
      // 配置生产环境的压缩方案 css js
      // terser 替代 uglyjs（不维护了)
      new TerserWebpackPlugin({
        cache:true,//开启缓存
        parallel:true,//开启多进程打包
        sourceMap:true,//启用source-map
      })
    ]
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
