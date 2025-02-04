import { Schema,Document,model, Model } from "mongoose";
import { Product } from "../Schemas/zodSchema.js";

export interface Iproducts extends Product ,Document{
    createdAt:Date,
    updatedAt:Date
}

const productSchema = new Schema<Iproducts>({
    name:{
        type:String,
        required:true,
        index:true,
    },
    category:{
        type:String,
        enum:["Toys and Games","Food and Beverages","Heath and Beauty","Home Goods","Electronic","Sports and Outdoors"],
        required :true,
        index:true,
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
},{
    // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    timestamps:true
})


const ProductModel:Model<Iproducts> = model<Iproducts>('product',productSchema);

export default ProductModel;