import React, { useState } from "react";
import "./PostShare.css";
import { createPost } from "../../../services/operations/PostAPI";
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
    const location = 'Jalandhar';
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token").split('"')[1];
    // const imageRef = useRef();
    // const dispatch = useDispatch();


    const navigate = useNavigate();
    
    const [caption, setCaption] = useState('');
    const [mediaImage, setMediaImage] = useState([])
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
    const handleChange1 = (event) => {
        setCaption(event.target.value)
    }
   

    return (
        <div className="mt-[133px]  PostShare w-full relative justify-center items-center  px-3  min-h-max
         rounded-xl p-2 flex text-slate-100 border-gray-100  bg-gray-400 lg:mt-10">
            <form className="text-3xl w-full flex flex-col md:flex-row" onSubmit={onSubmit}>
                
                <Upload
                    name="media"
                    label="Publish your thoughts "
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={editPost ? null : null}
                    imageN={setMediaImage}
                />
                <div className="inline-flex w-full h-auto px-2 py-2 gap-10 mb-5 mt-3 overflow-hidden">
                    
                        <div class="w-11/12 mx-auto mt-4  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label for="comment" class="sr-only">Post Description</label>
                                <textarea id="description" onChange={handleChange1} rows="8" class="w-full font-mono px-0 text-sm text-black bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 break-words " placeholder="Write a comment..." required></textarea>
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                <button type="submit" onClick={onSubmit} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                    Publish
                                </button>
                                <div class="flex pl-0 space-x-1 sm:pl-2">
                                    <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                        </svg>
                                        <span class="sr-only">Attach file</span>
                                    </button>
                                    <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                        </svg>
                                        <span class="sr-only">Set location</span>
                                    </button>
                                    <label htmlFor="upload-media" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg>
                                        <span class="sr-only">Upload image</span>
                                    </label>
                                    <input type="file" id="upload-media" name="image" style={{display:"none"}} required>
                                        
                                    </input>
                                </div>
                            </div>
                        </div>
                    
                </div>





            </form>
        </div>
    );
};

export default Upload2;
