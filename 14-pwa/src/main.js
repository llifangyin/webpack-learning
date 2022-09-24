import './css/index.less';


import './utils/index'
// import '@babel/polyfill' //es6句法兼容
// 问题：把所有兼容性代码全部引入，体积太大

// 1、注册 ServiceWorker
// 2、sw必须运行在服务器上 serve -s build
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/service-worker.js')
        .then(res=>{
            console.log(res,'注册成功');
        })
        .catch(e=>{
            console.log(e,'注册失败');
        })
    })
}