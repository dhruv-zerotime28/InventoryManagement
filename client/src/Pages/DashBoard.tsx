import { useEffect, useState } from "react";
import {
  useGetProductsQuery,
  Idb,
  useDeleteProductMutation,
} from "../GlobalState/Services/Inventory";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const DashBoard = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState<Idb[] | undefined>([]);
  const [deleteProductMutation] = useDeleteProductMutation();
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(data);
  }, [data]);

  //for filtering out
  useEffect(() => {
    filterTable();
  }, [name, category]);

  const deleteProduct = (id: string) => {
    deleteProductMutation(id)
      .unwrap()
      .then((payload: any) => {
        // console.log(payload);
        toast.success(payload.message);
      })
      .catch((error) => {
        // console.log("err:",error);
        toast.error(error.data.message);
        if(error.status === 403){
          toast.error('Plz login as owner');
          navigate('/auth/signIn')
        }
      });
  };
  

  const filterTable = () => {
    if (name === "" && category === "") {
      setFilteredProducts(data);
    } else if (name !== "" || category !== "") {
      const filData = data && data.filter((p)=>{
        return p.name
              .toLocaleLowerCase()
              .includes(name.toLocaleLowerCase());
      }).filter((p)=>{
              if(category === ""){
                return p
              }else{
                return p.category === category;
              }      
      })
      setFilteredProducts(filData)
    }
  };

  const EditProduct = (id: string) => {
    navigate(`/edit/${id}`);
  };

  if (data) {
    return (
      <div className="w-full p-12 rounded-2xl flex-row justify-center">
        <div className="w-full bg-gray-500 p-2 flex justify-between rounded-t-md">
          <input
            type="text"
            placeholder="productName"
            onChange={(e) => setName(e.target.value)}
            className="border-1 rounded-sm p-1 text-sm bg-gray-800"
          />
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-1 rounded-sm p-1 text-sm bg-gray-800"
          >
            <option value= "" className="bg-gray-800">Select Category</option>
            <option value="Food and Beverages" className="bg-gray-800">
              food and Beverages
            </option>
            <option value="Toys and Games" className="bg-gray-800">
              toys and games
            </option>
            <option value="Heath and Beauty" className="bg-gray-800">
              Heath and Beauty
            </option>
            <option value="Home Goods" className="bg-gray-800">
              Home Goods
            </option>
            <option value="Electronic" className="bg-gray-800">
              Electronic
            </option>
            <option value="Sports and Outdoors" className="bg-gray-800">
              Sports and Outdoors
            </option>
          </select>
          <button
            onClick={() => {
              navigate("/add");
            }}
            className="p-1 bg-gray-800 rounded-sm"
          >
            add Product
          </button>
        </div>
        <table className="bg-gray-700 w-full text-center p-8 rounded-md">
          <thead>
            <tr className="bg-gray-800">
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredProducts &&
              filteredProducts.map((item: Idb) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td className={`${item.stock <= 5 && `bg-red-400`}`}>
                      {item.stock}
                    </td>
                    <td>
                      <button
                        className=""
                        onClick={() => {
                          EditProduct(item._id);
                        }}
                      >
                        <MdOutlineEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        className=""
                        onClick={() => {
                          deleteProduct(item._id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <p>got the error</p>;
  }
  if (isLoading) {
    return <div>DashBoard Table loading</div>;
  }
};
