
import mongoose from "mongoose";


const productSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    Collection:{
        type:String,
        enum:["shirt","t-shirt","cotton-linen","polos","classic-fit-tees","outerwear","sneakers","all-accessories","joggers","jeans","pants","cargos"],
        required:true,
    },
    stock: {
        type: Number,
        default: 10
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

},{ timestamps: true })

const productModel =mongoose.model("product",productSchema);

export default productModel