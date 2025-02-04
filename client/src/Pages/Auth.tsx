import { Outlet } from 'react-router'
export const Auth = () => {
  return (
    <div className='flex flex-wrap justify-center  w-screen h-3/4'>
    <div className='text-3xl w-full text-center p-4'>Welcome to Inventory Mangement</div>
    <Outlet/>
    </div> 
  )
}
