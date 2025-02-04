
import * as z from "zod";
export const ProductSchema = z.object({
    name : z.string().min(1,{message:"Product Name is required"}),
    category:z.enum(["Food and Beverages" , "Toys and Games" ,"Heath and Beauty" , "Home Goods" , "Electronic", "Sports and Outdoors"]),
    price:z.number().gt(0,{message:"price should be greater then 0"}),
    stock:z.number().nonnegative({message:"stock must be positive"})
  })
  
  export type ProductType = z.infer<typeof ProductSchema>;




 export interface prodstats {
    avgPrice:number,
    totalProducts:number,
    lowStockNum:number
  }
  {// export  enum categoryEnum {
//     food = "Food and Beverages",
//     toys = "Toys and Games",
//     heath = "Heath and Beauty",
//     home = "Home Goods",
//     electornic = "Electronic",
//     sports = "Sports and Outdoors"
// }

//  export type cat = "Food and Beverages" | "Toys and Games" | "Heath and Beauty" | "Home Goods" | "Electronic" | "Sports and Outdoors"
// export interface productType {
//     name : string,
//     category: categoryEnum,
//     price :number,
//     stock : number
// }
}