/* Commonjs规范 */

const path = require('path');
module.exports = {
    entry:'./src/index.js',
    
    output:{
        filename:'built.js',
        path:path.resolve(__dirname,'build')
    },
    
    module:{
        rules:[
            {
                test:/\.css$/,  
                use:[
                    //use数组中 loader执行顺序 从后往前
                    'style-loader',//创建style标签,将js中的样式资源插入添加,添加到header中生效
                    'css-loader' //将css文件变成commonjs模块加载js中,里面是样式字符串
                ]
            },
            {
                test:/\.less$/,
                use:[
                     'style-loader',
                     'css-loader',
                     'less-loader'
                ]
            }
            
        ]
    },

    plugins:[

    ],

    mode:'development'
    // mode:'production',

}