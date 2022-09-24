const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* loader 1、下载  2、使用 配置loader */
/* pugin 1、下载 2、引入 3、使用 */
module.exports = {

    entry: './src/index.js',
    output:{
        filename:'built.js',
        path:path.resolve(__dirname,'build')
    },

    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    // file-loader url-loader
                    //图片小于8kb,转为base64,优点：减少请求数量，减轻服务器压力
                    // 缺点：图片体积变大 
                    limit:8*1024,
                    outputPath: 'assets/',
                    esModule:false,
                    // hash前10 ext原扩展名
                    // name:'[hash:10].[ext]'
                },
                type: 'javascript/auto' //webpack5
            },
            {
                //处理html得img图片
                test:/\.html$/,
                loader:'html-loader'
            }
        

        ]
    },
    plugins:[
        // 功能 创建一个空的html ,自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            template:'./src/index.html',

        })
    ],
    mode:'development'
}