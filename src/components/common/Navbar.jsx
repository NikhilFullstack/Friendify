
import { useState, useEffect } from "react"
import {  BsFillHeartFill } from "react-icons/bs"
import {  AiFillHome } from "react-icons/ai"
import { ImSearch } from "react-icons/im";
import { MdOutlineTravelExplore } from "react-icons/md"
import { IoAddCircleSharp } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import { BiUserCircle } from 'react-icons/bi'


import { useDispatch, useSelector } from "react-redux"


import { Link, useLocation, useNavigate } from "react-router-dom"

import { searchUser } from "../../services/operations/profileAPI"
import { logout } from "../../services/operations/authAPI"
import { setSearchData } from "../../slices/searchSlice";
import logo from '../../assets/logo/1f.png';
import { gsap, Power3 } from "gsap/gsap-core";
import { CSSPlugin } from "gsap";
import { useRef } from "react";

function Navbar(props) {
  const id = localStorage.getItem("id").split('"')[1];
  const { text } = props;
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const [data, setData] = useState({ "search": '', });
  

  function changeHandler(e) {
    setData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }))
  }
  function searchHandler(e) {
    e.preventDefault();
    async function seArch() {
      try {
        console.log("yaha aa gye");
        console.log(data, data.search);
        await dispatch(searchUser(data, token, navigate)).then(
          (res) => {
            console.log("Search in setSearch.!!!!......../", res);
            setSearch(res);
            dispatch(setSearchData(res.data.user))
            console.log("Search in setSearch........./", res.data.user);
          }
        )
      }
      catch (err) {
        console.log("searching error.....", err);
      }
    }
    seArch();

  }
  const { token } = useSelector((state) => state.auth);

  var logoitem = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(CSSPlugin);
    gsap.to(logoitem, { x: -25, duration: 2, ease: Power3.easeInOut, repeat:-1, delay:.5, yoyo:true});
  }, []); // Empty dependency array to trigger the animation once after mounting
  
 

  return (
    <div
      className={`${text === 'white' ? "text-white" : ''} hidden justi xl:flex xl:flex-col h-fit pl-8 py-5 w-fit md:w-72 fixed z-20 lg:border-r-2 xl:border-gray-600 gap-6`}
    >
      <>
        <Link to='/'>
          <div className={`fontLogo h-[4rem] text-5xl hover:font-bold shadow-xl text-white`}>Friendify</div>
        </Link>
      </>
      {/* Friendify logo done */}
      <>
        <Link to='/'>
          <div className={`mt-5 flex gap-3 mb-1 text-white text-2xl`}><AiFillHome className="text-2xl" /> Home</div>
        </Link>
      </>

      <>
        <Link to='#'>
          <div className={`flex text-base gap-3 mb-1 text-white`} onClick={ () => setShowSearch(!showSearch)
          }><ImSearch className="text-2xl" /> Search</div>
        </Link>
      </>
      {showSearch ? (

        <form onSubmit={searchHandler}>
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..Search" onChange={changeHandler} required name="search" />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>

      ) : ''}
      <>
        <Link to='/'>
          <div className={`flex text-base gap-3 mb-1 text-white`}><MdOutlineTravelExplore className="text-2xl" /> Explore</div>
        </Link>
      </>

      <>
        <Link to='/'>
          <div className={`flex text-base gap-3 mb-1 text-white`}><IoAddCircleSharp className="text-2xl" /> Create</div>
        </Link>
      </>

      <>
        <Link to='/'>
          <div className={`flex text-base gap-3 mb-1 text-white`}><BsFillHeartFill className="text-2xl" /> Like</div>
        </Link>
      </>

      <>
        <Link to={`/profile/${id}`}>
          <div className={`flex text-base gap-3 mb-1 text-white`}><BiUserCircle className="text-2xl" />Profile { }</div>
        </Link>
      </>

      <>
          
            <div className={`cursor-pointer font-semibold hover:font-bold text-white flex gap-3 text-lg`} 
              onClick={async () => {
                await dispatch(logout(navigate));
              }}><FiLogOut className="translate-y-1 hover:scale-105" /> Logout</div>

      </>

      <>
              <div className="">
                <img 
                ref={el=>{logoitem=el}}
                alt="logo"
                src={logo} className="mediaLogo " />
              </div>
      </>

    
    </div>
  )
}

export default Navbar