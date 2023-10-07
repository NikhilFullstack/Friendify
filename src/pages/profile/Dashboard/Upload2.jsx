import React, { useState, useRef } from "react";
// import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";

import { ImLocation } from "react-icons/im";
import { FaPushed } from 'react-icons/fa'
import { AiTwotoneCalendar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../slices/editPostSlice";
import { useEffect } from "react";
import { createPost } from "../../../services/operations/PostAPI";
import { setLoading } from "../../../slices/authSlice";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";
const Upload2 = () => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useForm();


    const [editPost, setEditPost] = useState(false);
    const [location, setLocation] = useState('Jalandhar');
    const [image, setImage] = useState({ image: '' });
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token").split('"')[1];
    const imageRef = useRef();
    const dispatch = useDispatch();
    const ProfileImage = localStorage.getItem("image").split('"')[1];
    // const [dataFile, setDataFile] = useState([])


    const navigate = useNavigate();
    const { step } = useSelector((state) => state.editPost);
    useEffect(() => {
        // image
    }, [image])
    const [caption, setCaption] = useState('');
    const [mediaImage, setMediaImage]  = useState([])
    const onSubmit = async (data) => {
        data.preventDefault();
        try {
            const formData = new FormData();
            // console.log("hghhggjgjjjhjhjjhjhjhhjjjh", caption)
            formData.append("caption", caption)
            formData.append("location", location)
            formData.append("media", mediaImage);
            setLoading(true)
            const result = await createPost(formData, token);
            if (result) {
                console.log("Post Created........", result);
            }
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
        setTimeout(() => {
            navigate('/');
        }, 2000)
    }
   const handleChange1 =(event)=>{
       setCaption(event.target.value)
   }
   const handleChange2 =(event)=>{
    setLocation(event.target.value)
}

    return (
        <div className="mt-[133px]  PostShare w-auto relative justify-center items-center mx-auto px-3  min-h-max
         rounded-xl p-2 flex text-slate-100 border-gray-100  bg-gray-400 lg:mt-10">
            <img src={`${ProfileImage}`} className="hidden md:block absolute top-12 left-10" alt="" />
            <form className="text-3xl" onSubmit={onSubmit}>
                {loading ? (<div className=""></div>) : <></>}
                <label htmlFor="caption" className="overflow-hidden translate-x-3 text-xl">Enter Caption <sup>*</sup></label>
                <textarea rows={3} cols={35} type="text" className='md:translate-x-4 border text-2xl
                 border-slate-400 p-2 rounded-lg text-black' required placeholder="Enter Caption ..."  id="caption"
                     onChange={handleChange1}  />
                    
                {/* <label for="upload-media"> */}
                <Upload
                    name="media"
                    label="Post Thumbnail"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={editPost ? null : null}
                    imageN={setMediaImage}
                    />
                    {/* </label> */}
                {/* <input type="file" id="upload-media" name="image" style={{display:"none"}}></input> */}
                {/* < className="postOptions"> */}
                <div className="inline-flex w-fit h-auto px-2 py-2 gap-10 mb-5 mt-3 overflow-hidden">
                <label className="h-fit md:h-10  gap-2 text-lg delay-200 flex my-auto overflow-hidden" >
                    <ImLocation className="translate-y-3" />
                    <div className="translate-y-2">Location <sup>*</sup></div>
                    <input id="location" onChange={handleChange2} className="text-black inline-block h-[2rem] w-[5rem] lg:h-auto lg:w-40 translate-y-2 -translate-x-3" required/>
                </label>
                <button className="button ps-button flex gap-2 hover:text-yellow-400 cursor-nesw-resize h-[2rem] w-[7rem] lg:h-[2.8rem] lg:w-[10rem]
                hover:delay-200 hover:font-extrabold hover:scale-95 text-xl p-2 px-4 bg-yellow-700 rounded-xl"><FaPushed className="text-xl" />Post</button>
                </div>
                
                {/* <div style={{ display: "none" }}>
                        <input
                            type="file"
                            name="myImage"
                            multiple
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                    </div> */}

                {/* </div> */}



            </form>
        </div>
    );
};

export default Upload2;
