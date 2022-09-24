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
//这是个注释。
console.log(a,promise);