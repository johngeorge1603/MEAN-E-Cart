const express = require('express')
const productController = require('../controller/productController')
const userController = require('../controller/userController')
const wishlistController = require('../controller/wishlistController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const cartController = require('../controller/cartController')

const router = new express.Router()

// getAllProducts
router.get('/allproducts' , productController.getAllProductController)

// registerUser
router.post('/register' , userController.registerController)

// login
router.post('/login' , userController.loginController)

// viewProduct
router.get('/viewproduct/:id' , productController.getAProductController)


// addToWishList
router.post('/addtowishlist', jwtMiddleware , wishlistController.addWishlistController)
// getWishList
router.get('/getwishlist', jwtMiddleware , wishlistController.getWishlistController)
// removeWishList
router.delete('/removewishlist/:id', jwtMiddleware , wishlistController.removeWishlistController)


// addToCart
router.post('/addtocart', jwtMiddleware , cartController.addToCartController)
// getCart
router.get('/getcart', jwtMiddleware , cartController.getCartController)
// removeWishList
router.delete('/removecart/:id', jwtMiddleware , cartController.removeCartController)
// increment item
router.get('/cartincrement/:id', jwtMiddleware , cartController.incrementItem)
// decrement item
router.get('/cartdecrement/:id', jwtMiddleware , cartController.decrementItem)
// empty cart
router.delete('/emptycart', jwtMiddleware , cartController.emptyCart)


module.exports = router