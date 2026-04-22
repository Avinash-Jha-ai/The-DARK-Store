import wishlistModel from "../models/wishlist.model.js";

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        let wishlist = await wishlistModel.findOne({ user: userId }).populate("products");
        
        if (!wishlist) {
            wishlist = await wishlistModel.create({ user: userId, products: [] });
        }
        
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        let wishlist = await wishlistModel.findOne({ user: userId });

        if (!wishlist) {
            wishlist = await wishlistModel.create({ user: userId, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
                await wishlist.save();
            }
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        let wishlist = await wishlistModel.findOne({ user: userId });

        if (wishlist) {
            wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
            await wishlist.save();
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
