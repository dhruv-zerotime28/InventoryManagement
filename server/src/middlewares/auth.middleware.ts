import { NextFunction,Request,Response} from "express";
import jwt from 'jsonwebtoken';

import { checkRefreshToken } from "../utils/jwt/refreshToken.js";
import { ApiError } from "../utils/ApiError.js";

export interface CustomRequest extends Request {
    userRole ?: "owner"|"employee"
}
 
export default async function auth (req:CustomRequest,res:Response,next:NextFunction){
        const {accessToken,refreshToken} = req.cookies;
        // console.log(accessToken,refreshToken)
        try {
            if(!accessToken || !refreshToken){ //checks for both the tokens
                throw new ApiError(401,"sign in first")
            }
            
            //verify the access token 
            const {_id ,role}:any  = jwt.verify(accessToken,`${process.env.ACCESS_TOKEN_KEY}`)
           
            
            if(!_id ){                                           //if verified then next if not then token is refreshed or user logged out
                const newTokens = await checkRefreshToken(_id,refreshToken);
                res.cookie("accessToken",newTokens?.accessToken);
                res.cookie("refreshToken",newTokens?.refreshToken);
                next()
            }else{
                req.userRole = role
                next();
            }
        } catch (error) {
            // console.log("inside auth middleware",error);
            next(error)
        }
}