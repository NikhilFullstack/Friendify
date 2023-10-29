import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {FcGoogle} from "react-icons/fc"
import { login } from "../../services/operations/authAPI"
function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })


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
    <div className="max-h-screen">
      <section class="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
    <div class="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
      <div class="md:w-1/2 px-5">
        <h2 class="text-2xl font-bold text-[#002D74]">Login</h2>
        <p class="text-sm mt-4 text-[#002D74]">If you have an account, please login</p>
        <form class="mt-6" onSubmit={handleOnSubmit}>
          <div>
            <label class="block text-gray-700">Email Address</label>
            <input 
            type="email" 
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter Email Address" 
            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/>
          </div>

          <div class="mt-4">
            <label class="block text-gray-700">Password</label>
            <input 
            type="password" 
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password" 
            minlength="3" 
            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required/>
          </div>

          <div class="text-right mt-2">
            <Link to="/forgot-password" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700 delay-200">Forgot Password?</Link>
          </div>

          <button type="submit" class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6">Log In</button>
        </form>

        <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
          <hr class="border-gray-500" />
          <p class="text-center text-sm">OR</p>
          <hr class="border-gray-500" />
        </div>

        <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
          
          <FcGoogle/>
          <span class = "ml-4">Login with Google</span>
        </button>

        <div class="text-sm flex justify-between items-center mt-3">
          <p>If you don't have an account...</p>
          <Link to='/signup' class="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">Register</Link>
        </div>
      </div>

      <div class="w-1/2 md:block hidden ">
        <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" class="rounded-2xl" alt="page img"/>
      </div>


                       {/* <div className="h-max px-[5%] flex flex-col justify-center items-center  text-lg lg:pb-[10%] lg:text-xl xl:text-2xl">
      
       <div className="h-max w-[74%]  lg:flex">
       <img className="rounded-full opacity-80" alt="hero" src={friendifyLogo} />
     </div>
       <form
      onSubmit={handleOnSubmit}
      className="mt-3 flex flex-col gap-y-4 h-full w-10/12"
    >
      <label className="w-10/12 h-max">
        <p className="py-2  text-gray-50">
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
          className="w-[85%] rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50 "
        />
      </label>
      <label className="relative py-4 w-10/12 h-max">
        <p className="py-2  text-gray-50">
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
        className="mt-6  lg:hover:scale-95 delay-200 rounded-[8px] hover:font-bold hover:bg-green-600 bg-yellow-50 py-[8px] px-[12px] font-medium text-gray-900"
      >
        Sign In
      </button>
     
    </form>
    <div className="mt-2 w-fit text-white flex gap-20">New User-->
    <Link to='/signup' className="flex  hover:text-green-600 lg:text-white 
    border-2 lg:border-0 rounded-lg 
    lg:rounded-none p-1 lg:p-0 border-yellow-400 lg:border-none
     hover:font-semibold lg:hover:scale-95 delay-200 text-white">Sign Up 
    <SiGnuprivacyguard className="translate-y-1 lg:hover:scale-95 delay-200"/> </Link></div>
    </div> */}
    
    </div>
  </section>
    </div>
    
  )
}

export default LoginForm