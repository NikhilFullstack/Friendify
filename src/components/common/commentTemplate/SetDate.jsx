import React from 'react'

function SetDate(props) {
    const { fxn, dte } = props;
    fxn(dte);
  return (
    <div className='hidden'>
      
    </div>
  )
}

export default SetDate
