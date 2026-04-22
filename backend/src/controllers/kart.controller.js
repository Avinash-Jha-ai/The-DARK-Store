import kartModel from "../models/kart.model.js";
import productModel from "../models/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";


export const addToCart = async (req, res) => {

    const { productId } = req.params
    const { quantity = 1 } = req.body

    const product = await productModel.findOne({
        _id: productId
    })

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const stock = await stockOfVariant(productId)

    const cart = (await kartModel.findOne({ user: req.user._id })) ||
        (await kartModel.create({ user: req.user._id }))

    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId )

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId ).quantity
        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false
            })
        }

        await kartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )

        return res.status(200).json({
            message: "Cart updated successfully",
            success: true
        })
    }

    if (quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }

    cart.items.push({
        product: productId,
        quantity,
        price: product.price
    })

    await cart.save()

    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })
}

export const getCart = async (req, res) => {
    const user = req.user

    let cart = await kartModel.findOne({ user: user._id }).populate("items.product")

    if (!cart) {
        cart = await kartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })
}

export const removeFromCart = async (req, res) => {
    const { productId } = req.params
    const user = req.user

    const cart = await kartModel.findOne({ user: user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId)

    await cart.save()

    return res.status(200).json({
        message: "Product removed from cart successfully",
        success: true
    })
}

export const updateCartItemQuantity = async (req, res) => {
    const { productId } = req.params
    const { quantity } = req.body
    const user = req.user

    if (quantity < 1) {
        return res.status(400).json({
            message: "Quantity must be at least 1",
            success: false
        })
    }

    const product = await productModel.findById(productId)
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    const stock = await stockOfVariant(productId)

    if (quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }

    const cart = await kartModel.findOne({ user: user._id })
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
    if (itemIndex === -1) {
        return res.status(404).json({
            message: "Product not found in cart",
            success: false
        })
    }

    cart.items[itemIndex].quantity = quantity
    await cart.save()

    return res.status(200).json({
        message: "Cart quantity updated successfully",
        success: true
    })
}

export const clearCart = async (req, res) => {
    const user = req.user

    const cart = await kartModel.findOne({ user: user._id })
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    cart.items = []
    await cart.save()

    return res.status(200).json({
        message: "Cart cleared successfully",
        success: true
    })
}