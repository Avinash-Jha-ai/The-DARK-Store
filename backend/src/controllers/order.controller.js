import orderModel from "../models/order.model.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate("user", "name email")
            .populate("items.product", "title price images")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        if (!["Processing", "Shipped", "Delivered", "Cancelled"].includes(orderStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { orderStatus },
            { new: true }
        ).populate("user", "name email").populate("items.product", "title price images");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderModel.find({ user: userId })
            .populate("items.product", "title price images")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Error fetching my orders:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
