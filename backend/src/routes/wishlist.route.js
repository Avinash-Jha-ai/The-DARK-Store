import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateUser, getWishlist);
router.post("/add", authenticateUser, addToWishlist);
router.delete("/remove/:productId", authenticateUser, removeFromWishlist);

export default router;
