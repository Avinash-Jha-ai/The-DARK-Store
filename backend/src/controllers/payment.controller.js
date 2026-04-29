import Razorpay from "razorpay";
import { config } from "../configs/config.js";
import orderModel from "../models/order.model.js";
import kartModel from "../models/kart.model.js";
import crypto from "crypto";

const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { amount, shippingAddress, items } = req.body;
        const user = req.user;

        if (!amount || !shippingAddress || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: amount, shippingAddress, or items",
            });
        }

        if (amount < 1) {
            return res.status(400).json({
                success: false,
                message: "Minimum amount must be at least 1 INR (100 paise)",
            });
        }

        const options = {
            amount: amount * 100, // razorpay expects amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        if (!razorpayOrder) {
            return res.status(500).json({
                success: false,
                message: "Failed to create Razorpay order",
            });
        }

        const newOrder = await orderModel.create({
            user: user._id,
            items,
            totalAmount: amount,
            shippingAddress,
            paymentStatus: "Pending",
            paymentDetails: {
                razorpayOrderId: razorpayOrder.id,
            },
        });

        res.status(201).json({
            success: true,
            order: razorpayOrder,
            dbOrderId: newOrder._id,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            dbOrderId,
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !dbOrderId) {
            return res.status(400).json({
                success: false,
                message: "Missing required verification fields",
            });
        }

        console.log("Verification Data Received:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId });

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        console.log("Signatures:", { received: razorpay_signature, expected: expectedSign });

        if (razorpay_signature === expectedSign) {
            console.log("Payment Verification Successful");
            // Payment verified
            const order = await orderModel.findByIdAndUpdate(
                dbOrderId,
                {
                    paymentStatus: "Paid",
                    paymentDetails: {
                        razorpayOrderId: razorpay_order_id,
                        razorpayPaymentId: razorpay_payment_id,
                        razorpaySignature: razorpay_signature,
                    },
                },
                { new: true }
            );

            // Clear user's cart
            await kartModel.findOneAndUpdate(
                { user: req.user._id },
                { items: [] }
            );

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                order,
            });
        } else {
            console.log("Payment Verification Failed: Signature Mismatch");
            // Payment verification failed
            await orderModel.findByIdAndUpdate(dbOrderId, {
                paymentStatus: "Failed",
            });

            return res.status(400).json({
                success: false,
                message: "Invalid signature, payment verification failed",
            });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
