import express from "express";
import { createOrder, getOrdersByEmail } from "../orders/order.controller";
const router = express.Router();

//create an order
router.post("/", createOrder);

//get orders by email
router.get("/email/:email", getOrdersByEmail);

export default router;
