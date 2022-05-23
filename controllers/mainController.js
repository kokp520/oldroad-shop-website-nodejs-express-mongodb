const productMod = require("../model/productMod")
const mod =  require('../model/mod')
const orderMod = require('../model/orderMod')
const checkoutMod = require("../model/checkoutMod")

const NodemailerSend = require('../middleware/nodemailer')



const mainController = {

    GoIndexPage: async (req,res,next)=>{
        try{
           
             const allproducts = await productMod.find({
                 raw:true,
                 nest:true
             })
             var product1 = []
             var product2 = []

             for(i=0,j=allproducts.length-1; i<10 ; i++,j--){
                 product1[i] = allproducts[i]
                 product2[i] = allproducts[j]
             }
            
             return    res.render('index', { product1:product1, product2:product2, USERALL:req.session.all })
            
             
        } catch(err){
            console.log('GoindexERR:'+ err )
        }
       
    },
    GoStore: async (req,res,next)=>{
        try{
         
          const product =  await productMod.find({
                raw:true,
                nest:true
            })

           return res.render('store',{ store1 : product, USERALL:req.session.all})
        } catch(err){
            console.log('GoStoreERR'+err)
            res.redirect('back') 
        }
    },
    GoSignin:(req,res,next)=>{
        try{
         return    res.render('account',{USERALL:req.session.all})
        }catch(err){
            console.log('gosignin err '+err)
           return  res.redirect('back')
        }
    },

    GoRegister:(req,res,next)=>{
        try{
            if(req.session.all){
              return   res.render('register',{USERALL:req.session.all})
            }else{
             return     res.render('register')
            }
        }catch(err){
            console.log('go register error'+ err)
        }
    },

    GoSingleproduct: async (req,res,next)=>{
        try{
            const thisproduct = await productMod.findOne({_id:req.params.id})
            return res.render('singleproduct',{products:thisproduct,USERALL:req.session.all})
        } catch(err){
            console.log('go singleproduct got error'+err)
           return  res.redirect('back')
        }
    },

    GoUserorder:async(req,res,next)=>{
        try{
            const userorder = await checkoutMod.find({ userid:req.session.all._id })
           res.render('userorder',{myorders:userorder, USERALL:req.session.all })
        }catch(err){
            console.log('go user orders '+err)
            res.redirect('back')
        }
    },

    Register: async (req,res,next)=>{
        try{
            const {name , phone, birthday, address, email,password} = req.body;

            var code = Math.random().toString().slice(-6);
            var mail = {
                from: '<oldroad2022@163.com>',
                subject: '接受憑證',
                to:email,
                text: '用'+code+'作為你的驗證碼'
            };
            const CREATEMOD = async function(){
                await mod.create({
                    name:name,
                    phone:phone,
                    birthday:birthday,
                    address:address,
                    email:email,
                    password:password,
                    checkcode:code,
                    checkresult:false,
                })
                await NodemailerSend(mail);
            }
            await mod.findOne({email:email}).then(user=>{
                if(user){
                    return res.render('register',{BackendSameEmail:'此帳號已經註冊過了，請輸入其他信箱'})
                }else{
                CREATEMOD();
                return res.render('register',{VerifyEmail:email})
                }
            })
            
            
            
        } catch(err){
            console.log('register got err' +err)
        }
    },

    CheckCode: async (req,res,next)=>{
      try{
        const inputcode = req.body.InputCheckCode
        const checkemail = req.body.CheckCodeEmail

        const thisuser =  await mod.findOne({email:checkemail})
        
        if(inputcode === thisuser.checkcode){
            await thisuser.updateOne({ checkresult: true})
            return res.render('account')
        } else {
            return res.render('register',{ VerifyEmail: checkemail, checkcodetext: '驗證錯誤'})
        }
        
      } catch (err){
          console.log('check code got '+err)
          return res.render('register')
      }
    },

    Signin: async (req,res,next)=>{
        try{
            
            const {SignInEmail,SignInPassword} = req.body;
            const thisuser = await mod.findOne({email:SignInEmail})
           
            if(thisuser){
                if(thisuser.password === SignInPassword){
                    if(thisuser.checkresult === true){
                        req.session.all  = thisuser
                    res.render('account', { USERALL:req.session.all} )
                    } else{
                        res.render('account',{ signinwrongtext:'信箱未驗證', SignInEmail:SignInEmail })
                    }
                }else{
                    res.render('account',{ signinwrongtext:'密碼錯誤，請再試一次', SignInEmail:SignInEmail })
                }
            } else{
                res.render('account',{ signinwrongtext:'此信箱未註冊' })
            }
        } catch(err){
            console.log('signin got err' +err)
            return res.render('account',{ signinwrongtext:'請聯絡客服' })
        }
    },

    GoCart: async   (req,res,next)=>{
        try{
            const userorder = await orderMod.find({ user: req.session.all._id})
            res.render('cart',{orders:userorder ,USERALL:req.session.all})
        } catch(err) {
            console.log('go cart page got err '+err)
        }
    },

    AddOrder: async (req,res,next)=>{
        try{
            if(req.session.all){
                const {title,price,size,color,quantity,mainimg} = req.body
                await orderMod.create({
                    title:title,
                    price:price,
                    size:size,
                    color:color,
                    quantity:quantity,
                    mainimg:mainimg,
                    user:req.session.all._id
                })
                res.redirect('back')
            }else{
                res.render('account',{signinwrongtext:'請登入帳號'})
            }
        } catch(err){
            console.log('add order got error'+err)
            res.redirect('back')
        }
    },

    Checkout: async (req,res,next)=>{
        try{
            const userorders = await orderMod.find({user:req.session.all._id})
            const {RecipientName,RecipientPhone,RecipientAddress,payment,PS, alltotal} = req.body
            
            await checkoutMod.create({
                userid:req.session.all._id,
                RecipientName:RecipientName,
                RecipientPhone:RecipientPhone,
                RecipientAddress:RecipientAddress,
                payment:payment,
                PS:PS,
                orders:userorders,
                cargo:'未出貨',
                cargodate: Date.now,
                total:alltotal,
            })

            await orderMod.deleteMany({userorders})
            res.redirect('back')
            
        } catch(err){
            console.log('checkout got err:' +err)
        }
    },
//cookies再看一下好像沒清掉
    Signout:(req,res,next)=>{
        try{
            req.session.destroy()
            res.clearCookie()  
            res.redirect('back')
        } catch(err){
            console.log('sign out got error '+ err)
            res.redirect('back')
            
        }
    },

    GoClassStore:async (req,res,next)=>{
        try{
            
            const theclass = await productMod.find({productclass:req.params.class})
            return res.render('store',{store1:theclass,USERALL:req.session.all})
        }catch(err){
            
            console.log('go class store got '+err)
            return res.render('index')
        }
    },

    AccountEdit:async (req,res,next)=>{
        try{
            const {name , phone, birthday, address } = req.body;
            const thisuser = await mod.findOne({_id:req.params.id})
            await thisuser.updateOne({
                name:name,
                phone:phone,
                birthday:birthday,
                address:address,
            })

            const editeduser = await mod.findOne({_id:req.params.id})
            req.session.all = editeduser
            return res.render('account',{USERALL:editeduser})
        }catch(err){
            console.log('account edit got '+err)
            return res.render('account',{USERALL:req.session.all})
        }
    }

    
}

module.exports = mainController