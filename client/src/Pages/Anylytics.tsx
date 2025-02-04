import { useGetProductStatsQuery } from "../GlobalState/Services/Inventory"
import toast from "react-hot-toast";
import { Table } from "../Components/Table";


export const Anylytics = () => {
  const {data,isLoading,error} = useGetProductStatsQuery();
  
  if(isLoading){
    return <div>...is loading</div>
  }
  if(error){
    console.log(data);
    return <div>got error</div>
  }
  if(data){
    console.log(data)
    return (
      <div className="bg-gray-900 flex flex-col items-center">
        <div className="flex my-12">
        <div className="flex flex-col text-center m-4 p-4 bg-gray-800 rounded-2xl">
          <p>Total Products</p>
          <p>{data.totalProducts}</p>
        </div>
          <div className="flex flex-col text-center m-4 p-4 bg-gray-800 rounded-2xl">
            <p>Low Stocked Count</p>
            <p>{data.lowStockNum}</p>
          </div>
          <div className="flex flex-col text-center m-4 p-4 bg-gray-800 rounded-2xl">
            <p>avgPrice</p>
            <p>{Math.trunc(data.avgPrice)}</p>
          </div>
        </div>
        <div className="pb-12">
           <Table/>
        </div>
      </div>
    )
  }
 
}
