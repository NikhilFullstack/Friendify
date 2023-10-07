import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from "../../../services/operations/PostAPI"
import PostCard from '../../../components/common/PostCard';
import {  useNavigate } from 'react-router';
import { logout } from "../../../services/operations/authAPI"
import { setSearchData } from '../../../slices/searchSlice';
import { FaArrowLeft } from 'react-icons/fa';
import SearchTemplate from './SearchTemplate';
import billi from '../../../assets/logo/Friendify-media-logo.jpg'
// import { useNavigate } from 'react-router-dom';

function Post() {

  const { token } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("token:", token);
        await dispatch(getAllPost(token)).then((res)=>{
          console.log("rees",res,"resposne has been recived");
        });
        
      }
      catch (err) {
        console.log("error in fetching All post feed", err, err.message);
        dispatch(logout(navigate))
      }
    }
    fetchData();
  }, []);

  const { data } = useSelector((state) => state.feed)
  const { feedLoading } = useSelector((state) => state.feed)
  console.log(data,"hello");
  const { searchData,searchLoading } = useSelector((state)=>state.search)
  return (

    <div className='flex flex-col h-max w-min mx-auto 
      ' >
        {searchData!==null ? (
        <>{console.log('search data show ho gya',searchData)}
        {
          searchData.map((tag, index)=>(
            <SearchTemplate tag={tag} key={index}/>
          ))
        } 
        </>):(
          <>
            {feedLoading ? (<div>Spinner</div>) : (
              <div className='flex h-max w-max translate-x-4 xl:translate-x-0  flex-col-reverse '>
    
                {
                  data?.posts
                    .map((Post,index) => (
                      <PostCard post={Post}  key={index} />
                    ))
                }
    
              </div>
    
            )}</>
    
        )}
        {searchData!=null?(
<button onClick={()=>{dispatch(setSearchData(null))}} className='text-white font-semibold 
flex fixed top-[19vh] left-2 xl:top-10  xl:left-80 bg-gray-700 rounded-sm h-fit w-fit p-2 px-4'><FaArrowLeft/></button>
        ):(
<></>
        )}

    </div>
  )
}

export default Post
