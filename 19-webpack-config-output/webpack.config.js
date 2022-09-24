const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
/* 
  entry:入口
    1.string  单入口
      指定一个js作为入口，打包形成一个chunk，生成一个bundle
    2.array 多入口
      所有的入口文件最终只会形成一个chunk(数组第一个)，输出出去只有一个bundle
      用途：只有在HMR功能中，让html热更新生效~
    3.object 多入口
      有几个文件就生成几个chunk，输出几个bundle

      特殊用法
       entry:{
        main :['./src/main.js','./src/utils/a.js'],
        add:'./src/add.js'
      },

*/

/* 
output:{

}
*/
module.exports = {
  entry:'./src/main.js',
  // entry:['./src/main.js','./src/add.js'],
  // entry:{
  //   // main:'./src/main.js',
  //   main :['./src/main.js','./src/utils/a.js'],
  //   add:'./src/add.js'
  // },
  output:{
    //文件名称/ 指定目录名称
    filename:'js/[name].js',
    //输出文件目录（将来所有资源输出的公共目录）
    path:path.resolve(__dirname,'build'),
    // 所有输出资源的公共路径 --> publicPath/js/xx.js
    // 默认  src="js/main.js 加了之后为 src="/js/main.js"
    publicPath:'/', 
    /* 
    // 非入口文件的chunk名称
    1.import
    2.optimization nodemodule
    */
    chunkFilename:'js/[name]_chunk.js',
    /* 
      library 打的包有定义全局变量
      libraryTarget
        [name] 整个库向外暴漏的变量名
        window全局变量添加到window上 
        commonjs支持模块化语法引入  
        global 添加到node上
    */
    library:'[name]',
    libraryTarget:'window',
  },
  module:{

  },
  plugins:[
    new HtmlWebpackPlugin(),//不写回创建一个
    new CleanWebpackPlugin(),
    
  ],
  mode:'development'
}