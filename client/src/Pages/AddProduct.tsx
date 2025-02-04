import { Form } from "../Components/Form"


export const AddProduct = () => {
  return (
    <div className=" bg-gray-900 p-12 rounded-2xl w-auto mx-100 flex flex-row flex-wrap justify-center">
        <h1 className="w-full text-center p-2">Add Products</h1>
        <div className="">
            <Form edValue={undefined}/>
        </div>
    </div>
  )
}
