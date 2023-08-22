const express = require('express')
const router = express.Router()


const mainController = require('../controllers/mainController')

const auth = require('../middleware/auth')

router.get('/', mainController.GoIndexPage)
router.get('/store', mainController.GoStore)
router.get('/account', mainController.GoSignin)
router.get('/register', mainController.GoRegister)
router.get('/cart', auth, mainController.GoCart)
router.get('/singleproduct/:id', mainController.GoSingleproduct)
router.get('/userOrder/:id', auth, mainController.GoUserorder)
router.get('/signout', mainController.Signout)
router.get('/Signin', mainController.GoSignin)
router.get('/store/:class', mainController.GoClassStore)
router.get('/AccountEdit/:id', mainController.GoRegister)


router.post('/register', mainController.Register)
router.post('/SignIn', mainController.Signin)
router.post('/checkout', mainController.Checkout)
router.post('/AddOrder/:id', mainController.AddOrder)
router.post('/CheckCode', mainController.CheckCode)
router.post('/AccountEdit/:id', mainController.AccountEdit)


module.exports = router
