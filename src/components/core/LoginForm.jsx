import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {SiGnuprivacyguard} from "react-icons/si"
import { login } from "../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="p-3 gap-5 rounded-lg md:p-8 w-[90vw] flex flex-col mt-10 md:mt-20 justify-center items-center ml-8 md:max-w-[25%]  text-sm
     z-10 border-2 border-white shadow-white shadow-xl ">
      
      <div className="relative text-white gap-2 text-center leading-6">
      <h1 className="text-white text-xl">Login Here </h1>
      <h2 className="my-2 py-4 text-yellow-400">Mail: Gup7nik@gmail.com</h2>
      <h2 className="py-1 text-green-400">Psd<sup>*</sup> : 111</h2>
      </div>
      <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-fit flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] lg:hover:scale-95 delay-200 text-gray-50">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50 "
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] lg:hover:scale-95 delay-200 text-gray-50">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] pr-12 text-gray-50"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer lg:hover:scale-95 delay-200"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" className="lg:hover:scale-95 delay-200" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" className="lg:hover:scale-95 delay-200" />
          )}
        </span>
        <Link to="/forgot-password" className="lg:hover:scale-95 delay-200">
          <p className="mt-1 ml-auto max-w-max font-semibold hover:font-extrabold hover:text-gray-200 text-xs text-gray-200">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 lg:hover:scale-95 delay-200 rounded-[8px] hover:font-bold hover:bg-green-600 bg-yellow-50 py-[8px] px-[12px] font-medium text-gray-900"
      >
        Sign In
      </button>
     
    </form>
    <div className="mt-2 w-fit text-white flex gap-20">New User? 
    <Link to='/signup' className="flex  hover:text-green-600 lg:text-white 
    border-2 lg:border-0 rounded-lg 
    lg:rounded-none p-1 lg:p-0 border-yellow-400 lg:border-none
     hover:font-semibold lg:hover:scale-95 delay-200 text-white">Sign Up 
    <SiGnuprivacyguard className="translate-y-1 lg:hover:scale-95 delay-200"/> </Link></div>
    </div>
    
  )
}

export default LoginForm