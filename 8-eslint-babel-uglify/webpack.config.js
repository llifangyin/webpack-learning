const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
/* loader 1、下载  2、使用 配置loader */
/* pugin 1、下载 2、引入 3、使用 */

/* 设置node环境变量 */
process.env.NODE_ENV = 'development ';
module.exports = {

  entry: './src/main.js',
  output: {
    filename: 'js/built.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader, // 提取css成单独文件
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env'),
                ],
              },
              // ident:'postcss',
              // plugins:()=> [
              //     //帮POSTCSS找package.json中的browserlist的配置
              //     require('postcss-preset-env')()
              // ]
            },
          },

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
        use: [
          // 'style-loader',// 创建style标签 将样式插入
          MiniCssExtractPlugin.loader, // 提取css成单独文件
          'css-loader', // 将css文件整理到js文件中
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env'),
                ],
              },
              // ident:'postcss',
              // plugins:()=> [
              //     //帮POSTCSS找package.json中的browserlist的配置
              //     require('postcss-preset-env')()
              // ]
            },
          },
        ],
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
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
       },
      },
    ],
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
      filename: './css/index.css',
    }),
    new CleanWebpackPlugin(),
    new optimizeCssAssetsWebpackPlugin(),
    new ESLintWebpackPlugin({
      context:path.resolve(__dirname,'src')
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
};
