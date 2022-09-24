import './css/index.less';


import './utils/index'
// import '@babel/polyfill' //es6句法兼容
// 问题：把所有兼容性代码全部引入，体积太大

// 注册 ServiceWorker
if('serviceworker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceworker.register('/service-work.js')
        .then(res=>{
            console.log(res,'注册成功');
        })
        .catch(e=>{
            console.log(e,'注册失败');
        })
    })
}