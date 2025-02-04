import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../../Interfaces/productInterface";
import { prodstats } from "../../Interfaces/productInterface";

export interface Idb extends ProductType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductResponse {
  data: Idb[];
  message: string;
}

interface UpdateProductType extends ProductType {
  _id: string;
}

interface prodstatsResponse {
  data: prodstats;
  message: string;
}

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    credentials: "include",
    // prepareHeaders: (headers) => {
    //   return headers;
    // },
  }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<Idb[], void>({
      query: () => "product",
      transformResponse: (response: ProductResponse) => {
        return response.data;
      },
      providesTags: ["Products"],
    }),
    getProductById: build.query<ProductType, string>({
      query: (id) => `product/${id}`,
    }),
    getProductStats: build.query<prodstats, void>({
      query: () => `products/stats`,
      transformResponse: (response: prodstatsResponse) => {
        return response.data;
      },
    }),
    getlowStocked: build.query<Idb[] | [], void>({
      query: () => `/products/lowStock`,
      transformResponse: (response: ProductResponse) => {
        return response.data;
      },
    }),
    addProduct: build.mutation<string, ProductType>({
      query(body) {
        return {
          url: `product`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<string, UpdateProductType>({
      query(body: UpdateProductType) {
        return {
          url: `product/${body._id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<string, string>({
      query(id: string) {
        return {
          url: `product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductStatsQuery,
  useGetlowStockedQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = inventoryApi;
