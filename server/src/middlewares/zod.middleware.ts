import { Request,Response,NextFunction } from "express";
import {z,ZodError} from 'zod';
// import { ApiError } from "@root/utils/ApiError";
export function validateData(schema:z.ZodObject<any,any>){
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            next(error)
        }
    }
}