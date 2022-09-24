// import { test2 } from './test'

console.log('main loading');


document.getElementById('id1').onclick = function(){
    // test2(1,1)
    // 懒加载： 文件使用时才加载
    // 预加载：会在使用前，提前加载 其他文件加载完了，等空闲了，在偷偷加载。
    // 正常加载 并行加载（同一时间加载多个文件）
    import(/*webpackChunkName:'test',webpackPrefetch:true*/
    './test').then(res=>{
        res.test2(3,4)
    })
}