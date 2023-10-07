import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function AuthTemplate() {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        token!==null? (
            navigate("home")
        ): (
            navigate("login")
        )
    },[]);
    
  return (
    <div>
      
    </div>
  )
}

export default AuthTemplate
