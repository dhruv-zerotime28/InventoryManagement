import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Idb,
  useAddProductMutation,
  useUpdateProductMutation,
} from "../GlobalState/Services/Inventory";
import { ProductSchema, ProductType } from "../Interfaces/productInterface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface IformProps {
  edValue: undefined | Idb;
}

export const Form = ({ edValue }: IformProps) => {
  const [AddProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => {
    reset(edValue);
  }, [edValue]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const onSubmit = async (data: ProductType) => {
    if (window.location.pathname === "/add") {
      AddProduct(data)
        .unwrap()
        .then((payload: any) => {
          console.log(payload);
          toast.success("Product has been added");
          navigate("/");
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error.status);
        });
    } else {
      const _id = edValue?._id;
      if (_id) {
        updateProduct({ ...data, _id })
          .unwrap()
          .then((payload: any) => {
            // console.log(payload);
            toast.success(payload.message);
            navigate("/");
          })
          .catch((error) => {
            // console.log(error);
            toast.error(error.data.message);
            if (error.status === 403) {
              toast.error("Plz login as owner");
              navigate("/auth/signIn");
            }
          });
      }
    }
  };

  return (
    <div className="w-full p-8 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-2 flex flex-col">
          <label htmlFor="name" className="text-gray-100">
            Product Name:
          </label>
          <input
            type="text"
            {...register("name")}
            className="bg-gray-400 rounded-sm p-1  text-black"
          />
          {errors?.name?.message && (
            <p className="text-sm text-red-500 p-1">
              {String(errors.name.message)}
            </p>  
          )}
        </div>
        <div className="m-2 flex flex-col">
          <label htmlFor="category" className="text-gray-100">
            Category:
          </label>
          <select
            id="cat"
            {...register("category", { required: true })}
            defaultValue={""}
            className="bg-gray-400 rounded-sm p-1 text-black m-1"
          >
            <option
              value="Food and Beverages"
              className="bg-gray-400 rounded-sm p-1 text-black"
            >
              food and Beverages
            </option>
            <option
              value="Toys and Games"
              className="bg-gray-400 rounded-sm p-1 text-black"
            >
              toys and games
            </option>
            <option
              value="Heath and Beauty"
              className="bg-gray-400 rounded-sm p-1 text-black"
            >
              Heath and Beauty
            </option>
            <option
              value="Home Goods"
              className="bg-gray-400 rounded-sm p-1 text-black"
            >
              Home Goods
            </option>
            <option
              value="Electronic"
              className="bg-gray-400 rounded-sm p-1 text-black"
            >
              Electronic
            </option>
            <option
              value="Sports and Outdoors"
              className="bg-gray-400 rounded-sm p-1 text-black"
            >
              Sports and Outdoors
            </option>
          </select>
          {errors.category && (
            <p className="text-sm text-red-500 p-1">
              {String(errors.category.message)}
            </p>
          )}
        </div>
        <div className="m-2 flex flex-col">
          <label htmlFor="price" className="text-gray-100">
            Price :
          </label>
          <input
            type="text"
            className="bg-gray-400 rounded-sm p-1  text-black"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-500 p-1">
              {String(errors.price.message)}
            </p>
          )}
        </div>
        <div className="m-2 flex flex-col">
          <label htmlFor="stock" className="text-gray-100">
            Stock :
          </label>
          <input
            type="text"
            {...register("stock", { valueAsNumber: true })}
            className="bg-gray-400 rounded-sm p-1  text-black"
          />
          {errors.stock && (
            <p className="text-sm text-red-500 p-1">
              {String(errors.stock.message)}
            </p>
          )}
        </div>
        <div className="w-full flex justify-center">
          <button
            disabled={!isDirty}
            className="w-3/4 mt-5 p-1 rounded-md bg-blue-950"
          >
            sumbit
          </button>
        </div>
      </form>
    </div>
  );
};

