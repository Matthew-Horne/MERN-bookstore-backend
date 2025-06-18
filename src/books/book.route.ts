import { Router } from "express";
const router = Router();
import {
  deleteBook,
  getBook,
  getBooks,
  postBook,
  updateBook,
} from "./book.controller";
import verifyAdminToken from "../middleware/verifyAdminToken";

// POST a book
router.post("/create-book", verifyAdminToken, postBook);

// GET all books
router.get("/get-books", getBooks);

router.get("/get-book/:id", getBook);

router.put("/update-book/:id", verifyAdminToken, updateBook);

router.delete("/delete-book/:id", verifyAdminToken, deleteBook);

export default router;
