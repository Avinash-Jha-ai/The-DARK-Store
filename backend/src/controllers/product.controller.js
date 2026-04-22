import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"
import mongoose from "mongoose";


export const addProductBySeller = async (req, res) => {
    let { title, description, price, Collection } = req.body;
    const seller = req.user;

    try {
        title = title.toLowerCase();
        Collection=Collection.toLowerCase();
        const images = req.files ? await Promise.all(req.files.map(async (file) => {
            const uploadRes = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            });
            return { url: uploadRes.url };
        })) : [];

        const product = await productModel.create({
            title,
            description,
            price,
            sellerID: seller._id,
            images,
            Collection
        });

        return res.status(201).json({
            message: "product has been created",
            success: true,
            product
        });

    } catch (error) {
        console.log("error in add product controller : ", error);
        return res.status(500).json({
            message: "Failed to create product",
            success: false,
            error: error.message
        });
    }
}


export const getAllProduct =async (req,res)=>{
    try{
        const product =await productModel.find();

        return res.status(200).json({
            message : "all product fetch ",
            success:true,
            product
        })
    }catch(error){
        console.log("error in get all product controller : ",error);
    }
}


export const getSellerProduct = async (req, res) => {
    try {
        const sellerId = req.user._id;

        const products = await productModel.find({
            sellerID: sellerId   // ✅ correct filter
        });

        return res.status(200).json({
            message: "seller products fetched successfully",
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.log("error in get seller product controller:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export async function getProductDetails(req, res) {
    try{
        const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: "Invalid product ID",
                    success: false
                });
            }

        const product = await productModel.findById(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Product details fetched successfully",
            success: true,
            product
        })
    }catch(error){
        console.log("error in get product detail controller",error)
    }
}


export const getProductsByCollection = async (req, res) => {
    try {
        const { Collection } = req.params;

        const products = await productModel.find({ Collection });

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const search = async (req, res) => {
    try {
        let { title } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Search term is required"
            });
        }

        const query = title.trim().toLowerCase();
        const words = query.split(/\s+/).filter(word => word.length > 0);

        if (words.length === 0) {
            return res.status(200).json({ success: true, products: [] });
        }

        // Create search conditions for each word
        // Each word must match either the title or the collection
        const searchConditions = words.map(word => ({
            $or: [
                {
                    title: {
                        $regex: word,
                        $options: "i"
                    }
                },
                {
                    Collection: {
                        $regex: word,
                        $options: "i"
                    }
                }
            ]
        }));

        const products = await productModel.find({
            $and: searchConditions
        });

        return res.status(200).json({
            success: true,
            count: products.length,
            products: products || []
        });

    } catch (error) {
        console.log("error in search : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



export const deleteProduct =async (req,res)=>{

    try{
        const productId = req.params.id;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await productModel.findByIdAndDelete(productId);

        return res.status(200).json({
            message:"product has deleted"
        })

    }catch(error){
        console.log("error in delete product : ",error)
    }
}