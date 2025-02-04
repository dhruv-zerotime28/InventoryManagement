import { Router } from "express";
import Products from "../controllers/products.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { roleAuth } from "../middlewares/role.middleware.js";
import { validateData } from "../middlewares/zod.middleware.js";
import { validateProduct } from "../Schemas/zodSchema.js";

const productRoutes = Router();

productRoutes.route('/product')
        .get(Products.getAllProducts)
        .post(validateData(validateProduct),Products.addProduct)   //

productRoutes.route('/product/:_id')
        .get(Products.getById)
        .delete(auth,roleAuth,Products.deleteProduct) //
        .put(auth,roleAuth,validateData(validateProduct),Products.updateProduct)   //


productRoutes.route('/products/lowStock').get(Products.lowStocks);
productRoutes.route('/products/stats').get(Products.ProductsStats);

export default productRoutes