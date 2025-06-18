import { Request, Response, NextFunction } from "express";
import Order from "./order.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrdersByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await Order.find({ email: req.params.email }).sort({
      createdAt: -1,
    });
    if (!orders) {
      res.status(404).json({ message: "No orders found" });
      return;
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders" });
  }
};

export { createOrder, getOrdersByEmail };
