
import './utils/index';

import('./add').then(({default:add})=>{
    console.log(add(1,3));
})