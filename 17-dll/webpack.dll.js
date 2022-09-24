/* 
使用dll技术，对某些库（第三方库 jquery vue react ...）打包
webpack默认找config.js，--> webpack --config dll.js 
*/
const path = require('path');
const webpack = require('webpack');
module.exports={
    entry:{
        jQuery:['jquery'],
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dill'),
        library:'[name]_[hash]',//打包的库里面向外暴漏出去的内容叫什么名字
    },
    plugins:[
        //打包生成一个manifest文件，提供映射关系
        new webpack.DllPlugin({
            name:'[name]_[hash]',//映射库的暴漏的内容名称
            path:path.resolve(__dirname,'dill/manifest.json')
        })
    ],
    mode:'production'
}