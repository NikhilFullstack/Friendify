import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import Home from '../profile/FeedPage/Home'
import logo from '../../assets/logo/F.png'
import { authz, logout } from '../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchData } from '../../slices/searchSlice';
import { searchUser } from '../../services/operations/profileAPI';
function DefaultPage() {
  const [flag, setFlag] = useState(false);
  const id = localStorage.getItem("id") != null ? localStorage.getItem("id").split('"')[1] : '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch,setShowSearch] = useState(false);
  const [data, setData] = useState({ "search": '', });
  const [search, setSearch] = useState(null);
  const { token } = useSelector((state) => state.auth)
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
  useEffect(()=> {
    async function homePage(){
      try {
        console.log("token:", token);
        await dispatch(authz(token, navigate)).then((res) => {
          console.log("rees", res, "resposne has been recived");

        });

      }
      catch (err) {
        console.log("error in Authz", err, err.message);
        dispatch(logout(navigate))
      }
    }
    homePage();
  },[]);
  
  return (
    <div>
      {
        token ? (

          <div className='h-full w-full flex flex-col'>

            <nav className="bg-white h-fit border-gray-200   w-full xl:hidden fixed z-30">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center">
                  <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Friendify</span>
                </a>
                <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 " aria-controls="navbar-default" aria-expanded="false" onClick={() => setFlag(!flag)}>
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
                </button>
                {flag ? (
                  <div className=" w-full xl:block xl:w-auto text-white" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 xl:p-0 mt-4 border  rounded-lg  xl:flex-row xl:space-x-8 xl:mt-0 xl:border-0 bg-gray-800 xl:bg-gray-900 border-gray-700">
                      <li>
                        <a href="/" className="block py-2 pl-3 pr-4  bg-blue-700 rounded xl:bg-transparent xl:p-0 text-white xl:text-blue-500" aria-current="page">Home</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 pl-3 pr-4 rounded  xl:hover:bg-transparent xl:border-0  xl:p-0 text-white  hover:bg-gray-700 hover:text-white " onClick={()=>setShowSearch(!showSearch)}>Search</a>
                      </li>
                      {showSearch ? (

                        <form onSubmit={searchHandler}>
                          <label for="default-search" className="mb-2 text-sm font-medium  sr-only text-white">Search</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg className="w-4 h-4  text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                              </svg>
                            </div>
                            <input type="search" onChange={changeHandler} id="default-search" className="block w-full p-4 pl-10 text-sm  border border-gray-300 rounded-lg  focus:ring-blue-500  bg-gray-700  placeholder-gray-400 text-white   focus:border-blue-500" placeholder="..Search" required />
                            <button type="submit" className=" absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2  focus:ring-blue-800 text-white">Search</button>
                          </div>
                        </form>

                      ) : ''}
                      <li>
                        <a href="#" className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100  xl:border-0  xl:p-0 text-white xl:hover:text-blue-500  hover:text-white xl:hover:bg-transparent">Explore</a>
                      </li>
                      <li>
                        <a href="/" className="block py-2 pl-3 pr-4  rounded text-white   hover:text-white ">Create</a>
                      </li>
                      <li>
                        <a href={`/profile/${id}`} className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 text-white   hover:text-white ">Profile</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 pl-3 pr-4  rounded  xl:border-0 xl:hover:text-blue-700 xl:p-0 text-white  hover:bg-gray-700 hover:text-white xl:hover:bg-transparent"
                          onClick={async () => {
                            await dispatch(logout(navigate));
                          }}
                        >Logout</a>
                      </li>
                    </ul>
                  </div>
                ) : ''}

              </div>
            </nav>
            <Home />
          </div>
        ) :
          (
            <HomePage />
          )
      }
    </div>
  )
}

export default DefaultPage
