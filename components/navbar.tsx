"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar(){
    const router = useRouter()

    const [userData, setUserData] = useState<any>()

    //logout
    const Logout = () => {
        localStorage.removeItem('token')
        VerifyUser()
        console.log("l")
    }

    //verify user data
    const VerifyUser = () => {
        axios({
            method: "POST",
            url: "/api/verify",
            data: {token: localStorage.getItem('token')}
        })
        .then( (res) => {
            console.log(res.data)
            if(res.data.msg == "ok"){
                setUserData(res.data.data)
            }
            if(res.data.msg == "expired"){}
        })
        .catch( (err) =>{
            console.log(err)
        })
    }

    useEffect(() =>{
        VerifyUser()
    },[])



    return(
        <div className="bg-purple-700 h-12 w-full">
            <ul className="flex items-center gap-4 h-full px-4 text-white">
                {userData ? 
                <>
                 <li><button>{userData.username}</button></li>
                 <li><button onClick={Logout}>Logout</button></li>
                </>
                 :
                 <>
                 <li><button onClick={() => router.push("/signup")}>Signup</button></li>
                <li><button onClick={() => router.push("/login")}>Login</button></li>
                 </>
                }
                <li><button onClick={() => router.push("/")}>Home</button></li>
                
            </ul>
        </div>
    )
}