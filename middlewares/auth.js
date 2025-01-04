import jwt from "jsonwebtoken"
import ErrorHandler from "../utils/ErrorHandler"
import { catchAsyncErrors } from "./catchAsyncErrors"

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const  token = req.cookies.token || req.body.headers.Authorization.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("please login to access the resource", 401));
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id;
  next();
});
