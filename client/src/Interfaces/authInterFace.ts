import * as z from "zod";

export const AuthSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "userName must be 3 charcter long" })
    .regex(
      new RegExp(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/),
      "Name should contain only alphabets"
    ),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "password must be 6 character" }),
});

export type SignUp = z.infer<typeof AuthSchema>;

export type SignIn = Omit<SignUp, "name">;
