import React, { useEffect, Suspense } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI'
import { useDispatch } from 'react-redux';

const Navbar01 = React.lazy(()=>import('../../../components/common/Navbar'));
const Post01 = React.lazy(()=>import('./Post'));
const Navbar02 = React.lazy(()=>import('../../../components/common/Navbar2'));
function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token===null) 
            dispatch(logout(navigate))
},[]);

  return (
    <div className='flex h-screen w-screen mt-[88px] xl:mt-0 bg-[rgb(241,245,249)] text-black'>
      
      
      <div className='relative w-[30%] xl:block hidden '> 
      <Suspense fallback={<div className=''></div>}><Navbar01 /></Suspense> 
      </div>
      <div className='relative w-full '>
        <Suspense fallback={<div className=''></div>}><Post01 /></Suspense>
        
        </div>
      <div className='relative w-[30%] xl:block hidden' >
        <Suspense fallback={<div className=''></div>}><Navbar02 /></Suspense>
        </div>
      
      
      
    </div>
  )
}

export default Home
