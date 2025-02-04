// import toast from "react-hot-toast";
import { Navigate } from "react-router";

interface Props {
    Component: React.ComponentType;
  }

export const ProtectedRoute :  React.FC<Props> = ({Component}) => {

    const userData = localStorage.getItem("userData");

    
    if(!userData){
      return <Navigate to="/auth/signIn"/>
    }

    // if in case wanted to handle the role auth on front-side commented as we have handled on the server-side
    // if(userData){
    //     const UData = JSON.parse(userData);
    //     if(UData.role !== "owner"){
    //       toast.error("You're not athorized!");
    //       <Navigate to="/"/>
    //     }
    // }

    return <Component/>
}
