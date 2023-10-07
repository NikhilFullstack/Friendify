import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from "../../../services/operations/profileAPI"
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../assets/css/profilepage.css'
import { LoaderIcon, toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button'
import { AiFillSetting } from 'react-icons/ai';
import wall from '../../../assets/logo/back1.jpg'
import { IoArrowBackCircle } from 'react-icons/io5'
import { FaCommentAlt } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import {GiConfirmed } from'react-icons/gi';

function ProfileDashboard() {
  const { token, signupData } = useSelector((state) => state.auth)
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Length, setLength] = useState(null);
  const [data, setData] = useState(null);
  const [dp, setDp] = useState(null);
  const [Showdp, setShowDp] = useState(null);
  const [ImageFile, setImageFile] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {

        if (!id) {
          const Id = localStorage.getItem("id").split('"')[1];
          dispatch(getUserDetails(token, Id)).then((res) => {
            console.log("ros", res, "reweer");
            setData(res.data.post)
            setLength(res.data.post.post.length);
          });
        }
        else {
          dispatch(getUserDetails(token, id)).then((res) => {
            console.log("ros", res, "reweer");
            setData(res.data.post)
            setLength(res.data.post.post.length);
          });
        }

      }
      catch (err) {
        console.log("error in fetching user details", err, err.message);
      }
    }
    fetchData();
  }, [])
  const imageHandler = async (e) => {
    const file = e.target.files[0];


    console.log("Yaaa haan aa gya..");
    // console.log("tada.....",base64File);
  };
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange =async (event) => {
    const imageFile = event.target.files[0];
    setImageFile(imageFile);
    const toBase64 = (imageFile) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(imageFile);
    setDp(base64File);
    setShowDp(base64File);
    // Handle the selected image file as needed
  };
 function changeDp(){
  const a1 = async ()=>{
    try{
      const formData = new FormData();
      formData.append("displayPicture",ImageFile);
    //   const result = updateProfilePicture(formData, token);
    //   if (result) {
    //     console.log("Profile Picture Updated........", result);
    // }
    const toastId = toast.loading("Loading...");
    const response = await fetch(`https://friendify-x10t.onrender.com/api/v1/profile/updateProfilePicture`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const profileData = await response.json();
    console.log(profileData);
    toast.dismiss(toastId);
    if(profileData.success){
      toast.success("Profile Picture Updated Successfully");
      setShowDp(null);
    }
    }
    catch(err){
      console.log("Error in changing profile picture...",err);
      toast.error(err.error);
    }
  }
    a1();
  }
  return (
    <div className=''>
      <Link to='/' type="button" class="fixed z-30 top-1 left-1 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex gap-1 lg:gap-4"><IoArrowBackCircle /> Back</Link>

      {data ? (
        <div className='h-max w-screen'>
          <img src={wall} alt='back' className='bg-contain h-screen w-screen fixed -z-20' />
          <section id="profile">
            {data ?
              <div className="container px-8 lg:px-40 flex">
                <div className="row flex flex-col">
                  <div className={`col-md-3 flex justify-center content-center relative w-[50%]`}>
                    <div className="grey h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem] lg:h-[5rem] lg:w-[5rem] xl:h-[6rem]  xl:w-[6rem]">
                      <img src={`${dp ? dp : data.image}`} className='h-full w-full bg-auto bg-no-repeat'></img>
                    </div>
                    
                    <div id='dp' className='text-white text-2xl min-w-[15%] h-40 items-center flex ml-2 cursor-pointer' onClick={handleImageClick}>
                      <RiImageEditFill />

                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <button className={`text-white h-40 align-items-center px-2 min-w-[30%] ${Showdp!==null?'flex':'hidden'} hover:text-blue-800`} onClick={changeDp}>Change Profile Picture <GiConfirmed/></button>
                  </div>
                  <div className="col-md-9 mt-4">
                    <ul className="d-flex align-items-center gap-4 text-yellow-50">
                      <li><h3 style={{ fontSize: "1.8rem", fontWeight: 500, }} className='py-1'>{data.firstName} {' '} {data.lastName} </h3></li>
                      {/* <li><a href="javscript:void(0);"><Button variant="outline-primary">Follow</Button> */}
                      {/* </a></li> */}
                      {/* <li><a href="javascript:void(0);"><i className="fa-solid fa-caret-down"></i></a></li> */}
                      {/* <li style={{ fontSize: "2rem" }}><b><AiFillSetting /></b></li> */}
                    </ul>
                    <ul className="d-flex align-items-center gap-4 my-4 text-yellow-50">
                      <li><b>{data.post.length}</b> posts</li>
                      <li><b>{data.friends.length}</b> Friends</li>
                      {/* <li><b>22 </b>following</li> */}
                    </ul>
                    <ul className="d-flex align-items-center gap-4 my-4 text-yellow-50">
                      <li><b>Hey Connections I'm {data.firstName} {data.lastName}. I'm young, passionate and hard working person. I am feeling good in connecting with this community!</b></li>
                    </ul>
                  </div>
                </div>
              </div>
              : <LoaderIcon />
            }
          </section>

          <section id="posts" className='h-max'>
            {data ? (
              <div className="container-fluid px-6 lg:px-40 ">
                <div className={`grid gap-2 grid-rows-${Length ? `${Length}` : '0'} 
                  md:grid-rows-${Length ? `${Math.round(Length / 2)}` : '0'} 
                  grid-cols-1 md:grid-cols-2 gap-4`}>
                  {data.post.map((element, index) => (
                    <>
                      <div className="card  border-none rounded-2xl" key={index}>
                        <img className='img rounded-xl ' src={element.media[0]} style={{ height: "20rem" }}></img>
                        <div className="py-4 flex gap-6">
                          <button className="inline-flex items-center" >
                            <span className="mr-2">
                              <svg className="fill-rose-600 dark:fill-rose-400 w-[24px] h-[24px]" viewBox="0 0 24 24">
                                <path
                                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                                </path>
                              </svg>
                            </span>
                            <span className="text-lg font-bold">{element.like.length}</span>
                          </button>
                          <div className='text-xl font-bold cursor-pointer flex gap-1 ' onClick={() => showComment ? setShowComment(false) : setShowComment(true)}>
                            <FaCommentAlt className='translate-y-1' /> {element.comments?.length}
                          </div>
                        </div>

                      </div>
                    </>))}
                </div>
              </div>
            ) : (<></>)}
          </section>
        </div>) : (<></>)}
    </div>)


}

export default ProfileDashboard
