import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from "../../../services/operations/PostAPI"
import { useNavigate } from 'react-router';
import { logout } from "../../../services/operations/authAPI"
import { setSearchData } from '../../../slices/searchSlice';
import { FaArrowLeft } from 'react-icons/fa';
import SearchTemplate from './SearchTemplate';
import Upload2 from '../Dashboard/Upload2';
const PostCard = React.lazy(() => import('../../../components/common/PostCard'));

function Post() {

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("token:", token);
        await dispatch(getAllPost(token)).then((res) => {
          console.log("rees", res, "resposne has been recived");
        });

      }
      catch (err) {
        console.log("error in fetching All post feed", err, err.message);
        dispatch(logout(navigate))
      }
    }
    fetchData();
  }, []);

  const { data } = useSelector((state) => state.feed)
  const { feedLoading } = useSelector((state) => state.feed)
  console.log(data, "hello");
  const { searchData} = useSelector((state) => state.search)
  return (

    <div className='flex flex-col h-max w-full justify-center mx-auto bg-blue-50
      ' >
      {searchData !== null ? (
        <>{console.log('search data show ho gya', searchData)}
          {
            searchData.map((tag, index) => (
              <SearchTemplate tag={tag} key={index} />
            ))
          }
        </>) : (
        <>
          {feedLoading ? (<div>Spinner</div>) : (
            <div className='flex h-max w-full   flex-col justify-center items-center'>
              <Upload2/>
              
              

              {
                data?.posts.slice().reverse()
                  .map((Post, index) => (
                    <Suspense fallback={<div className=''></div>}><PostCard post={Post} key={index} /></Suspense>


                  ))
              }

            </div>

          )}</>

      )}
      {searchData != null ? (
        <button onClick={() => { dispatch(setSearchData(null)) }} className='text-white font-semibold 
flex fixed top-[19vh] left-2 xl:top-10  xl:left-80 bg-gray-700 rounded-sm h-fit w-fit p-2 px-4'><FaArrowLeft /></button>
      ) : (
        <></>
      )}

    </div>
  )
}

export default Post
