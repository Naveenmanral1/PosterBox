import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"
import wishlistRouter from "./routes/wishlist.routes.js"
const app = express()

const allowedOrigins = process.env.CORS_ORIGIN.split(",")

app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, 
    })
  );
  
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/product",productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/wishlist',wishlistRouter)  

export {app} 