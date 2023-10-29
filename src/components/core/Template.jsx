import { useSelector } from "react-redux"

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({  formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="h-max w-screen ">
      {loading ? (
        <div className=""></div>
      ) : (
        <div className='h-full w-screen m-auto'>
          
          {formType === "signup" ? <SignupForm /> : <LoginForm />}

        </div>
      )}
    </div>
  )
}

export default Template