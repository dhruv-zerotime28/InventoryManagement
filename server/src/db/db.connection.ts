import mongoose from "mongoose";

export async function ConnectDb (){
   try {
    const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("db connected successfully!");
   } catch (error) {
     console.log('db error:',error);
     process.exit(1);
   }
}
