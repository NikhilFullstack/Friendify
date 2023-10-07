import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { commentEndpoints } from "../apis"

const {   CREATE_COMMENT_API,
          UPDATE_COMMENT_API,
          DELETE_COMMENT_API,
          CREATE_REPLY_API,
          UPDATE_REPLY_API,
          DELETE_REPLY_API } = commentEndpoints

export function createComment(data,token){
return async (dispatch)=>{
    let result = null
    const toastId = toast.loading("Loading...")
    console.log(data,"comment data");
    try {
      const response = await apiConnector("POST", CREATE_COMMENT_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("Create Comment API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Comment")
      }
      toast.success("User Comment Created")
      result = response?.data?.data
    } catch (error) {
      console.log("Create Comment API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
}

  export function createReply(data, token) {
    return async(dispatch)=>{
      let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_REPLY_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("Create Reply API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Reply")
      }
      toast.success("User Reply Created")
      result = response?.data?.data
    } catch (error) {
      console.log("Create Reply API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
    }
    
  }

  export function updateComment(data, token) {
    return async (dispatch)=>{
      let result = null
      const toastId = toast.loading("Loading...")
      try {
        console.log("updatecomment data/..",data);
        const response = await apiConnector("PUT", UPDATE_COMMENT_API, data, {
          Authorization: `Bearer ${token}`,
        })
        console.log("Update Comment API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not update comment")
        }
        toast.success("User comment Updated")
        result = response?.data?.data
      } catch (error) {
        console.log("Update Comment API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
    }
    
  }

  export function updateReply (data, token) {
    return async (dispatch)=>{
      let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_REPLY_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("Update REPLY API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not update REPLY")
      }
      toast.success("User REPLY Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("Update Reply API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
    }
    
  }

export function deleteComment (data,token){
  return async (dispatch)=>{
    const toastId = toast.loading("Loading........")
    try{
        const response = await apiConnector("DELETE",DELETE_COMMENT_API,data,{
            Authorization: `Bearer ${token}`,});
        console.log("Delete Comment Api Response...............",response);
        if(!response?.data?.success){
            throw new Error("Could not delete Comment");
        }
        toast.success("Comment deleted Successfully")
        toast.dismiss(toastId)
        return response?.data;    
        }
        catch(error){
            console.log("Delete Comment Api Error ........",error)
            toast.error(error.message)
        }
  }
    
    }

    export function deleteReply(data,token){
      return async (dispatch)=>{
        const toastId = toast.loading("Loading........")
        try{
            const response = await apiConnector("DELETE",DELETE_REPLY_API,data,{
                Authorization: `Bearer ${token}`,});
            console.log("Delete Reply Api Response...............",response);
            if(!response?.data?.success){
                throw new Error("Could not delete Reply");
            }
            toast.success("Reply deleted Successfully")
            toast.dismiss(toastId)
            return response?.data?.data;    
            }
            catch(error){
                console.log("Delete Reply Api Error ........",error)
                toast.error(error.message)
            }
      }
        
        }