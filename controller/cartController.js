const cartItems = require('../Models/cartModel')

// add to cart
exports.addToCartController = async (req, res) => {
    const {id, title, price, image, quantity}= req.body
    const userId = req.payload

    try{

        const existingProduct = await cartItems.findOne({id, userId})
        if(existingProduct){
            existingProduct.quantity+=1
            existingProduct.totalPrice= existingProduct.price * existingProduct.quantity
            await existingProduct.save()
            res.status(200).json("items added to cart")
        }else {
            const newProduct = new cartItems({
                id, 
                title, 
                price, 
                image, 
                quantity, 
                totalPrice: price * quantity, 
                userId
            });
            await newProduct.save();
            res.status(200).json({ message: 'Item added successfully', cartItem: newProduct });
        }

    }catch(err){
        res.status(401).json(err)
    }
}

// get cart
exports.getCartController = async (req, res) => {
    const userId = req.payload
    try{
        const allproducts = await cartItems.find({userId})
        res.status(200).json(allproducts)
    }catch(err){
        res.status(401).json(err)
    }
}

// remove cart
exports.removeCartController = async (req, res) => {
    const {id} = req.params
    try{
        const removeProduct = await cartItems.findByIdAndDelete({_id:id})
        res.status(200).json(removeProduct)

    }catch(err){
        res.status(401).json(err)
    }
}

// increment item
exports.incrementItem = async (req, res) => {
    const {id} = req.params

    try{
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity+=1
        selectedProduct.totalPrice = selectedProduct.price * selectedProduct.quantity
        await selectedProduct.save()
        res.status(200).json(selectedProduct)
    }catch(err){
        res.status(401).json(err)
    }
}

// decrement item
exports.decrementItem = async (req, res) => {
    const {id} = req.params

    try{
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity-=1

        if(selectedProduct.quantity==0){
            await cartItems.deleteOne({_id:id})
            res.status(200).json("quantity updated")
        }
        else{
            selectedProduct.totalPrice = selectedProduct.price * selectedProduct.quantity
            await selectedProduct.save()
            res.status(200).json(selectedProduct)
        }

    }catch(err){
        res.status(401).json(err)
    }
}


// empty cart
exports.emptyCart = async(req, res) => {
    const userId = req.payload

    try{
        const result = await cartItems.deleteMany({userId})
        res.status(200).json("Cart Emptied")
    }catch(err){
        res.status(401).json(err)
    }
}