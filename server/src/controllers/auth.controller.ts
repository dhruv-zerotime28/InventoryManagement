import { Request,Response,NextFunction } from "express";
import OwnerModel,{IOwnerDocument} from "../models/owner.model.js";
import generateTokens,{payload,token} from "../utils/jwt/tokenGeneration.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import { MongooseError } from "mongoose";

export default class authControllers{
    static async signUp(req:Request, res:Response , next:NextFunction){   
        const {email,userName} = req.body;
       
        // console.log({email,userName,phone})
        try {
            const checkUser = await OwnerModel.findOne({$or:[
                {userName : userName},
                {email : email}, 
            ]});

            // console.log("checkUsers",checkUser);

            if(checkUser){
                throw new ApiError(403,"User with same credentials exists");
            }

            const userDetails = {...req.body};

            if(userDetails.email === 'makotoshenkai@gmail.com'){
                userDetails.role = 'owner'
            }
            
            const user: IOwnerDocument | null= (await OwnerModel.create(userDetails))
            
            if(!user){
                throw new ApiError(500,"Error while registration")
            }
              
            res.status(200).json({message:"user sign up",data : user});

        } catch (error) {
            if(error instanceof MongooseError){
                next(new ApiError(500,"db error Occured"))
            }
            next(error)
        }
    }

    static async signIn(req:Request, res:Response , next:NextFunction){
        const {email,password} = req.body;
     
        try {
            const user = await OwnerModel.findOne({email:email})
            
            if(!user){
                throw new ApiError(406,"user doesn't exists,sign in first!");
            }

            const passMatch = await bcrypt.compare(password,user.password as string)
            //can be written in the model ...
            
            if(!passMatch){ 
                throw new ApiError(401,"password doesn't match")
            }

            const payload:payload = {_id : user.id as string , role :user.role};

            const tokens = await generateTokens(payload);

            if(!(tokens instanceof Error)){
                user.refreshToken = tokens.refreshToken;

                await user.save();
                res.cookie("accessToken",tokens.accessToken,{httpOnly:true});                   //{expires : new Date(360000 + Date.now())}
                res.cookie("refreshToken",tokens.refreshToken,{httpOnly:true});
            }

            res.status(200).json({message:"User logged In",data:user})
        } catch (error) {
            next(error)
        }
    }

    static async logout(req:Request, res:Response , next:NextFunction){
        const {_id} = req.body;

        try {
            const user = await OwnerModel.findById({_id});

            if(!user){
                throw new ApiError(406,"user doesn't exists with this id")
            }

            user.refreshToken = "";

            await user.save();

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            res.status(200).json({message:"user logged out"})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

