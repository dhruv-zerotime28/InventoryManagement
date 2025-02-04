import { useState, useEffect } from "react";
import { Link } from "react-router";
import { AuthSchema, SignUp as AuthForm } from "../Interfaces/authInterFace"; //,SignIn as sIType , SignUp as sUType
// import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useUserSignInMutation,
  useUserSignUpMutation,
} from "../GlobalState/Services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const AuthComponent = () => {
  const [pathName, setPathName] = useState<boolean>(false);
  const [userSignIn] = useUserSignInMutation();
  const [userSignUp] = useUserSignUpMutation();
  const navigate = useNavigate();
  const FinalSchema = pathName
    ? AuthSchema
    : AuthSchema.omit({ userName: true });
  // type AuthForm = z.infer<typeof FinalSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<AuthForm>({
    resolver: zodResolver(FinalSchema),
  });

  useEffect(() => {
    const pathname = window.location.pathname;
    // console.log("before", pathName, pathname);
    if (pathname === "/auth/signUp") {
      setPathName(true);
    }
    // console.log("after", pathname, pathName);
  }, []);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  console.log("err", errors);

  const onSubmit = async (data: AuthForm) => {
    console.log(data);
    if (pathName) {
      userSignUp(data)
        .unwrap()
        .then((payload: any) => {
          console.log(payload);
          toast.success(payload.message);
          navigate("/auth/signIn");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.data.message);
        });
    } else {
      userSignIn(data)
        .unwrap()
        .then((payload: any) => {
          console.log("result:", payload);
          const userData = { _id: payload.data._id, role: payload.data.role };
          localStorage.setItem("userData", JSON.stringify(userData));
          toast.success(payload.message);
          navigate("/");
        })
        .catch((error) => {
          console.log("err:", error);
          toast.error(error.data.message);
        });
    }
  };
  return (
    <div className="flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        {pathName && (
          <div className="m-2 flex flex-col">
            <label htmlFor="userName" className="text-gray-100">
              Name:
            </label>
            <input
              type="text"
              placeholder="Name"
              className="bg-gray-400 rounded-sm p-1  text-black"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-sm text-red-500 p-1">
                {String(errors.userName.message)}
              </p>
            )}
          </div>
        )}
        <div className="m-2 flex flex-col">
          <label htmlFor="email" className="text-gray-100">
            Email :{" "}
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="bg-gray-400 rounded-sm p-1  text-black"
          />
          {errors.email && (
            <p className="text-sm text-red-500 p-1">
              {String(errors.email.message)}
            </p>
          )}
        </div>
        <div className="m-2 flex flex-col">
          <label htmlFor="password" className="text-gray-100">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="bg-gray-400 rounded-sm p-1  text-black"
          />
          {errors.password && (
            <p className="text-sm text-red-500 p-1">
              {String(errors.password.message)}
            </p>
          )}
        </div>
        <div className="w-full flex justify-center">
          <input
            type="submit"
            className="w-3/4 mt-5 p-1 rounded-md bg-blue-950"
            disabled={!isDirty}
          />
        </div>
      </form>
      {!pathName && (
        <Link to={"/auth/signUp"}>
          <p className="text-center mt-4 text-gray-100">sign Up</p>
        </Link>
      )}
    </div>
  );
};
