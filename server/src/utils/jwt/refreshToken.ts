import jwt from 'jsonwebtoken';
import OwnerModel from '../../models/owner.model.js';
import { ApiError } from '../ApiError.js';
import generateTokens from './tokenGeneration.js'

export const checkRefreshToken = async(_id:string,refreshToken:string)=>{
    try {
        const user = await OwnerModel.findById({_id});       //get the user by id to pass in token generation and saving new token

        if(!user || !user.refreshToken){                                    //if user or token is not ther then custom error is thrown
            throw new ApiError(403,"enable to fetch user data")
        }

        if(refreshToken !== user.refreshToken){  
            user.refreshToken = "";
            await user.save()                       //check cookies ref token is same as db stored or not
            throw new ApiError(403,"Plz re-loggin")
        }

        const payload = {
            _id ,
            role : user.role
        }
        
        const newTokens = await generateTokens(payload);        

        if(!(newTokens instanceof Error)){                          //generating new Tokens and updating both ref and access token
            user.refreshToken = newTokens.refreshToken;
            await user.save();
            // console.log("tokens has been refreshed")
            return newTokens
        }
        
    } catch (error) {
        throw(error)
    }
}