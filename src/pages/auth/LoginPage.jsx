import React from 'react'
import Template from '../../components/core/Template'
import login from '../../assets/images/signupbg.jpg'
import bglogin from '../../assets/images/12.jpg'
import bglog from '../../assets/images/12m.jpg'

function LoginPage() {
  return (
    <div className=' h-auto ' >
      <img alt='bg-login' src={bglogin} className='bg-no-repeat hidden md:block bg-contain z-[-10] fixed h-screen w-screen'/>
      <img alt='bg-login' src={bglog} className='bg-no-repeat md:hidden bg-inherit z-[-10] fixed h-screen w-screen'/>
      <Template
      image={login}
      formType="login"
    />
    </div>
  )
}

export default LoginPage
