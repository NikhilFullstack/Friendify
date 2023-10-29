import React from 'react'
import friendifyLogo from '../../assets/logo/Friendify-media-logo.jpg'
import { NavLink } from 'react-router-dom'
import { BiArrowFromLeft } from 'react-icons/bi'
import '../../App.css'
function HomePage() {
  return (
    <div className='h-screen w-screen bg-black text-white'>
      {/* Friendify is a <br/> combined efforts with<br/> friends to create<br/> replica of social media app */}
      <table className='h-screen w-screen  '>
        <tbody className='min-h-screen w-screen  '>
          <tr className='hidden md:inline-table md:w-screen md:h-1/3'>
            <td colSpan={2} className='w-1/3 h-full pl-[10%]'>
            <img className="rounded-full opacity-80 " alt="hero" src={friendifyLogo} />
            </td>
            <td rowSpan={2} colSpan={2} className='pl-[10%] justify-center gap-8 h-max flex flex-col text-lg'>
              <h1 className='text-3xl border-b-2 border-gray-100 border-dashed p-4'>
                <span className='animate-bounce'>F</span>
                <span className='animate-pulse'>r</span>
                <span className='animate-pulse'>i</span>
                <span className='animate-pulse'>e</span>
                <span className='animate-pulse'>n</span>
                <span className='animate-pulse'>d</span>
                <span className='animate-pulse'>i</span>
                <span className='animate-pulse'>f</span>
                <span className='animate-pulse'>y</span>
              </h1>
              <br/>
              <h2 className='p-2'>Friendify is a work to</h2>
              <h2 className='p-2'>enhance my understanding </h2>
              <h2 className='p-2'>to development journey. </h2>
              <h2 className='p-2'>Your honest feedback</h2>
              <h2 className='p-2'>is needed....</h2>
              <br/>
              
              <NavLink to={'/signup'}>
              <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-xl gap-4 hover:font-semibold min-w-fit"><span>Get Started </span> 
              <span className='flex translate-y-1 justify-center hover:delay-100 animate-pulse text-2xl'><BiArrowFromLeft/></span></button>
              </NavLink>
              <NavLink to={'/login'}>
              <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-xl gap-4 hover:font-semibold min-w-fit"><span>Already User </span> 
              <span className='flex translate-y-1 justify-center hover:delay-100 animate-pulse text-2xl'><BiArrowFromLeft/></span></button>
              </NavLink>
            </td>
          </tr>
          <tr className='md:hidden w-screen h-1/3'>
          <td rowSpan={2} colSpan={2} className='pl-[10%] justify-center gap-8 h-max flex flex-col text-lg'>
              <h1 className='text-3xl border-b-2 border-gray-100 border-dashed p-4'>
                <span className='animate-bounce'>F</span>
                <span className='animate-pulse'>r</span>
                <span className='animate-pulse'>i</span>
                <span className='animate-pulse'>e</span>
                <span className='animate-pulse'>n</span>
                <span className='animate-pulse'>d</span>
                <span className='animate-pulse'>i</span>
                <span className='animate-pulse'>f</span>
                <span className='animate-pulse'>y</span>
              </h1>
              <br/>
              <h2 className='p-2'>Friendify is a work to</h2>
              <h2 className='p-2'>enhance my understanding </h2>
              <h2 className='p-2'>to development journey. </h2>
              <h2 className='p-2'>Your honest feedback</h2>
              <h2 className='p-2'>is needed....</h2>
              <br/>
              
              <NavLink to={'/signup'}>
              <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-xl gap-4 hover:font-semibold min-w-fit"><span>Get Started </span> 
              <span className='flex translate-y-1 justify-center hover:delay-100 animate-pulse text-2xl'><BiArrowFromLeft/></span></button>
              </NavLink>
              <NavLink to={'/login'}>
              <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-xl gap-4 hover:font-semibold min-w-fit"><span>Already User </span> 
              <span className='flex translate-y-1 justify-center hover:delay-100 animate-pulse text-2xl'><BiArrowFromLeft/></span></button>
              </NavLink>
            </td>
          </tr>
          <tr className='w-screen h-1/3 '>
            
          </tr>
          <tr className='w-screen h-1/3'>
            
            <td className=' h-full text-xl font-mono'>
              <h1 className='text-3xl border-b-2 border-gray-100 border-dashed p-2 animate-pulse'>From Developer Desk:</h1>
              <br/>
              <h2 className='p-2'>Keep exploring my projects</h2>
              <h2 className='p-2'>for more visit my Github Page..</h2>
              <h2 className='p-2'> Github.com/Nikhilfullstack</h2>
            </td>
            <td className='text-xl font-mono hidden md:block'>
              <br/><br/>
              <h2 className='p-2'>For any suggestions or query Email me:</h2>
              <h2 className='p-2'>nikhilguptanitj@gmail.com</h2>
            </td>
            <td className='w-1/3 h-full '></td>
          </tr>
          <tr className='w-screen h-max md:hidden'>
            <td className='text-xl font-mono md:hidden'>
              <br/><br/>
              <h2 className='p-2'>For any suggestions or query Email me:</h2>
              <h2 className='p-2'>nikhilguptanitj@gmail.com</h2>
            </td>
          </tr>
        </tbody>
        
      </table>
      <footer class="relative bg-blueGray-200 pt-8 pb-6 w-screen">



  <div class="h-max  px-4">
    <div class="flex flex-wrap text-left lg:text-left">
      <div class="w-full lg:w-6/12 px-4">
        <h4 class="text-3xl fonat-semibold text-blueGray-700 p-2">Let's keep in touch!</h4>
        <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
          Find us on any of these platforms, we respond 1-2 business days.
        </h5>
        <div class="mt-6 lg:mb-0 mb-6">
          <button class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i class="fab fa-twitter"></i></button><button class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i class="fab fa-facebook-square"></i></button><button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i class="fab fa-dribbble"></i></button><button class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </div>
      <div className="w-full lg:w-6/12 px-4">
        <div className="flex flex-wrap items-top mb-6">
          <div className="w-full lg:w-4/12 px-4 ml-auto">
            <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
            <ul className="list-unstyled">
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">About Us</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Blog</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Github</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Free Products</a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
            <ul className="list-unstyled">
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">MIT License</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Privacy Policy</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr className="my-6 border-blueGray-300" />
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1 gap-1">
          Copyright © <span id="get-current-year">2021</span>
          <a href="https://portfolio-nikhil-fullstack.vercel.app/" className="text-blueGray-500 hover:text-gray-800"> Nikhil_Gupta_Nitj_</a>
          <a href="https://portfolio-nikhil-fullstack.vercel.app/" className="text-blueGray-500 hover:text-blueGray-800 animate-pulse">Here</a>.
        </div>
      </div>
    </div>
  </div>

        </footer>
  
    </div>
  )
}

export default HomePage
{/* <div className="">
    <div className="">
      <img className="rounded-full opacity-80" alt="hero" src={friendifyLogo} />
    </div>
    <div className="">

      <h1 className=" text-8xl absolute pr-[5%] pt-[15%] right-[10%] text-white shadow-lg blur-sm">
      Friendify
      </h1>
      <div className="flex flex-col gap-4 w-[23rem] justify-center">
        <NavLink to={'/signup'}>
        <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-lg gap-4 hover:font-semibold min-w-fit"><span>Get Started</span> 
        <span className='flex translate-y-1 justify-center hover:delay-100]'><BiArrowFromLeft/></span></button>
        {/* <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
  //       </NavLink>
  //       <NavLink to={'/login'}>
  //       <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-lg gap-4 hover:font-semibold min-w-fit"><span>Already User -> </span> 
  //       <span className='flex translate-y-1 justify-center hover:delay-100]'><BiArrowFromLeft/></span></button>
  //       {/* <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
  //       </NavLink>
  //     </div>
  //   </div>
  // </div> */}