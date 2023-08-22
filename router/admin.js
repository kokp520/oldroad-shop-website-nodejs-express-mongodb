const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/admin', adminController.GoSigninAdmin, adminController.GoAllproduct)
router.get('/admin/addproduct', adminController.GoSigninAdmin, adminController.GoAddproduct)
router.get('/admin/allproducts', adminController.GoSigninAdmin, adminController.GoAllproduct)
router.get('/EditProduct/:id', adminController.GoSigninAdmin, adminController.GoEditProduct)
router.get('/admin/allcheckouts', adminController.GoSigninAdmin, adminController.GoCheckout)
router.get('/deleteproduct/:id', adminController.GoSigninAdmin, adminController.DeleteProduct, adminController.GoAllproduct)
router.get('/deleteCheckout/:id', adminController.GoSigninAdmin, adminController.DeleteCheckout, adminController.GoCheckout)

router.post('/admin/addproduct', upload.array('imagefile', 4), adminController.Addproduct)
router.post('/admin/allproducts', adminController.SigninAdmin, adminController.GoAllproduct)
router.post('/CargoChange/:id', adminController.CargoChange)
router.post('/EditProduct/:id', upload.array('imagefile', 4), adminController.EditProduct, adminController.GoAllproduct)

module.exports = router
