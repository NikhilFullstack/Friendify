import React from 'react'
import Template from "../../components/core/Template"
import signup from "../../assets/images/signupbg.jpg"
import bgsignup from '../../assets/images/logbag.jpg'
import bgsign from '../../assets/images/12m.jpg'
function SignupPage() {
  return (
    <div>
      <img alt='bg-login' src={bgsignup} className='bg-no-repeat hidden md:block  bg-contain z-[-10] fixed h-screen w-screen' style={{width:"100vw",height:"100vh"}}/>
      <img alt='bg-login' src={bgsign} className='bg-no-repeat md:hidden bg-contain z-[-10] fixed h-screen w-screen' style={{width:"100vw",height:"100vh"}}/>
      <Template
      // title="Join Friendify to connect with world wide"
      // description1="Let's connect together and explore opportunities."
      // description2="Happy connecting!"

      image={signup}
      formType="signup"
    />
    </div>
  )
}

export default SignupPage

