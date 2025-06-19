import express from "express";
import {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { checkstafflevelpermission } from "../middleware/checkpermission.js";

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(checkAuthorization, getBooksController)
  .post(checkAuthorization, checkstafflevelpermission, createBookController);

bookRouter
  .route("/:id")
  .put(checkAuthorization, updateBookController)
  .delete(checkAuthorization, deleteBookController);

export default bookRouter;
