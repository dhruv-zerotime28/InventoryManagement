import { NextFunction, Request,Response } from "express";
import ProductModel,{Iproducts} from "../models/products.models.js";
import { product as proSchema } from "../Schemas/dbtypes.js";
import { ApiError } from "../utils/ApiError.js";

export default class Products{
    static async getAllProducts(req:Request,res:Response,next:NextFunction){
        try {
            const products = await ProductModel.find();
            res.status(200).json({message:"Got you all Products",data:products})
            return
        } catch (error) {
            next(error)
            // console.log(error);
            // next(new ApiError(500,"Error while fetching products"))
        }
    }
    static  async addProduct(req:Request,res:Response,next:NextFunction){
      try {
            const addedProducts = await ProductModel.create(req.body);
            res.status(201).json({message:"product been added",data:addedProducts})
            return
        } catch (error) {
            next(error)
            // console.log(error);
            // next(new ApiError(500,"Error while fetching products"))
        }
    }
    static async getById(req:Request,res:Response,next:NextFunction){
        const {_id} = req.params;
        try {
            const item = await ProductModel.findById(_id);
            res.status(200).json({message:"Got your Product",data:item})
            
        } catch (error) {
            next(error)
            // console.log(error);
            // next(new ApiError(500,"Error while fetching Your Item"))
        }
    }
    static async updateProduct(req:Request,res:Response,next:NextFunction){
        const updata = req.body;
        const {_id} = req.params;
        try {
            const updateItem = await ProductModel.findByIdAndUpdate({_id},{...updata});
            res.status(202).json({message:"Product Updated Succesfully"})
        
        } catch (error) {
            next(error)
            // console.log(error);
            // next(new ApiError(500,"Error while updating Your Item"))
        }
    }

    static async deleteProduct(req:Request,res:Response,next:NextFunction){
        const {_id} = req.params;
        try {
            const dltItem = await ProductModel.findByIdAndDelete(_id);
            res.status(202).json({message:"Product Deleted!"})
        } catch (error) {
            next(error)
            // console.log(error);
            // next(new ApiError(500,"Error while fetching Your Item"))
        }
    }

    static async ProductsStats(req:Request,res:Response,next:NextFunction){
        try {
            const prodstats = await ProductModel.aggregate([{$group:{_id:null,avgPrice:{$avg:'$price'},totalProducts:{$sum:1}}}]);
            const lowStocks = await ProductModel.countDocuments({stock:{$lte : 5}});


            // console.log(prodstats,lowStocks)
            const data = {
                avgPrice : prodstats[0].avgPrice,
                totalProducts:prodstats[0].totalProducts,
                lowStockNum : lowStocks
            }
            res.status(200).json({message:"Here are your Products Stats",data:data});

        } catch (error) {
            next(error)
        }
    }

    static async lowStocks(req:Request,res:Response,next:NextFunction){
        try {
            const product = await ProductModel.find({stock:{$lt:5}})
            res.status(202).json({message:"Product Deleted!",data:product})
        } catch (error) {
            next(error)
        }
    }

    // static async FilteredQuery (req:Request,res:Response,next:NextFunction){
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

}