import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { jwtsecretKey } from "../utils/generateToken.js";

export const checkAuthorization = async (req, res, next) => {
  try {
    const token = req?.body?.token;
    if (!token) {
      return req.json({
        success: false,
        message: "looks  like you have been logged out",
      });
    }
    const decoded = await jwt.verify(token, jwtsecretKey);
    console.log(decoded);
    if (!decoded._id) {
      return res.json({
        success: false,
        mesage: "you are unauthorized",
      });
    }
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.json({
        success: false,
        message: "invalid user or user not found",
      });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
