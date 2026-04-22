import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.route.js"
import productRouter from "./routes/product.route.js"
import kartRouter from "./routes/kart.route.js"
import paymentRouter from "./routes/payment.route.js"
import orderRouter from "./routes/order.route.js"
import wishlistRouter from "./routes/wishlist.route.js"

const app =express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use("/api/auth",authRouter);
app.use("/api/product",productRouter);
app.use("/api/kart",kartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/order", orderRouter);
app.use("/api/wishlist", wishlistRouter);

export default app