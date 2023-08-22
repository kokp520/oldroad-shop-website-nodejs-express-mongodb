const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = 'fa00d2dae1b933b'
const uploadImg = path => {
  return new Promise((resolve, reject) => {
    imgur.upload(path, (err, img) => {
      if (err) {
        return reject(err)
      }
      return resolve(img)
    })
  })
}

const productMod = require("../model/productMod")
const mod = require('../model/mod')
const orderMod = require('../model/orderMod')
const checkoutMod = require("../model/checkoutMod")

const adminController = {

  GoSigninAdmin: (req, res, next) => {
    try {
      if (req.session.all) {
        if (req.session.all.permission === 'admin') {
          next()
          return
        } else {
          res.render('admin', { adminWrongText: '您目前的帳號無此權限' })
        }
      } else {
        res.render('admin')
      }
    } catch (err) {
      console.log('admin got error ' + err)
      res.redirect('back')
    }
  },

  SigninAdmin: async (req, res, next) => {
    try {
      const { adminuser, adminpassword } = req.body
      const LookingForDatebase = await mod.findOne({ email: adminuser })
      if (LookingForDatebase) {
        if (LookingForDatebase.password === adminpassword) {
          req.session.all = LookingForDatebase
          next()
          return
        } else {
          res.render('admin', { adminWrongText: '密碼錯誤，請再輸入一次' })
        }
      } else {
        res.render('admin', { adminWrongText: '無此帳號' })
      }
    } catch (err) {
      console.log('sign in admin got err' + err)
      res.redirect('back')
    }
  },

  GoAllproduct: async (req, res, next) => {
    try {
      const adminProduct = await productMod.find({
        raw: true,
        nest: true
      })
      return res.render('allproducts', { products: adminProduct })
    } catch (err) {
      console.log('go all product admin got error ' + err)
      res.redirect('back')
    }
  },

  GoAddproduct: (req, res, next) => {
    try {
      res.render('adminmanage')
    } catch (err) {
      console.log('go add product page ' + err)
      res.redirect('back')
    }
  },

  Addproduct: async (req, res, next) => {
    try {
      const { title, productclass, color, size, price, description } = req.body
      var images = [];
      if (req.files) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        for (i = 0; i < req.files.length; i++) {
          const img = await uploadImg(req.files[i].path)
          images[i] = img.data.link
        }
        await productMod.create({
          title: title,
          productclass: productclass,
          color: color,
          size: size,
          price: price,
          description: description,
          image: images
        })
        res.render('adminmanage', { AddedProductText: '商品新增成功' })
      } else {
        res.render('adminmanage', { AddedProductText: '商品上傳失敗' })
        console.log('image upload err')
      }
    } catch (err) {
      console.log('add product got err' + err)
      res.render('adminmanage', { AddedProductText: '上傳失敗' + err })
    }
  },

  DeleteProduct: async (req, res, next) => {
    try {
      const thisproduct = await productMod.findOne({ _id: req.params.id })
      await productMod.deleteOne(thisproduct)
      next()
      return
    } catch (err) {
      console.log('delete product got error ' + err)
    }
  },

  GoEditProduct: async (req, res, next) => {
    try {
      const thisproduct = await productMod.findOne({ _id: req.params.id })
      res.render('EditProduct', { products: thisproduct })
    } catch (err) {
      console.log('go edit product got err' + err)
    }
  },

  EditProduct: async (req, res, next) => {
    try {
      const thisproduct = await productMod.findOne({ _id: req.params.id })
      const { title, productclass, color, size, price, description } = req.body

      if (req.files.length !== 0) {
        var images = [];
        imgur.setClientID(IMGUR_CLIENT_ID)
        for (i = 0; i < req.files.length; i++) {
          const img = await uploadImg(req.files[i].path)
          images[i] = img.data.link
        }
        await thisproduct.updateOne({
          title: title,
          productclass: productclass,
          color: color,
          size: size,
          price: price,
          description: description,
          image: images
        })
      } else {

        await thisproduct.updateOne({
          title: title,
          productclass: productclass,
          color: color,
          size: size,
          price: price,
          description: description,
        })
      }


      return next()
    } catch (err) {
      console.log('edit product got error ' + err)
    }
  },

  GoCheckout: async (req, res, next) => {
    try {
      const CHECKOUTMOD = await checkoutMod.find({
        raw: true,
        nest: true
      })
      res.render('allcheckouts', { CHECKOUTMOD: CHECKOUTMOD })
    } catch (err) {
      console.log('go checkout got' + err)
      res.render('back')
    }
  },

  CargoChange: async (req, res, next) => {
    try {
      const thischeckout = await checkoutMod.findOne({ _id: req.params.id })

      await thischeckout.updateOne({ cargo: req.body.CargoChange })
      res.redirect('back')
    } catch (err) {
      console.log('cargo change got ' + err)
      res.redirect('back')
    }
  },

  DeleteCheckout: async (req, res, next) => {
    try {
      const thischeckout = await checkoutMod.findOne({ _id: req.params.id })

      await checkoutMod.deleteOne(thischeckout)
      next()
      return

    } catch (err) {
      console.log('delete checkout got' + err)
      next()
      return
    }
  }


}

module.exports = adminController
