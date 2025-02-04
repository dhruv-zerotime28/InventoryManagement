import { Request,Response,ErrorRequestHandler, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ZodError } from "zod";

const Errorhandler = (err:Error|ApiError,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof ApiError){
        console.log("custom error stack",err?.stack);
         res.status(err.statusCode).send(err.serialize());
         
    }else if(err instanceof ZodError){
        console.log("inside zod:",err);
        const errorMessages = err.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(406).json({ error: 'Invalid data', message: errorMessages });
    }else{
         console.log("error stack :",err.stack);
         res.status(500).json({message:"Internal server error"});
    }
}

export default Errorhandler;