import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../services/operations/commentAPI';
import { setFirstName } from '../../slices/profileSlice';

import { getAllPost } from '../../services/operations/PostAPI';

function PostCard(props) {
  const { post, key } = props;
  const {firstName, lastName, image } = props;
  const [comment, setComment] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  // const [hour, setHour] = useState('');
  // const [minute, setMinute] = useState('');
  // const [commentNumber, setCommentNumber] = useState(post?.comments?.length)

  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Function to handle the "Enter" key press

  async function postComment(e) {
    console.log("createCommentToken", token);
    await dispatch(createComment({ postId: props.post._id, caption: comment }, token));
    await dispatch(getAllPost(token));
  }
  // async function postLike(e) {
  //   console.log("createLikeToken", token);
  //   await dispatch(likePost({ postId: props.post._id, userId: post?.userId?._id }, token));
  //   let l = Number(likes);
  //   setLikes(l + 1);
  //   // await dispatch(getAllPost(token));
  // }

  useEffect(() => {
    const dateObj = new Date(`${post?.createdAt}`);
    setDay(dateObj.getDate());
    setMonth(dateObj.getMonth());
    setYear(dateObj.getFullYear());
    // setHour(dateObj.getHours());
    // setMinute(dateObj.getMinutes());
    // setCommentNumber(post?.comments?.length);
  }, [loading])

  const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return (
    <div key={key} className='mt-2'>
      
      {loading ? (<></>) : (
        <div className="flex flex-col h-max w-[19rem] sm:w-[29rem] md:w-[35rem] lg:w-[40rem] xl:w-[44.5rem] justify-center " id={props.post._id}>
          {/* {console.log("main",props)} */}

          <article className="mb-4 break-inside p-6 rounded-xl  bg-white dark:bg-slate-800 flex flex-col bg-clip-border h-max">
            <div className="flex pb-6 items-center justify-between">
              <div className="flex">
                <a className="inline-block mr-4" href={`/profile/${post?.userId?._id}`}>
                  <img className="rounded-full max-w-none w-14 h-14" src={post?.userId?.image ?? image} />
                </a>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <a className="inline-block text-lg font-bold mr-2" href={`/profile/${post?.userId?._id}`}>{post?.userId?.firstName ?? firstName} {post?.userId?.lastName ?? lastName}</a>
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
            <h1 className="text-3xl font-extrabold py-2">
              Creative ArtWork
            </h1>
            <div className="py-4">
              <a className="flex" href={`/post/${post?._id}`}>
                {/* <img className="max-w-full rounded-lg"
                  src="https://images.pexels.com/photos/3682153/pexels-photo-3682153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" /> */}
                {post?.media.map((a, index) => {
                  return <div className="flex h-full w-full relative " key={index}>
                    
                    <img className="h-max w-[19rem] sm:w-[29rem] md:w-[35rem] lg:w-[40rem] xl:w-[47rem] rounded-lg bg-cover"
                      src={a = a.split('.')[3]=== 'avif' ? a.split('.')[0] + '.' + a.split('.')[1] + '.' + a.split('.')[2] + '.webp' : a } loading='lazy' alt='card-image' />
                  </div>
                })}
              </a>
            </div>
            <p>
              {post?.caption} <br />
              
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
                <span className="text-lg font-bold">{post?.comments?.length}
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
            {post?.comments?.length === 1 &&
              <div className="pt-6">

                {post?.comments?.map((A, index) => {
                  return <div className="media flex pb-4">
                    <a className="inline-block mr-4" href={`/profile/${post?.userId?._id}`}>
                      <img className="rounded-full max-w-none w-12 h-12" src={A?.userId?.image} alt='profilePhoto' />
                    </a>
                    <div className="media-body">
                      <div>
                        <a className="inline-block text-base font-bold mr-2" href={`/profile/${post?.userId?._id}`}>{A?.userId?.firstName} {A?.userId?.lastName}</a>
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
            {post?.comments?.length > 1 &&
              <div className="pt-6">

                {post?.comments.slice().reverse().slice(0, 2).map((A, index) => {
                  // setTime(A?.createdAt)

                  return <div className="media flex pb-4">
                    <a className="inline-block mr-4" href={`/profile/${post?.userId?._id}`}>
                      <img className="rounded-full max-w-none w-12 h-12" src={A?.userId?.image} alt='profilePhoto' />
                    </a>
                    <div className="media-body">
                      <div>
                        <a className="inline-block text-base font-bold mr-2" href={`/profile/${post?.userId?._id}`}>{A?.userId?.firstName} {A?.userId?.lastName}</a>
                        <span className="text-slate-500 dark:text-slate-300">
                          {/* {MONTH[month]} {day < 10 && 0}{day}, {year} */}
                          {Date.now()}
                        </span>
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
                {post?.comments?.length > 3 &&
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
      )
      }
    </div >

  )
}

export default PostCard


