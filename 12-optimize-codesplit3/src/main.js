// import $ from 'jquery'
// import { test2 } from './test'

// 通过js代码，将某个文件单独打包成一个chunk
import(/*webpackChunkName:'test'*/'./test').then(({test2})=>{
    // 文件加载成功 
    test2(1,2)
}).catch((e)=>{
    console.log(e);
})
console.log(1);
function testadd(a,b){
    return a-b
}
testadd(1,2)
// console.log($);

// test2(1,1)