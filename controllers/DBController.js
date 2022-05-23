const mod=require('../model/mod'); 
const productMod = require('../model/productMod')
const orderMod = require('../model/orderMod')
const checkoutMod = require('../model/checkoutMod')
 
 
const getmods=(req,res)=>{ 
 
    mod.find() 
    .then(result=>{ 

    res.send(result.length>0?result:'No mods'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
} 
const getorders=(req,res)=>{ 
 
    orderMod.find() 
    .then(result=>{ 

    res.send(result.length>0?result:'No orders'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
} 
const getproducts=(req,res)=>{ 
 
    productMod.find() 
    .then(result=>{ 

    res.send(result.length>0?result:'No products'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
} 
const getcheckouts=(req,res)=>{ 
 
    checkoutMod.find() 
    .then(result=>{ 

    res.send(result.length>0?result:'No checkouts'); 
    }) 
    .catch(err=>{ 
    console.log(err); 
    }) 
} 
module.exports={ 
 getmods , getorders , getproducts , getcheckouts
} 