const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* loader 1、下载  2、使用 配置loader */
/* pugin 1、下载 2、引入 3、使用 */
module.exports = {

    entry: './src/main.js',
    output:{
        filename:'js/built.js',
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
                test:/\.(png|jpg|gif|tiff)$/,
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
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                exclude:/\.(css|js|html|less|png|jpg|gif)$/,//？前面用多少就要排除多少吗？
                options:{
                    outputPath:'media'
                },
                loader:'file-loader'
            },

        

        ]
    },
    plugins:[
        // 功能 创建一个空的html ,自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            template:'./src/index.html',

        })
    ],
    // mode:'development',
    mode:'production',
    // 开发服务器 devServer :自动打包 自动编译 自动刷新浏览器
    // 特点：只会在内存中打包，不会有输出  (webpack 有输出)
    // 启动命令 ：npx webpack-dev-server  
    devServer:{
        static: {
            directory: path.join(__dirname, "build"),
            watch: true
        },
        compress:true,//gzip压缩
        port:3000,
        open:true,

    }
}