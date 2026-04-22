import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { config } from "../configs/config.js"


function sendToken(res, user, message) {
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
        message,
        success: true,
        token, // optional
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            role: user.role
        }
    });
}

export const register = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const user = await userModel.create({
            email, fullname, password
        })

        await sendToken(res, user, "User registered successfully")
    } catch (error) {
        console.log("error in register : ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Not an admin"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        await sendToken(res, user, "Admin login successful");

    } catch (error) {
        console.log("admin login error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        await sendToken(res, user, "user login successfully")

    } catch (error) {
        console.log("error in login : ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getMe = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            role: user.role
        }
    })
}

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};


