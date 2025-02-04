import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SignIn,
  SignUp,
} from "../../Interfaces/authInterFace.ts";

interface sIType extends SignIn{
  role ?: "owner" | "employee"
}
interface sUType extends SignUp {
  role ?:"owner" | "employee"
}
interface IlogOut {
  _id : string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    credentials: "include",
  }),
  tagTypes: ["user"],

  endpoints: (build) => ({
    userSignUp: build.mutation<string, sUType>({
      query(body) {
        return {
          url: `auth/signUp`,
          method: "POST",
          body,
        };
      },
    }),
    userSignIn: build.mutation<string, sIType>({
      query(body) {
        return {
          url: `auth/signIn`,
          method: "POST",
          body,
        };
      },
    }),
    userLogOut: build.mutation<string, IlogOut>({
      query(body) {
        return {
          url: `auth/logout`,
          method: "POST",
          body,
        };
      },
    }),
    RouteTest: build.query<string, void>({
      query() {
        return {
          url: `test`,
          method: "GET",
          timeout: 1000,
        };
      },
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useUserSignInMutation,
  useUserLogOutMutation,
  useRouteTestQuery
} = authApi;
