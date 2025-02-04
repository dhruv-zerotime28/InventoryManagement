import { Request, Response, NextFunction } from "express";
import OwnerModel from "../models/owner.model.js";
import { ApiError } from "../utils/ApiError.js";
import  { CustomRequest }  from "./auth.middleware.js";



export const roleAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("user role",req.userRole)
    if(req.userRole && (req.userRole  !== "owner")){
      throw new ApiError(403,"Role Auth Failed!")
    }
    next()
  } catch (error) {
    next(error)
  }
};
