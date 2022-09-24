const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const addAssetHtmlWwebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
/* loader 1、下载  2、使用 配置loader */
/* plugin 1、下载 2、引入 3、使用 */

/* 设置node环境变量:据欸的那个使用browserlist的哪个环境 */
// process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production';

const cmmonCssLoader = [
    MiniCssExtractPlugin.loader, // 提取css成单独文件
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-preset-env'),
          ],
        },
      },
    },
]

module.exports = {

  entry: './src/main.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: path.resolve(__dirname, 'build'),
  },
  // externals:{
  //   jquery:'jQuery',//忽略包名 优化方案 通过cdn引入
  // },
  module: {
    rules: [
      //以下loader只会匹配一个 。
      // 注意，不能有两个配置处理同一个文件,提升构建速度
      // {
      //   oneof:[

      //   ]
      // },
      {
        test: /\.less$/,
        use: [
            ...cmmonCssLoader,
            'less-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|tiff)$/,
        loader: 'url-loader',
        options: {
          // file-loader url-loader
          // 图片小于8kb,转为base64,优点：减少请求数量，减轻服务器压力
          // 缺点：图片体积变大
          limit: 8 * 1024,
          outputPath: 'assets/',
          esModule: false,
          // hash前10 ext原扩展名
          // name:'[hash:10].[ext]'
        },
        type: 'javascript/auto', // webpack5
      },
      {
        // 处理html得img图片
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [  ...cmmonCssLoader  ],
      },
      {
        exclude: /\.(css|js|html|less|png|jpg|gif)$/, // ？前面用多少就要排除多少吗？
        options: {
          outputPath: 'media',
        },
        loader: 'file-loader',
      },
      {
        // js兼容性处理
        //一个文件只能被一个loader处理，
        // 当要被多个loader执行时，指定先后顺序enforce:'pre'
        test: /\.js$/,
        exclude: /node_modules/,
        use:[
            {
              loader:'thread-loader',
              options:{
                workers:2,//进程2个
              }
            },
            //多进程打包，进程启动大概600ms，通信也有时间。只有时间长的包才需要
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory:true,//开启babel缓存，第二次构建，会读取之前的缓存，只打改动的包
                presets:[
                  [
                    '@babel/preset-env',  //只能转换基本语法，不全面 
                    {
                      useBuiltIns:'usage',//按需加载 corejs
                      corejs:{
                        version:3
                      },
                      targets:{
                        //兼容性浏览器版本
                        chrome:'60',
                        firefox:'43'
                      }
                    }
                  ]
                ]
             }
            }
        ],
      },
    ],
  },
  performance:{
    hints:'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
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
    // 提取css less到css文件
    new MiniCssExtractPlugin({
      filename: './css/index.[contenthash:10].css',
    }),
    new CleanWebpackPlugin(),
    new optimizeCssAssetsWebpackPlugin(),
    new ESLintWebpackPlugin({
      context:path.resolve(__dirname,'src')
    }),
    // 告诉webpack哪些库不打包，同时使用的名称也得改
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname,'dill/manifest.json')
    }),
    //将某个文件打包输出出去，并在html中自动引入该资源
    new addAssetHtmlWwebpackPlugin({
      filepath:path.resolve(__dirname,'dill/jQuery.js'),
      publicPath:'./'
    })
  ],
  // mode: 'development',
  mode: 'production',
  // 开发服务器 devServer :自动打包 自动编译 自动刷新浏览器
  // 特点：只会在内存中打包，不会有输出  (webpack 有输出)
  // 启动命令 ：npx webpack-dev-server
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
      watch: true,
    },
    compress: true, // gzip压缩
    port: 3000,
    open: true,

  },
  devtool:'eval-source-map',//开发模式vue默认值  eval-cheap-module-source-map性能再好一点
  // devtool:'source-map',//生产模式 方便调试

  // [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
  // inline-source-map 内联  生产一个source-map
  // hidden-source-map  外部
  // eval-source-map  内联  没一个文件,生产一个source-map，执行速度块
  // nosources-source-map 隐藏源代码
  // cheap- 外部  精确到行
  // cheap-module- 外部
  // 速度 eval > inline > cheap
  // 调试友好 source-map > eval > cheap-module 
};