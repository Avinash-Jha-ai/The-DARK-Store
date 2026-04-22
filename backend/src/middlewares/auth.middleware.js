import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../configs/config.js";

export const authenticateUser = async (req, res, next) => {
    const token = req.cookies?.token; // ✅ FIX

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decode = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decode.id); // ✅ FIX

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user; // ✅ now correct
        next();

    } catch (error) {
        console.log("error in auth middleware:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const isAdmin = (req, res, next) => {
    try {
        const user = req.user; // comes from auth middleware

        if (!user || user.role.toLowerCase().trim() !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access only"
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};