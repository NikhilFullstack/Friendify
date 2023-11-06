import { toast } from "react-hot-toast"

import { setLoading, setSignupData, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API, 
  RESETPASSWORD_API,
  AUTH_API,
} = endpoints

export function logout(navigate) {
  return async (dispatch) => {
    await dispatch(setLoading(true));
    await dispatch(setToken(null))
    await localStorage.removeItem("token")
    await localStorage.removeItem("image")
    await localStorage.removeItem("firstName")
    await localStorage.removeItem("userId")
    await localStorage.removeItem("lastName")
    await toast.success("Logged Out")
    await navigate("/login")
    await dispatch(setLoading(false));

  }
}

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  contactNumber,
  otp,
  navigate,
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function authz(token, navigate){
  return async (dispatch) => {
      dispatch(setLoading(true))
      const toastId = toast.loading("Loading...")
      let result='';
      if(token === undefined || token === null){
      dispatch(setLoading(false))
      toast.dismiss(toastId)
      }
      else{
        try {
          const response = await apiConnector(
            "GET",
            AUTH_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
          console.log("Authz API RESPONSE............", response)
          if (!response?.data?.success) {
            toast.dismiss(toastId)
            await dispatch(logout(navigate))   

            throw new Error("Login Time Up Signin Again")
          }
        } catch (error) {
          toast.dismiss(toastId);
          console.log("Authz user Api error............", error)
          toast.error(error.message)
          await dispatch(logout(navigate))   
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result;
      }
    }
  }

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Login Successful")
      dispatch(setSignupData(response.data))
      dispatch(setToken(response.data.token))
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("id", JSON.stringify(response.data.existedEmail._id));
      localStorage.setItem("firstName", JSON.stringify(response.data.existedEmail.firstName))
      localStorage.setItem("lastName", JSON.stringify(response.data.existedEmail.lastName))
      localStorage.setItem("image", JSON.stringify(response.data.existedEmail.image))
      localStorage.setItem("userId", JSON.stringify(response.data.existedEmail._id))
      localStorage.setItem("uiTheme", JSON.stringify("black"))


      navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}





export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}