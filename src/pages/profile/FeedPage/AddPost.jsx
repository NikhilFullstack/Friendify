// import React, { useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '../../../services/operations/PostAPI';
// function AddPost() {
//     const [showEmojis, setShowEmojis] = useState(false);
//     const dispatch = useDispatch();
//     const token = localStorage.getItem("token");
//   const emojiContainerRef = useRef();


//     const [postInputForm, setPostInputForm] = useState({
//         caption: '',
//         media: [],
//     });


//     const emojiLib = [
//         '🙂',
//         '😊',
//         '🤗',
//         '😄',
//         '😅',
//         '😆',
//         '😂',
//         '🤣',
//         '😘',
//         '🥰',
//         '😍',
//         '🤩',
//         '😇',
//         '😎',
//         '😋',
//         '😜',
//         '🙃',
//         '😴',
//         '🤯',
//         '🥳',
//       ];
//     const {loading} = useSelector((state) => state.auth)
//     const onFileChange = async (e) => {
//         const file = e.target.files[0];
//         const toBase64 = (file) =>
//             new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file);
//                 reader.onload = () => resolve(reader.result);
//                 reader.onerror = (error) => reject(error);
//             });

//         let base64File = await toBase64(file);
//         setPostInputForm({ ...postInputForm, media:{$push: base64File}  });
//     };
//     function handleAddPost(dataPost){

//     }
//     const image =localStorage.getItem("image");
//     return (
//       <>
//         { loading ? (<></>):(
//         < div className="flex flex-col bg-nav-background  dark:bg-dark-secondary-background  text-txt-color dark:text-dark-txt-color rounded-lg drop-shadow-2xl dark:divide-primary divide-y divide-primary w-[50%] mx-auto" >
//         <div className="p-4">
//             <h1 className="text-xl">Create Post</h1>
//         </div>
//         <div className="p-4">
//             <div className="flex flex-col gap-4 grow">
//                 <div className="flex items-center gap-4 grow">
//                     <img className="h-14 w-14 rounded-full object-cover" src={image!==null? image.split(`"`)[1]: '#'} alt="profile-img" loading='lazy' />
//                     <input className="grow focus:outline-none font-normal text-txt-secondary-color text-lg dark:bg-dark-secondary-background dark:text-dark-txt-secondary-color" placeholder="Write something here" type="text" value={postInputForm.caption}
//                         onChange={(e) =>
//                             setPostInputForm({
//                                 ...postInputForm,
//                                 caption: e.target.value,
//                             })
//                         } />
//                 </div>
//                 {postInputForm?.media!==[] ? (
//                   handleAddPost(postInputForm.media)
//                   // <>
//                   // {
//                   //   const postMedia = postInputForm?.media;
//                   //   postMedia.map((a,index)=>{
//                   //   return <div className='relative' key={index}>
//                   //       <img src={a} alt='post pic' />
//                   //       <i
//                   //           onClick={() =>
//                   //               setPostInputForm({ ...postInputForm, media:{$pull: a} })
//                   //           }
//                   //           className='absolute top-1 right-1 text-4xl text-txt-hover-color cursor-pointer fas fa-times-circle'
//                   //       ></i>
//                   //   </div>
//                   //   })
//                   // }
//                   // </>
//                   ) : null}
//                 <ul className="border-t border-t-primary flex pt-4 gap-4 font-light items-center">
//                     <li className="relative flex items-center gap-3 bg-secondary-background dark:bg-dark-nav-background py-2 px-3 rounded-md cursor-pointer">
//                         <img className="h-6 w-6" src="https://res.cloudinary.com/donqbxlnc/image/upload/v1650190023/07_dffvl5.png" alt="phot" />
//                         <p className="text-primary text-sm font-semibold">Photo/GIF</p>
//                         <input className="cursor-pointer absolute w-28 opacity-0" 
//                         accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp" 
//                         type="file"
//                         onChange={onFileChange} />
//                     </li>
//                     <li 
//                     onClick={(e) => {
//                         setShowEmojis(true);
//                         if (
//                           e.target.childNodes.length === 1 &&
//                           e.target.innerText !== 'Emojis'
//                         ) {
//                           setPostInputForm({
//                             ...postInputForm,
//                             caption:
//                               postInputForm.caption + e.target.innerText,
//                           });

//                           setShowEmojis(false);
//                         }
//                       }}
//                     className="relative flex items-center gap-3 bg-secondary-background dark:bg-dark-nav-background py-2 px-3 rounded-md cursor-pointer">
//                         <img className="h-6 w-6" 
//                         src="https://res.cloudinary.com/donqbxlnc/image/upload/v1652278871/Sunglasses_Emoji_be26cc0a-eef9-49e5-8da2-169bb417cc0b_grande_tz0jya.png" 
//                         alt="emojis" />
//                         <p className="text-primary text-sm font-semibold">Emojis</p>
//                         {showEmojis ? (
//                       <div
//                         ref={emojiContainerRef}
//                         className='absolute w-48 p-4 flex flex-wrap justify-center items-center gap-2 rounded-lg dark:bg-dark-nav-background  bg-secondary-background '
//                       >
//                         {emojiLib.map((el) => {
//                           return (
//                             <span
//                               key={el}
//                               className='cursor-pointer text-2xl'
//                             >
//                               {el}
//                             </span>
//                           );
//                         })}
//                       </div>
//                     ) : null}
//                     </li>
//                 </ul>
//             </div>
//         </div>
//         <button 
//             onClick={() => {
//   console.log("createPostToken",token);

//                 dispatch(
//                   createPost({
//                     data: { ...postInputForm },
//                     token: token.split('"')[1],
//                   })
//                 );
//                 setPostInputForm({ caption: '', pic: '' });
//               }}
//             disabled={postInputForm.caption ? false : true}
//             className={`mb-4 mx-4 p-2 bg-primary active:bg-blue-500 text-white rounded-lg
//             ${ postInputForm.caption
//                 ? ''
//                 : 'cursor-not-allowed bg-txt-hover-color active:bg-txt-hover-color'} `}>Post</button>
//     </div>
//       )}
//       </>



//     )
// }

// export default AddPostimport React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux';
// import Post from './Post'
// import AddPost from './AddPost';
import wallpaper from '../../../assets/Mickey/nature.jpg'
import Navbar from '../../../components/common/Navbar';
// import Navbar2 from '../../../components/common/Navbar2';
import { useEffect, useState } from 'react';
import Upload2 from '../Dashboard/Upload2';
import logo from '../../../assets/logo/F.png'
import { searchUser } from '../../../services/operations/profileAPI';
import { setSearchData } from '../../../slices/searchSlice';
function AddPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null)
      dispatch(logout(navigate))
  }, []);
  const [showSearch, setShowSearch] = useState(false);
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
  return (
    <div className='flex w-screen gap-2  overflow-x-hidden'>
      <img src={wallpaper} className='fixed h-screen w-screen m-0 bg-no-repeat -z-30 object-cover' />
      <Navbar text="white" />

      <nav className="bg-white h-fit border-gray-200 dark:bg-gray-900  w-full lg:hidden fixed z-30">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Friendify</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={() => setShowSearch(!showSearch)}>Search</a>
              </li>
              {showSearch ? (

                <form onSubmit={searchHandler}>
                  <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" onChange={changeHandler} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...Search" required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
                </form>

              ) : ''}
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Explore</a>
              </li>
              <li>
                <a href="/createPost" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create</a>
              </li>
              <li>
                <a href="/dashboard/my-profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={async () => {
                  await dispatch(logout(navigate));
                }}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Upload2 />
    </div>
  )
}

export default AddPost
