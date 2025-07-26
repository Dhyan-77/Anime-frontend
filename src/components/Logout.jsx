import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    const  logout = () =>{
     
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken")

        navigate("/")
    }
  return (
    <div>
    
     <button onClick={logout}  className="px-4 py-2 bg-black rounded-2xl text-white ">
        logout
     </button>

    </div>
  )
}

export default Logout