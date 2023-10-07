import React from 'react'
import { useSelector } from 'react-redux';
// import {GiFlowerPot} from 'react-icons/gi'
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai'
import {SiGmail, SiCodechef} from 'react-icons/si'
import { Link } from 'react-router-dom';

function Navbar2() {

    const avatar = localStorage.getItem("image").split('"')[1];
  const { signupData } = useSelector((state) => state.auth)

  return (
    <div className={` flex flex-col h-full pl-5 py-5 w-[20%] fixed z-20 border-l-2 
    border-gray-600 gap-6  overflow-hidden`}>
        <Link to='/dashboard/my-profile'>
        <div className='flex p-2 gap-2 overflow-hidden'> 
        <img src={avatar} alt='avatar' className=' h-16 w-16 rounded-full' />
        <div className='gap-1 text-white flex translate-y-3 text-xl font-medium'>
        {localStorage.getItem("firstName").split('"')[1]} {' '}
        {localStorage.getItem("lastName").split('"')[1]}
        </div>
         </div>
        </Link>
        

        
        {/* <GiFlowerPot className=' text-[15rem] translate-x-2 mt-3 -translate-y-9'/> */}
        <div className='flex flex-col  gap-4 justify-center text-3xl break-words'>
            <a href='https://github.com/nikhilfullstack' className='text-white flex gap-2'><AiFillGithub/> Github</a>
            <a href='https://github.com/nikhilfullstack' className='text-white flex gap-2'><AiFillLinkedin/> LinkedIn</a>
            <a href='mailto:gup7nik@gmail.com' className='text-white flex gap-2'><SiGmail/>Gmail</a>
            <a href='https://www.codechef.com/users/coder_nik' className='text-white flex gap-2'><SiCodechef/> Codechef</a>

        </div>
        
    </div>
  )
}

export default Navbar2
