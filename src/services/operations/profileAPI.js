import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"
import { setSearchData, setSearchLoading } from "../../slices/searchSlice"
import { setAllUser, setAllUserLoading } from "../../slices/allUserSlice"
const { GET_USER_DETAILS_API,
  GET_ALL_USER_PRESENT_API,
  // DELETE_USER_API,
  // UPDATE_PROFILE_OF_USER_API,
  // UPDATE_PROFILE_PICTURE_API,
  SEARCH_USER_API } = profileEndpoints;
  
export function getUserDetails(token,id,navigate) {
  
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "POST", 
        GET_USER_DETAILS_API, 
        {"id":`${id}`}, 
        {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_Profile API RESPONSE............", response);
      toast.dismiss(toastId);

      return response;
    } catch (error) {
      toast.dismiss(toastId)
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not fetch0 User Details");
      navigate('/');
      throw error;
    }

  }
}

export async function getAllUserPresent(token, navigate) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setAllUserLoading(true))
    try {
      const response = await apiConnector("GET", GET_ALL_USER_PRESENT_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_ALL_USER_PRESENT_SO_FAR RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      dispatch(setAllUser({ ...response.data }))
    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setAllUserLoading(false))
  }
}


  export function searchUser(data, token,navigate){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setSearchLoading(true))
    try {
      const response = await apiConnector("POST", SEARCH_USER_API, data, {
      "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })
      console.log("POST_SEARCH_USER API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      console.log("search:data:profileAPI:", response.data)
      const res = response.data.user;
      dispatch(setSearchData(res))
      
      toast.dismiss(toastId)
      dispatch(setSearchLoading(false))

      return response;
    } catch (error) {
      dispatch(logout(navigate))
      console.log("POST_USER_SEARCH API ERROR............", error)
      toast.error("Could Not Search User");
      throw error;
    }
  }
}


