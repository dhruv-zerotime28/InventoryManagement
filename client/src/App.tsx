import { Outlet } from "react-router";
import { Link } from "react-router";
import { useRouteTestQuery, useUserLogOutMutation } from "./GlobalState/Services/auth";
import toast from "react-hot-toast";

function App() {
  const [UserLogOut] = useUserLogOutMutation();
  // const {data,isLoading,error} = useRouteTestQuery();
  const LocalStorageUser = localStorage.getItem("userData") as string;

  // if(isLoading || data){
  //   console.log(isLoading,data)
  // }
  // if(error){
  //   console.log(error)
  // }
  const logOut = () => {
    const userData = JSON.parse(LocalStorageUser);

    UserLogOut({ _id: userData._id })
      .unwrap()
      .then((payload: any) => {
        localStorage.removeItem("userData");
        toast.success(payload.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <>
      <div className="text-xl text-neutral-200 w-screen flex-row justify-center">
        <div className="w-full flex justify-center bg-gray-900 p-1 ">
          <Link to="/analytics">
            <p className="mx-8 text-md text-neutral-200">Analytics</p>
          </Link>
          <Link to="/">
            <p className="mx-8 text-md text-neutral-200">DashBoard</p>
          </Link>
          <Link to="/add">
            <p className="mx-8 text-md text-neutral-200">Add products</p>
          </Link>
          {LocalStorageUser ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <Link to="/auth/signIn">
              <p className="mx-8 text-md text-neutral-200">Log In</p>
            </Link>
          )}
        </div>
        <h1 className="w-full text-center p-8">
          Inventory Mangement DashBoard
        </h1>
        <Outlet />
      </div>
    </>
  );
}

export default App;
