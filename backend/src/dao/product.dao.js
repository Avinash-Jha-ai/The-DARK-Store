import productModel from "../models/product.model.js";


export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({
        _id: productId,
    })

    const stock = product.stock || 0
    return stock
}