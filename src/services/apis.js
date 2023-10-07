const BASE_URL = "https://friendify-x10t.onrender.com"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
  AUTH_API: BASE_URL + "/api/v1/auth/authz",
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password/",//here token is send as Id is dend
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/api/v1/profile/getUserProfile",
  GET_ALL_USER_PRESENT_API: BASE_URL + "/api/v1/profile/getAllUser",
  DELETE_USER_API: BASE_URL + "/api/v1/profile/deleteUser",
  UPDATE_PROFILE_OF_USER_API: BASE_URL + "/api/v1/profile/updateProfile",
  UPDATE_PROFILE_PICTURE_API: BASE_URL + "/api/v1/profile/updateProfilePicture",
  SEARCH_USER_API: BASE_URL + "/api/v1/profile/searchUser",
}

//POST ENDPOINTS
export const postEndpoints = {
  CREATE_POST_API: BASE_URL + "/api/v1/post/createPost",
  GET_ALL_POST_API: BASE_URL + "/api/v1/post/getAllPost",
  UPDATE_POST_API: BASE_URL + "/api/v1/post/updatePost",
  DELETE_POST_API: BASE_URL + "/api/v1/post/deletePost",
  LIKE_POST_API: BASE_URL + "/api/v1/post/likePost",
  UNLIKE_POST_API: BASE_URL + "/api/v1/post/unlikePost"
}
// COMMENTS ENDPOINTS
export const commentEndpoints = {
  CREATE_COMMENT_API: BASE_URL + "/api/v1/profile/createComment",
  UPDATE_COMMENT_API: BASE_URL + "/api/v1/profile/updateComment",
  DELETE_COMMENT_API: BASE_URL + "/api/v1/profile/deleteComment",
  CREATE_REPLY_API: BASE_URL + "/api/v1/profile/createReply",
  UPDATE_REPLY_API: BASE_URL + "/api/v1/profile/updateReply",
  DELETE_REPLY_API: BASE_URL +"/api/v1/profile/deleteReply",
}

