import express, { Request, Response, NextFunction } from "express";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post(
  "/admin",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    try {
      const admin = await User.findOne({ username });
      if (!admin) {
        res.status(401).json({ message: "Admin not found" });
        return;
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }
      if (!JWT_SECRET) {
        res.status(500).json({ message: "JWT secret not set" });
        return;
      }
      const token = jwt.sign(
        { id: admin._id, username: admin.username, role: admin.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Admin login successful",
        token,
        user: {
          username: admin.username,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
