const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* loader 1、下载  2、使用 配置loader */
/* pugin 1、下载 2、引入 3、使用 */
module.exports = {

    entry: './index.js',
    output:{
        filename:'built.js',
        path:path.resolve(__dirname,'build')
    },

    module:{
        rules:[

        ]
    },
    plugins:[
        // 功能 创建一个空的html ,自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            template:'./index.html',

        })
    ],
    mode:'development'
}