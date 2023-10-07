import React from 'react'
import { Link } from 'react-router-dom';

function SearchTemplate(props) {
    const {tag,key} = props;
  return (
    <Link key={key} className={`w-[80vw] md:w-[50vw] border-2 border-gray-700 h-fit mx-0 overflow-x-auto sm:px-12 py-2 sm:py-12 bg-slate-400 mt-8 flex gap-2`} to={`/profile/${tag?._id}`} >
        <div className='h-fit w-fit flex items-start -translate-x-5 my-auto'>
            <img src={tag?.image} className='h-[65px] w-[120px] md:h-[6rem] md:w-[10rem] px-2 rounded-xl flex'/>
        </div>
        <div className='flex -translate-x-8 break-words flex-col h-fit w-fit my-auto text-base md:text-lg'>
              <div className='flex font-semibold hover:scale-95 delay-200'>{tag?.firstName} {"  "} {tag?.lastName}</div>
              <div>{tag?.email}</div>
              <div>Total Post : {tag?.post.length}</div>
        </div>
      
    </Link>
  )
}

export default SearchTemplate
