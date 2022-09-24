import { count } from "./a";
const a = '123'
const promise = new Promise((resolve,reject)=>{
    let flag = true
    setTimeout(() => {
        if(flag){
            resolve(true)
        }else{
            reject(false)
        }
    }, 1000);
}).then(res=>{
    console.log(res);
})
console.log(count(1,2),'couter function');
//这是个注释。
console.log(a,promise);
console.log('index.js 被加载了!11');
console.log(333);