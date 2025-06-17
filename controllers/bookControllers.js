import { BookModel } from "../models/bookModel.js";
//import { bookServices } from "../services/bookServices.js";
import { decodeJWT } from "../utils/generateToken.js";

export const getBooksController = async (req, res) => {
  try {
    const jwttoken = req?.body?.token;
    const foundUser = await decodeJWT(jwttoken);

    //const token = reqBody.token
    //const book = await bookServices.getBooks();
    console.log("founduser", foundUser);
    if (!foundUser) {
      res.json({
        success: false,
        message: `you are not authorized `,
      });
    }
    const books = await BookModel.find();
    return res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const createBookController = async (req, res) => {
  try {
    const reqBody = req.body;

    const book = await BookModel.create(reqBody);

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const reqBody = req.body;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      const updatedBook = await BookModel.findByIdAndUpdate(bookId, reqBody, {
        new: true,
      });

      return res.json({
        success: true,
        data: updatedBook,
      });
    }

    res.json({
      success: false,
      message: `Book with id: ${bookId} not found!`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      await BookModel.findByIdAndDelete(bookId);

      return res.json({
        success: true,
        message: `${foundBook.title} has been deleted successfully!`,
      });
    }

    res.json({
      success: false,
      message: `Book with id: ${bookId} not found!`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
