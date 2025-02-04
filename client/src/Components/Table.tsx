import { useGetlowStockedQuery } from "../GlobalState/Services/Inventory"
import { Idb } from "../GlobalState/Services/Inventory";

export const Table = () => {
  const {data,isLoading,error} = useGetlowStockedQuery();
 

  if(error){
    <div>Unable to Fetch the Data</div>
  }
  return (
    <div>
      <div className="text-center p-2 bg-gray-800 rounded-t-md text-2xl">Low Stocked Products</div>
      <div>
        {isLoading && <p>Loading data</p>}
        {(data && (data.length === 0)) ? <p>All Products are Stocked</p>:
          <table className="bg-gray-700 w-full text-center p-12 rounded-md">
          <thead className="">
            <tr className="bg-gray-800">
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody className="">
            {data &&
              data.map((item: Idb) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.stock}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        }
      </div>
    </div>
  )
}
