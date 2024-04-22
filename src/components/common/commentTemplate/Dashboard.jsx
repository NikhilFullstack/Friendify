import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/logo/F.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiFillHome, AiFillBell, AiOutlineAppstoreAdd } from 'react-icons/ai'
import { FaPeopleLine, FaQuora } from 'react-icons/fa6'
import { FcGoogle, FcStatistics } from 'react-icons/fc'
import { BsFillBookmarkCheckFill, BsInstagram, BsShareFill } from 'react-icons/bs'
import { SiVlcmediaplayer, SiYoutubegaming } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../../services/operations/profileAPI'
import { createComment } from '../../../services/operations/commentAPI'
import PostCard from '../PostCard'
// import SetDate from './SetDate'
function Dashboard() {
    const { id } = useParams() || localStorage.getItem("id").split('"')[1];
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                // console.log("token:", token);

                // const Id = localStorage.getItem("id").split('"')[1];
                // console.log("ProfilePg", Id)
                // const id = { "id": Id };
                if (!id) {
                    const Id = localStorage.getItem("id").split('"')[1];
                    dispatch(getUserDetails(token, Id, navigate)).then((res) => {
                        console.log("ros", res, "reweer");
                        setPost(res.data.post)

                    });
                }
                else {
                    dispatch(getUserDetails(token, id, navigate)).then((res) => {
                        console.log("ros", res.data.post, "reweer");
                        setPost(res.data.post)

                    });
                }

            }
            catch (err) {
                console.log("error in fetching user details", err, err.message);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        const dateObj = new Date(`${post?.createdAt}`);
        setDay(dateObj.getDate());
        setMonth(dateObj.getMonth());
        setYear(dateObj.getFullYear());
        // setHour(dateObj.getHours());
        // setMinute(dateObj.getMinutes());
        // setCommentNumber(post?.comments?.length);
    }, [date])

    async function postComment(e) {
        console.log("createCommentToken", token);
        await dispatch(createComment({ postId: post._id, caption: comment }, token));
        await dispatch(getUserDetails(token, id, navigate));
    }

    const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



    return (
        <div class='text-black bg-blue-50 '>
            <header class="p-3 text-blue-500 bg-white flex justify-around items-center border-b-2 shadow-md sticky">
                <a className='flex py-2' href='/'>
                    <img src={Logo} alt='logo' className='h-8' />
                    <h1 class="text-lg text-blue-500">Friendify</h1>
                </a>
                <div alt='Icons' className='flex space-x-4 md:space-x-8 items-baseline md:text-3xl'>
                    <Link to={'/'}> <AiFillHome /> </Link>
                    <button> <FaPeopleLine /></button>
                    <button> <AiFillBell /> </button>
                </div>
                <div class="flex space-x-4">
                    <input type="text" placeholder="Search..." class="bg-gray-300 p-1 px-2 rounded-md border border-gray-300 text-gray-800" />



                    {/* <!-- Add icons for notifications, messages, and settings here --> */}
                </div>
            </header>

            <main class="flex p-5">
                {/* <!-- Sidebar --> */}
                <div class="w-1/5 space-y-2 hidden md:block">
                    <div className='space-x-2 h-max flex border-spacing-1 border-x-2 border-t-2 rounded-sm shadow-md pl-2 py-3'>
                        <img src={Logo} alt='image' className='rounded-r-full h-12' />
                        <h1 className=' '>{post? (`${post.firstName} ${post.lastName}`):(<></>)}</h1>
                    </div>
                    <div className='h-max space-y-2 flex flex-col space-x-2 border-2  rounded-sm shadow-md pl-2 py-3'>
                        <div className='cursor-pointer delay-200 space-x-2 flex justify-center items-baseline gap-2'><FcGoogle />Google Search</div>
                        <div className='cursor-pointer delay-200 space-x-2 flex justify-center items-baseline gap-2'><FaQuora />Quora</div>
                        <div className='cursor-pointer delay-200 space-x-2 flex items-baseline justify-center gap-2'><BsInstagram />Instagram</div>
                        <div className='cursor-pointer delay-200 space-x-2 justify-center flex items-baseline gap-2'><AiOutlineAppstoreAdd />Add new page</div>
                    </div>
                    <div className='h-max space-y-2 flex flex-col space-x-2 border-2  rounded-sm shadow-md pl-2 py-3'>
                        <div className='cursor-pointer delay-200 space-x-2 flex justify-center items-baseline gap-2'><SiVlcmediaplayer />Learning</div>
                        <div className='cursor-pointer delay-200 space-x-2 flex justify-center items-baseline gap-2'><FcStatistics />Statistics</div>
                        <div className='cursor-pointer delay-200 space-x-2 justify-center flex items-baseline gap-2'><BsFillBookmarkCheckFill />Bookmark</div>
                        <div className='cursor-pointer delay-200 space-x-2 flex justify-center items-baseline gap-2'><SiYoutubegaming />Gaming</div>
                        <div className='cursor-pointer delay-200 space-x-2 flex items-baseline justify-center gap-2'><BsShareFill />Share</div>
                    </div>
                    {/* <!-- Add more options here --> */}
                </div>

                {/* <!-- Main content --> */}
                <div class="md:w-3/5 space-y-4 mx-auto">
                    {post ? (
                        // props.post._id
                        
                            post?.post.slice().reverse().map((post1,index) => {
                                return <PostCard post={post1} firstName={post.firstName} lastName={post.lastName} image={post.image} key={index} />
                            }
                        )

                    ) : (<></>)}
                </div>

                {/* <!-- Right sidebar --> */}
                <div class="w-1/5 space-y-2 hidden md:block">
                    <div className='h-max space-y-2 flex flex-col space-x-2 border-2  rounded-sm shadow-md pl-2 py-3'>

                        <h2 class="text-lg">People you may know</h2>
                        {/* <!-- Add people here --> */}
                        <div>Person 1</div>
                        <div>Person 2</div>
                    </div>



                </div>
            </main>

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

export default Dashboard
