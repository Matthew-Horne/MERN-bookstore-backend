import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./books/book.route";
import orderRoutes from "./orders/order.route";
import userRoutes from "./users/user.route";
import adminRoutes from "./stats/admin.stats";
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://mern-bookstore-frontend-k9vb3t2nw-matthews-projects-18007ecb.vercel.app",
      "https://mern-bookstore-frontend-one.vercel.app",
    ],
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send("Book Server!");
});

//routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error("DB_URL environment variable is not defined");
    }
    const maskedUrl = dbUrl.replace(
      /(mongodb\+srv:\/\/[^:]+:)([^@]+)(@.*)/,
      "$1****$3"
    );
    console.log("Attempting to connect to MongoDB with URL:", maskedUrl);

    await mongoose.connect(dbUrl);
    app.listen(port, () => {
      console.log(
        `Server running on http://localhost:${port}, connected to MongoDB`
      );
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();
