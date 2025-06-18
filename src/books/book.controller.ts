import Book from "./book.model";
import { Request, Response } from "express";
import { RequestHandler } from "express";

const postBook = async (req: Request, res: Response) => {
    try {
        const newBook = await Book.create({...req.body});
        await newBook.save();
        res.status(200).send({
            success: true,
            message: "Book created successfully",
            newBook
        })
        console.log("Book created successfully");
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send({
            success: false,
            message: "Error while creating book",
            error
        });
    }
}

const getBooks = async (_req: Request, res: Response) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "Books fetched successfully",
            books
        })
        console.log("Books fetched successfully");
    }
    catch (error: any) {
        console.error(error.message);
        res.status(500).send({
            success: false,
            message: "Error while fetching books",
            error
        })
    }
}

const getBook: RequestHandler = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).send({
                success: false,
                message: "Book not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Book fetched successfully",
            book
        })
        console.log("Book fetched successfully");
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send({
            success: false,
            message: "Error while fetching book",
            error
        })
    }
}

const updateBook: RequestHandler = async (req, res) => {
    console.log("Update request for ID:", req.params.id, "with body:", req.body);
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            console.log("Book not found for update:", req.params.id);
            res.status(404).send({
                success: false,
                message: "Book not found"
            });
            return;
        }
        res.status(200).send({
            success: true,
            message: "Book updated successfully",
            updatedBook
        });
        console.log("Book updated successfully");
    }
    catch (error: any) {
        console.error(error.message);
        res.status(500).send({
            success: false,
            message: "Error while updating book",
            error
        });
    }
}

const deleteBook = async (req: Request, res: Response) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404).send({
                success: false,
                message: "Book not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Book deleted successfully",
            deletedBook
        })
    }
    catch (error: any) {
        console.error(error.message);
        res.status(500).send({
            success: false,
            message: "Error while deleting book",
            error
        });
    }
}   


export { postBook, getBooks, getBook, updateBook, deleteBook };
