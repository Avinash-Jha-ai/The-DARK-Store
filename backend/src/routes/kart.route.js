import { Router } from "express";
import {addToCart, getCart, removeFromCart, updateCartItemQuantity, clearCart} from "../controllers/kart.controller.js"
import {authenticateUser} from "../middlewares/auth.middleware.js"

const router=Router();


// router.get("/create-kart",authenticateUser,createKart);
router.post("/add/:productId",authenticateUser,addToCart);
router.get("/",authenticateUser,getCart);
router.delete("/remove/:productId",authenticateUser,removeFromCart);
router.put("/update/:productId",authenticateUser,updateCartItemQuantity);
router.delete("/clear",authenticateUser,clearCart);


export default router
