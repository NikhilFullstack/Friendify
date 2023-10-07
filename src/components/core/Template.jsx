import { useSelector } from "react-redux"

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="h-full w-full">
      {loading ? (
        <div className=""></div>
      ) : (
        <div className='h-screen w-screen m-auto'>
          
          {formType === "signup" ? <SignupForm /> : <LoginForm />}

        </div>
      )}
    </div>
  )
}

export default Template