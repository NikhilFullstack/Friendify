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
import SetDate from './SetDate'
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
                        post?.post.slice().reverse().map((poost) => {
                            return <div className="flex flex-col h-max w-full sm:w-[35rem] md:w-[25rem] lg:w-[35rem] xl:w-[45rem] justify-center " id={poost._id} key={poost._id} >
                                <article className="mb-4 break-inside p-6 rounded-xl  bg-white dark:bg-slate-800 flex flex-col bg-clip-border h-max">
                                    <div className="flex pb-6 items-center justify-between">
                                        <SetDate fxn={setDate} dte={poost.createdAt} />
                                        <div className="flex">
                                            <a className="inline-block mr-4" href='#'>
                                                <img className="rounded-full max-w-none w-14 h-14" src={post?.image} />
                                            </a>
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <a className="inline-block text-lg font-bold mr-2" href='#'>{post?.firstName} {post?.lastName}</a>
                                                    <span>
                                                        <svg className="fill-blue-500 dark:fill-slate-50 w-5 h-5" viewBox="0 0 24 24">
                                                            <path
                                                                d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="text-slate-500 dark:text-slate-300">
                                                    {/* January 22, 2021     {hour<10 && 0}{hour>12?hour-12:hour} : {minute<10 && 0}{minute} {hour>12? "PM" : "AM"} - */}
                                                    {MONTH[month]} {day < 10 && 0}{day}, {year}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="text-xl md:text-3xl font-extrabold py-2">
                                        Creative ArtWork
                                    </h1>
                                    <div className="py-4">
                                        <a className="flex" href={`/post/${poost?._id}`}>
                                            {/* <img className="max-w-full rounded-lg"
                        src="https://images.pexels.com/photos/3682153/pexels-photo-3682153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" /> */}
                                            {poost?.media.map((a, index) => {
                                                return <div className="flex h-full w-full relative " key={index}>
                                                    <img className="h-max w-[19rem] sm:w-[29rem] md:w-[39rem] lg:[49rem] xl:w-[64rem] rounded-lg bg-cover"
                                                        src={a} loading='lazy' alt='card-image' />
                                                </div>
                                            })}
                                        </a>
                                    </div>
                                    <p>
                                        {poost?.caption} <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <div className="py-4">
                                        <a className="inline-flex items-center" href="#">
                                            <span className="mr-2">
                                                <svg className="fill-rose-600 dark:fill-rose-400" viewBox="0 0 24 24">
                                                    <path
                                                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                                                    </path>
                                                </svg>
                                            </span>
                                            <span className="text-lg font-bold">{poost?.comments?.length}
                                            </span>
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <input
                                            className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
                                            type="text"
                                            placeholder="Write a comment"
                                            value={comment}
                                            onKeyDown={e => {
                                                e.key === 'Enter' ?
                                                    postComment() && setComment('') : setComment(e.target.value)
                                            }}
                                            onChange={(event) =>
                                                setComment(event.target.value)} />
                                        <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
                                            <svg className="mr-2" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
                                                </path>
                                            </svg>
                                            <svg className="fill-blue-500 dark:fill-slate-50" viewBox="0 0 24 24">
                                                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    {/* Comment      ------------------   -------------------- ---- */}
                                    {poost?.comments?.length === 1 &&
                                        <div className="pt-6">

                                            {poost?.comments?.map((A, index) => {
                                                return <div className="media flex pb-4">
                                                    <a className="inline-block mr-4" href={`/profile/${A?.userId}`}>
                                                        <img className="rounded-full max-w-none w-12 h-12" src={A?.userId?.image} alt='profilePhoto' />
                                                    </a>
                                                    <div className="media-body">
                                                        <div>
                                                            <a className="inline-block text-base font-bold mr-2" href={`/profile/${poost?.userId?._id}`}>{A?.userId?.firstName} {A?.userId?.lastName}</a>
                                                            {/* <span className="text-slate-500 dark:text-slate-300">3 minutes ago</span> */}
                                                        </div>
                                                        <p>{A?.caption} </p>
                                                        <div className="mt-2 flex items-center">
                                                            <a className="inline-flex items-center py-2 mr-3" href="#">
                                                                <span className="mr-2">
                                                                    <svg className="fill-rose-600 dark:fill-rose-400"
                                                                        viewBox="0 0 24 24">
                                                                        <path
                                                                            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                <span className="text-base font-bold">{A?.reply?.length}</span>
                                                            </a>
                                                            <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                                                                Repply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}



                                        </div>
                                    }
                                    {poost?.comments?.length > 1 &&
                                        <div className="pt-6">

                                            {poost?.comments.slice().reverse().slice(0, 2).map((A, index) => {
                                                // setTime(A?.createdAt)

                                                return <div className="media flex pb-4">
                                                    <a className="inline-block mr-4" href={`/profile/${poost?.userId?._id}`}>
                                                        <img className="rounded-full max-w-none w-12 h-12" src={A?.userId?.image} alt='profilePhoto' />
                                                    </a>
                                                    <div className="media-body">
                                                        <div>
                                                            <a className="inline-block text-base font-bold mr-2" href={`/profile/${poost?.userId?._id}`}>{A?.userId?.firstName} {A?.userId?.lastName}</a>
                                                            {/* <span className="text-slate-500 dark:text-slate-300">
                                                                {/* {MONTH[month]} {day < 10 && 0}{day}, {year} */}
                                                                {/* {Date.now()} */}
                                                            {/* </span> */} 
                                                        </div>
                                                        <p>{A?.caption} </p>
                                                        <div className="mt-2 flex items-center">
                                                            <a className="inline-flex items-center py-2 mr-3" href="#">
                                                                <span className="mr-2">
                                                                    <svg className="fill-rose-600 dark:fill-rose-400"
                                                                        viewBox="0 0 24 24">
                                                                        <path
                                                                            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                <span className="text-base font-bold">{A?.reply?.length}</span>
                                                            </a>
                                                            <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                                                                Repply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                            {poost?.comments?.length > 3 &&
                                                <div className="w-full">
                                                    <a href="#"
                                                        className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
                                                        more comments</a>
                                                </div>}
                                         
                                            <div className="w-full">
                                                <a href="#"
                                                    className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
                                                    more comments</a>
                                            </div>

                                        </div>
                                    }


                                </article>

                            </div >
                        })

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
