// SUDAH DISEDIAKAN — menjalankan backend dan menyajikan frontend.
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
// SUDAH DISEDIAKAN — agar Controller dapat membaca body JSON.
app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "Server is healthy" }));
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(3000, "127.0.0.1", () => {
  console.log("Buka http://localhost:3000");
});
