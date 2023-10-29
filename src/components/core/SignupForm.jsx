

        import { useState,lazy,Suspense } from "react"
        import { toast } from "react-hot-toast"
        import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
        import {SiGnuprivacyguard} from "react-icons/si"
        import { useDispatch } from "react-redux"
        import { useNavigate } from "react-router-dom"
        import { Link } from "react-router-dom"
        
        import { sendOtp } from "../../services/operations/authAPI"
        import { setSignupData } from "../../slices/authSlice"
        import illustrator from '../../assets/images/illustration.png'
    
        const ImageHandler = lazy(() => import('../common/ImageHandler'));
        function SignupForm() {
          const navigate = useNavigate()
          const dispatch = useDispatch()

        
          const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            contactNumber: '',
          })
        
          const [showPassword, setShowPassword] = useState(false)
          const [showConfirmPassword, setShowConfirmPassword] = useState(false)
        
          const { firstName, lastName, email, password, confirmPassword, contactNumber } = formData
        
          // Handle input fields, when some value changes
          const handleOnChange = (e) => {
            setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: e.target.value,
            }))
          }
        
          // Handle Form Submission
          const handleOnSubmit = (e) => {
            e.preventDefault()
        
            if (password !== confirmPassword) {
              toast.error("Passwords Do Not Match")
              return
            }
            const signupData = {
              ...formData,
            }
        
            dispatch(setSignupData(signupData))
            dispatch(sendOtp(formData.email, navigate))
        
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              contactNumber: '',
            })
          }
        
          
        
          return (
            <div className="h-screen lg:p-8 w-[85vw] ml-16 mt-4 md:min-w-[35%] text-sm
            translate-x-[-2rem] z-10 ">
              <Suspense fallback={<div className="spinner"></div>}>
                <ImageHandler Src={illustrator} ClassName={'bg-no-repeat hidden lg:block z-[-10] fixed h-max w-[50%] right-0 bottom-[15%] xl:top-0'} />
              </Suspense>
              <div>
              <h1 className='text-3xl border-b-2 border-gray-100 border-dashed p-4 text-white'>
                <span className='animate-bounce'>F</span>
                <span className='animate-pulse'>r</span>
                <span className='animate-pulse'>i</span>
                <span className='animate-pulse'>e</span>
                <span className='animate-pulse'>n</span>
                <span className='animate-pulse'>d</span>
                <span className='animate-pulse'>i</span>
                <span className='animate-pulse'>f</span>
                <span className='animate-pulse'>y</span>
              </h1>
              <br/>
              </div>
              <form onSubmit={handleOnSubmit} className="flex w-fit flex-col gap-y-4 p-4">
                <div className="flex gap-x-4">
                  <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] lg:hover:scale-95 text-gray-50">
                      First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleOnChange}
                      placeholder="Enter first name"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
                    />
                  </label>
                  <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] lg:hover:scale-95 text-gray-50">
                      Last Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleOnChange}
                      placeholder="Enter last name"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
                    />
                  </label>
                </div>
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] lg:hover:scale-95 text-gray-50">
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
                    className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50 lowercase"
                  />
                </label>
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] lg:hover:scale-95 text-gray-50">
                    Phone Number <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type="Number"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={handleOnChange}
                    placeholder="Enter phone number"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
                  />
                </label>
                <div className="flex gap-x-4">
                  <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50  lg:hover:scale-95">
                      Create Password <sup className="text-pink-200">*</sup>
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
                      className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] pr-10 text-gray-50"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-[38px] z-[10] cursor-pointer lg:hover:scale-95"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </label>
                  <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50 lg:hover:scale-95">
                      Confirm Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm Password"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] pr-10 text-gray-50"
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-[38px] z-[10] cursor-pointer lg:hover:scale-95"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-20 rounded-[8px] bg-yellow-400 hover:bg-yellow-500 hover:font-bold hover:text-yellow-100 py-[8px] px-[12px] font-medium
                   text-gray-900 lg:hover:scale-95"                >
                  Create Account
                </button>
              </form>
              <div className="mt-2 text-white flex lg:gap-x-52">Already registered -->
              <Link to='/login' className="flex lg:hover:scale-95 font-semibold hover:text-green-600 border-2 lg:border-0 rounded-lg lg:px-12 lg:rounded-lg p-1 lg:p-0 border-yellow-400 lg:border-none hover:font-semibold gap-2 text-white" ><span className="text-white">Login</span> <SiGnuprivacyguard className="translate-y-1"/> </Link></div>

            </div>
          )
        }
        
        export default SignupForm
