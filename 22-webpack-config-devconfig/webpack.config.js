const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* loader 1、下载  2、使用 配置loader */
/* pugin 1、下载 2、引入 3、使用 */
module.exports = {

    entry: './src/main.js',
    output:{
        filename:'built.js',
        path:path.resolve(__dirname,'build')
    },

    module:{
    },
    plugins:[
        // 功能 创建一个空的html ,自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            template:'./src/index.html',
        })
    ],
    mode:'development',
    // 开发服务器 devServer :自动打包 自动编译 自动刷新浏览器
    // 特点：只会在内存中打包，不会有输出  (webpack 有输出)
    // 启动命令 ：npx webpack-dev-server  
    devServer:{
        static: {
            directory: path.join(__dirname, "build"),
            watch: true
        },
        watchOptions:{
            ignored:/node_modules/
        },
        compress:true,//gzip压缩
        port:3000,
        open:true,
        proxy:{
            // 开发环境 跨域问题
            '/api':{
                target:'http://localhost:5000',
                pathRewrite:{"^/api":''}
            }
        },
        clientLogLevel:'none',//不要启动服务器日志
        quiet:true,//除了一些基本启动意外，其他内容不打印
        overlay:false,//出错了，不要全屏提示

    }
}