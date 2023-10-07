import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment,updateComment } from '../../services/operations/commentAPI';


import { getAllPost, likePost } from '../../services/operations/PostAPI';
import {FaCommentAlt} from 'react-icons/fa'

import CommentTemp from './commentTemplate/CommentTemp';
import { toast } from 'react-hot-toast';




function PostCard(props) {
    const {post, key} = props;
    const [comment,setComment]=useState('');
    const [showComment, setShowComment] = useState(false);
    const[day,setDay]=useState('');
    const[month,setMonth]=useState('');
    const[year,setYear]=useState('');
    const[hour,setHour]=useState('');
    const[minute,setMinute]=useState('');
    const [commentNumber,setCommentNumber] = useState(post?.comments?.length)

    const { token,loading } = useSelector((state) => state.auth);
    const [likes,setLikes] = useState(post?.like?.length);
    const dispatch=useDispatch();
    function setcom(event){
      setComment(event.target.value);
    }
    const handleKeypress = e => {
      //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      postComment();
    }
  };
    // Function to handle the "Enter" key press
    
    async function postComment(e){
      console.log("createCommentToken",token);
      await dispatch(createComment({postId:props.post._id,caption:comment},token));
      await dispatch(getAllPost(token));
    }
    async function postLike(e){
      console.log("createLikeToken",token);
      await dispatch(likePost({postId:props.post._id,userId:post?.userId?._id},token));
      let l=Number(likes);
      setLikes(l+1);
      // await dispatch(getAllPost(token));
    }
    var a1=1;
    useEffect(()=>{
      const dateObj = new Date(`${post?.createdAt}`);
      setDay(dateObj.getDate());
      setMonth(dateObj.getMonth());
      setYear(dateObj.getFullYear());
      setHour(dateObj.getHours());
      setMinute(dateObj.getMinutes());
      setCommentNumber(post?.comments?.length);
    },[loading])
    const myStyle = {
      color: 'yellow',
      fontSize: '16px',
      backgroundColor: 'lightgray',
      padding: '10px',
      borderRadius: '5px',
    };
  return (
    <div key={key}>
      { loading ? (<></>):(
        <div className="flex flex-col h-max w-max justify-center " id={props.post._id}>

<article className=" break-inside-auto border-2 w-min border-purple-600 rounded-xl bg-transparent flex flex-col bg-clip-border p-4 my-4">
  <div className="flex items-center justify-between">
    <div className="flex">
      <a className="inline-block mr-4" href={`/profile/${post?.userId?._id}`}>
        <img className="rounded-full max-w-none w-12 h-12" src={post?.userId?.image} />
      </a>
      <div className="flex flex-col">
        <div className='text-yellow-400 flex gap-10'>
          <a className="inline-block text-lg font-bold text-yellow-400" style={myStyle} href={`/profile/${post?.userId?._id}`}>{post?.userId?.firstName} {post?.userId?.lastName}
          </a>
          <div className="text-slate-100 hidden xl:block  text-sm ">
          {hour<10 && 0}{hour>12?hour-12:hour} : {minute<10 && 0}{minute} {hour>12? "PM" : "AM"}   {day<10 && 0}{day}-{month<10 && 0}{month}-{year}
        </div>
        </div>
        <div className="text-slate-100 text-sm xl:hidden ">
          {hour<10 && 0}{hour>12?hour-12:hour} : {minute<10 && 0}{minute} {hour>12? "PM" : "AM"}   {day<10 && 0}{day}-{month<10 && 0}{month}-{year}
        </div>
      </div>
    </div>
  </div>
  
  
    <div className="flex justify-between gap-1 mb-1 h-[53vh] w-[79vw] lg:h-[30rem] lg:w-[40rem]">
    {post?.media.map((a,index)=>{
                 return <div className="flex h-full w-full relative "  key={index}>
                 <img className="inherit rounded-xl object-fill absolute"
                   src={a} loading='lazy'  />
               </div>
              })}
      
    </div>
    
  <p className="text-slate-200 font-semibold ">
    {post?.caption}
  </p>
  <div className="py-4 flex gap-6">
    <button className="inline-flex items-center" onClick={postLike}>
      <span className="mr-2">
        <svg className="fill-rose-600 dark:fill-rose-400 w-[24px] h-[24px]"  viewBox="0 0 24 24">
          <path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
          </path>
        </svg>
      </span>
      <span className="text-lg font-bold text-gray-300">{likes}</span>
    </button>
    <div className='text-xl font-bold cursor-pointer flex gap-1 text-gray-300' onClick={()=>showComment ? setShowComment(false) : setShowComment(true)}>
      <FaCommentAlt className='translate-y-1  text-white'/> {post?.comments?.length}
    </div>
    
  </div>
  {showComment? (
    <div className="pt-6 flex flex-col-reverse">
    {/* <!-- Comment row --> */}
    {post?.comments.map((A,index)=>{

      return <CommentTemp A={A} key={index} />
    })}
  </div>
  ):(<></>)}
  {showComment?(<button className={`${post?.comments?.length ==0 ? 
  'bg-red-400 text-red-700 hover:bg-orange-300' :
  'bg-amber-300 hover:text-amber-500 hover:bg-green-300'}
   w-fit rounded-lg mx-auto mb-2   text-green-500 text-xl p-2 border-2 border-green-600`}
    onClick={()=>setShowComment(false)}>{post?.comments?.length == 0 ?('No Comments'):('Hide Comment')}</button>):(
    <></>
  )}
  <div className="relative">
    <input
      className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-300 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
      
      type="text" placeholder="Write a comment" value={comment}
      onKeyDown={e => {
        e.key=== 'Enter' ? postComment() && setComment('') :setComment(e.target.value)                } } onChange={(event)=>setComment(event.target.value)}>
        
      </input>
      
      <button onClick={()=>postComment() && setComment('')} className='className="flex absolute right-3 top-2/4 -mt-3 items-center"'>
      <svg className="fill-blue-500 dark:fill-slate-50 w-[24px] h-[24px]"  viewBox="0 0 24 24" >
        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
      </svg>
      </button>
      
  </div>
  {/* <!-- Comments content --> */}
  
</article>
</div>
      )}
    </div>
    
  )
}

export default PostCard


