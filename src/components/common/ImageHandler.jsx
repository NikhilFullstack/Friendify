import React from 'react'

function ImageHandler({Src, ClassName}) {
  return (
    <div>
      <img src={Src} className={ClassName} alt='lazyloading' />
    </div>
  )
}

export default ImageHandler
