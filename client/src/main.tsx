// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import { AddProduct } from "./Pages/AddProduct.tsx";
import { EditProduct } from "./Pages/EditProduct.tsx";
import { DashBoard } from "./Pages/DashBoard.tsx";
import { Anylytics } from "./Pages/Anylytics.tsx";
import { Auth } from "./Pages/Auth.tsx";
import { SignUp } from "./Pages/SignUp.tsx";
import { SignIn } from "./Pages/SignIn.tsx";
import { store } from "./GlobalState/store.ts";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./Components/ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DashBoard />} />
          <Route path="analytics" element={<Anylytics />} />
          <Route path="add" element={<ProtectedRoute Component={AddProduct}/>} />
          <Route path="edit/:id" element={<ProtectedRoute Component={EditProduct}/>} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
