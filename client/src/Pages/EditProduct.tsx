import { useEffect, useState } from "react";
import { Form } from "../Components/Form";
import { useGetProductsQuery,Idb } from "../GlobalState/Services/Inventory";
import { useParams } from "react-router";


export const EditProduct = () => {
  const {id}  = useParams();
  const { data } = useGetProductsQuery();
  const [propdata,setPropData] = useState<undefined | Idb>();

  useEffect(()=>{
    // console.log('paramid:',id,'here is its type:',typeof(id));
    // console.log("data in edit folder:",data )
    const prod: Idb | undefined = data ? data.find(p  => p._id === id):undefined
    console.log("found the prod:",prod);
    setPropData(prod)
  },[data])

  
  return (
    <div className="mx-100 bg-gray-900 p-12 rounded-2xl w-auto flex flex-row flex-wrap justify-center border-2">
        <h1 className="w-full text-center p-2">Edit Products</h1>
        <div className="">
            {data? <Form edValue = {propdata}/> : "undefined"}
        </div>
    </div>
  )
}
