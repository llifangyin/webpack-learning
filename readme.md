> webpack entry.js -o ouput.js --mode=dev/prod

> webpack只能默认打包js文件,不能打包图片,css等

> 打包过程 将es模块化编译成浏览器能识别的模块化 ESmodule => amd umd

> 直接运行webpack加载的配置 webpack.config.js  Commonjs规范


## node包本级目录找不到包会往上级目录去找


devserver的原理，打的包chunk bundle关系 详细配置项

##  mode:development自动加载plugin:
NamedChunksPlugin
NamedModulesPlugin

## mode:production 会自动加载的plugin：
uglifyjsplugi自动压缩js 
noEmitOnErrorsPlugin
siderEffectsFlagPlugin 
flagDependencyplugin flagIncludedChunksPlugin
OccurenceOrderPlugin 
*ModuleConcatenationPlugin



# webpack性能优化

## 开发环境性能优化

* 优化打包构建速度
HMR:hot module replacement 模块热更新
    css style-loader
    js文件：webpack5可以热更新  （webpack4默认不能使用HMR功能,修改js代码）
    html:默认不能使用；解决：entry 将html引入

* 优化代码调试
source-map： 源代码到构建代码映射技术（出错，追踪源代码）
 <!--  devtool:'eval-source-map',//开发模式vue默认值  eval-cheap-module-source-map性能再好一点
  devtool:'source-map',//生产模式 方便调试 -->

## 生产环境性能优化

* 优化打包构建速度
    ## oneof:[] <!-- loader只会匹配一个 -->

    ## 缓存处理 
      * babel缓存： cacheDirectory:true,//开启babel缓存，第二次构建，会读取之前的缓存，只打改动的包

* 优化运行时的性能
    ## 缓存
    * 哈希值 : 文件资源缓存
    * hash: .[hash:num].js  改动一个其他都会变
    * chunkhash:根据chunk生产的hash值，如果来源于同一个chunk，hash值就一样
                因为css是js引入的，所以同属于一个chunk
    * contenthash: 根据文件的内容生产hash值，不同文件值不一样

    ## tree shaking 去除无用代码
        前提： 1、使用es模块化 ESmodule 2、开启production环境，默认开启
        作用：减少代码体积
        package.json sideEffects:false,// 所有代码都可以进行treeshaking  导致css @babel/polyfill的没了
        设置sideEffects:["*.css"] 则不限制，免除tree-shaking 比如import的样式带啊吗
        "sideEffects":["*.css",".less"], 可能版本问题导致打包减少

    ## code split  optimization：splitChunks：{chunks:'all'}
    * 1、 将node_modules代码单独打成一个chunk
    * 2、 自动分析多入口chunk有没有公共的文件，如果有会单独打包一个chunnks
    * 3、 通过js代码，将某个文件单独打包成一个chunk  import(xxx).then()

    ## 懒加载
        import(xxx)
        **预加载**：webpackPrefetch:true    
         import(/*webpackChunkName:'test',webpackPrefetch:true*/ './test').then()
    })


    ## PWA:渐进式网络开发应用程序（离线可访问） Progressing Web App
        workbox --> workbox-webpack-plugin 
        功能强大（消息提醒和信息推送、cache cachestorage）

    ## 'thread-loader',
      多进程打包，进程启动大概600ms，通信也有时间。只有时间长体积比较大的包才适合

    ## externals  声明不打包的文件，通过cdn链接引入

    ## dll dynamic link library 同上的思想，不同的思路
    * DllPlugin  单独打包库配置项，生成映射关系的manifest.json
    * DllReferencePlugin  告诉webpack哪些库不打包，同时使用的名称也得改
    * addAssetHtmlWwebpackPlugin  将某个文件打包输出出去，并在html中自动引入该资源


