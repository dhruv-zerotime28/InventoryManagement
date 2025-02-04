import { z } from "zod";

export const validateProduct = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  category: z.enum(
    [
      "Toys and Games",
      "Food and Beverages",
      "Heath and Beauty",
      "Home Goods",
      "Electronic",
      "Sports and Outdoors",
    ],
    { message: "Need to be valid category" }
  ),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .gt(0, { message: "Price should be greater then zero" }),
  stock: z.number().gte(0, { message: "positive value are needed for stocks" }),
});

export const user = z.object({
  userName: z
    .string({
      required_error: "userName is required",
      invalid_type_error: "userName must be a string",
    })
    .min(3, { message: "username should be atleast 3 char long" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "password should be atleast 6 digit long" }),
  role: z.enum(["owner", "employee"]).optional(),
});

export type Product = z.infer<typeof validateProduct>;