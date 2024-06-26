import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

dotenv.config();
connectdb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoute);
app.get("/", (req, res) => {
  res.send("welcome on server");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgYellow.white);
});
