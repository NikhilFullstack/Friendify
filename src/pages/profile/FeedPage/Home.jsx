import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI'
import { useDispatch } from 'react-redux';
import Post from './Post'
// import AddPost from './AddPost';
import bglog from '../../../assets/Mickey/122.jpg'
import bglogm from '../../../assets/images/13m.jpg'
import Navbar from '../../../components/common/Navbar';
import Navbar2 from '../../../components/common/Navbar2';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token===null) 
            dispatch(logout(navigate))
},[]);

  return (
    <div className='flex h-screen w-screen mt-[88px] xl:mt-0 '>
      <img alt='bg-login' src={bglogm} className='bg-no-repeat md:hidden bg-inherit z-[-10] fixed h-screen w-screen'/>
      <img alt='bg-login' src={bglog} className='bg-no-repeat hidden md:block bg-inherit z-[-10] fixed h-screen w-screen'/>
      
      <div className='relative w-[30%] xl:block hidden '><Navbar /></div>
      <div className='relative w-full '><Post /></div>
      <div className='relative w-[30%] xl:block hidden' ><Navbar2  /></div>
      
      {/* <img src={wallpaper} className='bg-colver -z-20 fixed bg-cover bg-no-repeat ' alt='' /> */}
      
      
    </div>
  )
}

export default Home
