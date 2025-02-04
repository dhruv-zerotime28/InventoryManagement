import jwt from 'jsonwebtoken';

export type role = "owner"|"employee";

export type payload = {
    _id:string,
    role : role
}

export type token = {
    accessToken : string,
    refreshToken : string
}

const generateTokens = async (user:payload):Promise<token | Error>=>{
    // console.log("payloads:",user)
    try {
        const accessToken = jwt.sign(
            user,
            `${process.env.ACCESS_TOKEN_KEY}`,
            {expiresIn : "1d"}
        )

        const refreshToken = jwt.sign(
            user,
            `${process.env.REFRESH_TOKEN_KEY}`,
            {expiresIn : "2d"}
        )
        const tokens = {
            accessToken : accessToken,
            refreshToken: refreshToken
        }
        return tokens
        
    } catch (error) {
        console.log(error)
        return error as Error
    }
}

export default generateTokens