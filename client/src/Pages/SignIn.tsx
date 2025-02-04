import { AuthComponent } from "../Components/AuthComponent"

export const SignIn = () => {
  return (
    <div className="flex flex-wrap justify-center border-1 rounded-2xl">
      <h1 className="w-full text-center p-2">Sign In</h1>
      <AuthComponent/>
    </div>
  )
}
