import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  publicationDate: Date,
  genre: String,
  noOfPages: Number,
  availability: Boolean,
});

export const BookModel = mongoose.model("books", bookSchema);
