import React from 'react'
import friendifyLogo from '../../assets/logo/Friendify-media-logo.jpg'
import { homeData } from '../../data/phase1st/homeData'
import { NavLink } from 'react-router-dom'
import { BiArrowFromLeft } from 'react-icons/bi'
import diseny from '../../assets/Mickey/3.png'
import diseny1 from '../../assets/Mickey/mob1.jpg'
function HomePage() {
  return (
    <div className='flex flex-col relative min-h-screen w-screen z-0 overflow-y-hidden'>
      <div className='  hidden lg:flex absolute rotate-45 h-full bg-green-500  w-[150%]  '></div>
      <div className='hidden lg:flex absolute rotate-45 h-[157%] bg-emerald-500  w-[100%] 
      translate-x-[-10rem] '></div>
      <div className='hidden lg:flex absolute rotate-45 h-[157%] homepage w-[100%] translate-x-[-20rem] '></div>
      <img src={diseny} alt="My WebP Image" className='max-h-[20rem] bottom-0 hidden lg:block z-10 absolute right-20' />
      <img src={diseny1} alt="My WebP Image" className='opacity-90 h-screen fixed w-full lg:hidden bg-contain bg-no-repeat z-10 ' />
  <div className="container flex md:flex-row flex-col z-20 items-center text-purple-400 font-semibold lg:text-orange-800">
    <div className="max-h-fit w-[17rem] translate-x-8 hidden lg:flex">
      <img className="rounded-full opacity-80" alt="hero" src={friendifyLogo} />
    </div>
    <div className=" max-w-fit h-full  lg:pl-24 md:pl-16 flex flex-col md:items-startmd:text-left text-center">
      <h1 className="md:text-4xl text-2xl font-semibold h-fit w-fit p-2 px-4 lg:px-2 mb-4 lg:mb-0">
        {homeData[0].title} 
      </h1>
      <p className=" leading-relaxed hidden text-gray-200 md:inline-block overflow-hidden">{homeData[0].description}</p>
      <div className="flex flex-col gap-4 w-[23rem] justify-center">
        <NavLink to={'/signup'}>
        <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-lg gap-4 hover:font-semibold min-w-fit"><span>Sign Up</span> 
        <span className='flex translate-y-1 justify-center hover:delay-100]'><BiArrowFromLeft/></span></button>
        {/* <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
        </NavLink>
        <NavLink to={'/login'}>
        <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-lg gap-4 hover:font-semibold min-w-fit"><span>Login</span> 
        <span className='flex translate-y-1 justify-center hover:delay-100]'><BiArrowFromLeft/></span></button>
        {/* <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
        </NavLink>
      </div>
    </div>
  </div>
    </div>
  )
}

export default HomePage
