import { Router } from "express";
import { addProductBySeller ,getAllProduct,getSellerProduct ,getProductDetails,getProductsByCollection,search,deleteProduct} from "../controllers/product.controller.js";
import {createProductValidator} from "../validator/product.validator.js"
import multer from "multer";
import {isAdmin,authenticateUser} from "../middlewares/auth.middleware.js"

const router=Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})



/* seller add product  */

router.post("/seller", authenticateUser, isAdmin, upload.array('images',7), createProductValidator, addProductBySeller);
router.get("/", getAllProduct);
router.get("/seller-product", authenticateUser, isAdmin, getSellerProduct);
router.get("/detail/:id", getProductDetails);
router.get("/Collection/:Collection", getProductsByCollection);
router.post("/search", search);
router.delete("/delete/:id", authenticateUser, isAdmin, deleteProduct);

export default router