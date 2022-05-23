const auth  = function(req,res,next){
    try{
        if(req.session.all){
            console.log('認證成功')
            next()
            return
        } else{
            res.render('account',{signinwrongtext:'請登入帳號'})
        }
    } catch(err){
        console.log('認證失敗')
        res.redirect('account')
    }
}

module.exports = auth 