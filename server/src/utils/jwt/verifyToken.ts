// import jwt from 'jsonwebtoken';


// interface VerifyResponse {
//     _id :string,
//     role: "employee" | "owner"
// }

// //for verifying the accesstoken 
// export const verifyToken = (accessToken :string):Partial<VerifyResponse>=>{
//     try {
//         const verify :  = jwt.verify(accessToken,`${process.env.ACCESS_TOKEN_KEY}`)
//         console.log("verifying accesss Tokens",verify)
//         return verify
//     } catch (error) {
//         // console.log("verify tokens errors:",error);
//         return 
//     }
// }