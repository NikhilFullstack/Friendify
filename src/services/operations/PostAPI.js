import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { postEndpoints } from "../apis"
import { setFeed, setFeedLoading } from "../../slices/feedSlice"
import { profileEndpoints } from "../apis"
import { async } from "q"
import { logout } from "./authAPI"

const { CREATE_POST_API,
  GET_ALL_POST_API,
  UPDATE_POST_API,
  DELETE_POST_API,
  LIKE_POST_API,
  UNLIKE_POST_API } = postEndpoints
const { SEARCH_USER_API } = profileEndpoints

// add the course details
export const createPost = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_POST_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE POST API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Post Details")
    }
    toast.success("Post Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE Post API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export function getAllPost(token){
return async (dispatch) => {
    dispatch(setFeedLoading(true))
    let result = []
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_POST_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("INSTRUCTOR COURSES API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch feed post")
      }
      result = response?.data
      dispatch(setFeed(result));
    } catch (error) {
      console.log("fetch post API ERROR............", error)
      toast.error(error.message)
      // dispatch(logout)
    }

    toast.dismiss(toastId)
    dispatch(setFeedLoading(false))
    return result;
  }
}


export function deletePost (data, token) {
  return async ()=>{
    const toastId = toast.loading("Loading........")
  try {
    const response = await apiConnector("DELETE", DELETE_POST_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Delete Post Api Response...............", response);
    if (!response?.data?.success) {
      throw new Error("Could not delete Post");
    }
    toast.success("Post deleted Successfully")
    toast.dismiss(toastId)
    return response?.data?.data;
  }
  catch (error) {
    console.log("Delete Post Api Error ........", error)
    toast.error(error.message)
  }
  }
  
}


export function updatePost (data, token) {
  return async ()=>{
    let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", UPDATE_POST_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE Post API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Post")
    }
    toast.success("User Post Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE Post API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
  }
  
}



export function searchUser(data, token) {
  return async()=>{
    let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", SEARCH_USER_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("Search User API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not search User Profile")
    }
    response?.data?.data === [] ? (toast.success("No User found")) : (toast.success("User Found successfully"))

    result = response?.data?.data
  } catch (error) {
    console.log("User Searching API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
  }
  
}

export function likePost (data, token) {
  return async (dispatch)=>{
    let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LIKE_POST_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("Like Post API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Like Post")
    }
    toast.success("Post Liked")
    result = response?.data?.data
  } catch (error) {
    console.log("Like Post API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
  }
}

export function unlikePost  (data, token) {
  return async (dispatch)=>{
    let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", UNLIKE_POST_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("unLike Post API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not unLike Post")
    }
    toast.success("Post unLiked")
    result = response?.data?.data
  } catch (error) {
    console.log("UnLike Post API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
  }
  
}