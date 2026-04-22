import express from "express";
import {register ,login,getMe ,logout,adminLogin} from "../controllers/auth.controller.js"
import {authenticateUser} from "../middlewares/auth.middleware.js"
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";

const router = express.Router();

router.post("/register",validateRegisterUser,register);
router.post("/login",validateLoginUser,login);

router.get("/get-me",authenticateUser,getMe);
router.post("/logout", authenticateUser, logout);

router.post("/admin-login", adminLogin);

export default router;