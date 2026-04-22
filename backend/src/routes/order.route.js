import express from "express";
import { getAllOrders, updateOrderStatus, getMyOrders } from "../controllers/order.controller.js";
import { authenticateUser, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/my-orders", authenticateUser, getMyOrders);
router.get("/all", authenticateUser, isAdmin, getAllOrders);
router.patch("/update-status/:orderId", authenticateUser, isAdmin, updateOrderStatus);

export default router;