{
  // import { useState, useEffect } from "react";
  // import { productType, categoryEnum } from "../Interfaces/productInterface";
  // import { ProductResponse } from "../GlobalState/Services/Inventory";
  // import { GiConsoleController } from "react-icons/gi";
  // // type cat = "Food and Beverages" | "Toys and Games" | "Heath and Beauty" | "Home Goods" | "Electronic" | "Sports and Outdoors"
  // interface IformProps {
  //   edValue: undefined | ProductResponse;
  // }
  // export const Form = ({ edValue }: IformProps) => {
  //   const [name, setName] = useState<String>("");
  //   const [category, setCategory] = useState<String>("");
  //   const [price, setPrice] = useState<Number>(0);
  //   const [stock, setStock] = useState<Number>(0);
  //   const [error, setError] = useState<String>();
  //   const [disbtn, setDisbtn] = useState<boolean>();
  //   useEffect(() => {
  //     console.log(edValue);
  //     if (edValue) {
  //       setName(edValue.name);
  //       setCategory(edValue.category);
  //       setPrice(edValue.price);
  //       setStock(edValue.stock);
  //     }
  //   }, [edValue]);
  //   const formValidation = (data: any) => {
  //     console.log("IformVal:",data)
  //     switch (data) {
  //       case data.name === "":
  //         setDisbtn(true);
  //         setError("Product can't be empty!");
  //         break;
  //       case !Object.values(categoryEnum).includes(data.category):
  //         setDisbtn(true);
  //         setError("categories selection needed!");
  //         break;
  //       case data.price <= 0:
  //         setDisbtn(true);
  //         setError("Price can't be zero or negative");
  //         break;
  //       case data.stock < 0:
  //         setDisbtn(true);
  //         setError("Stock can't be Negative!");
  //         break;
  //       default:
  //         setDisbtn(false);
  //         break;
  //     }
  //     console.log()
  //   };
  //   const submitForm = (e: React.MouseEvent<HTMLElement>) => {
  //     e.preventDefault();
  //     const data = { name, category, price, stock };
  //     formValidation(data);
  //     if (!disbtn) {
  //       console.log("passed validation:",data);
  //       //make the api call here
  //       //wait for the response and show the toast
  //       //enable the the btn and empty input states and navigate the user to product dashboard
  //     }
  //   };
  //   return (
  //     <div className="w-full bg-indigo-400 p-8">
  //       <form>
  //         <div className="m-2">
  //           <label htmlFor="name" className="p-2 text-gray-100">
  //             Product Name:
  //           </label>
  //           <input
  //             name="name"
  //             type="text"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             className="bg-gray-400 rounded-sm p-1  text-gray"
  //           />
  //         </div>
  //         <div className="m-2">
  //           <label htmlFor="category" className="p-2 text-gray-100">
  //             Category:
  //           </label>
  //           <select
  //             name="categories"
  //             id="cat"
  //             value={category}
  //             onChange={(e) => setCategory(e.target.value)}
  //             className="bg-gray-400 rounded-sm p-1 text-black m-1"
  //           >
  //             <option
  //               value="Food and Beverages"
  //               className="bg-gray-400 rounded-sm p-1 text-black"
  //             >
  //               food and Beverages
  //             </option>
  //             <option
  //               value="Toys and Games"
  //               className="bg-gray-400 rounded-sm p-1 text-black"
  //             >
  //               toys and games
  //             </option>
  //             <option
  //               value="Heath and Beauty"
  //               className="bg-gray-400 rounded-sm p-1 text-black"
  //             >
  //               Heath and Beauty
  //             </option>
  //             <option
  //               value="Home Goods"
  //               className="bg-gray-400 rounded-sm p-1 text-black"
  //             >
  //               Home Goods
  //             </option>
  //             <option
  //               value="Electronic"
  //               className="bg-gray-400 rounded-sm p-1 text-black"
  //             >
  //               Electronic
  //             </option>
  //             <option
  //               value="Sports and Outdoors"
  //               className="bg-gray-400 rounded-sm p-1 text-black"
  //             >
  //               Sports and Outdoors
  //             </option>
  //           </select>
  //         </div>
  //         <div className="m-2">
  //           <label htmlFor="price" className="p-2 text-gray-100">
  //             Price
  //           </label>
  //           <input
  //             name="price"
  //             type="number"
  //             value={price}
  //             onChange={(e) => setPrice(Number(e.target.value))}
  //             className="bg-gray-400 rounded-sm p-1  text-gray"
  //           />
  //         </div>
  //         <div className="m-2">
  //           <label htmlFor="stock" className="p-2 text-gray-100">
  //             Stock
  //           </label>
  //           <input
  //             name="stock"
  //             type="number"
  //             value={stock}
  //             onChange={(e) => setStock(Number(e.target.value))}
  //             className="bg-gray-400 rounded-sm p-1  text-gray"
  //           />
  //         </div>
  //         <p id="errorMessage">{error}</p>
  //         <button
  //           className={`w-full mt-5`}
  //           disabled={disbtn}
  //           onClick={submitForm}
  //         >
  //           sumbit
  //         </button>
  //       </form>
  //     </div>
  //   );
  // };
}
