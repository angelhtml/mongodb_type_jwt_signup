"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Navbar from "../../../components/navbar"

export default function Login(){
    const router = useRouter()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const Inputhander = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    const Login = () => {
        axios({
            method: 'post',
            url: '/api/login',
            data: {
                email: input.email,
                password: input.password
            }
        })
        .then(res => {
          if(res.data.msg == "ok"){
              localStorage.setItem('token', res.data.token)
              router.push("/")
          }
          if(res.data.msg == "incorrect password" || res.data.msg == "user not found" || res.data.msg == "incorrect data"){
              alert(res.data.msg)
          }
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <>
        <Navbar />
            <div>
                <input name='email' value={input.email} onChange={Inputhander} placeholder="email"/>
                <input name="password" value={input.password} onChange={Inputhander} placeholder="password"/>
                <button onClick={Login}>Login</button>
            </div>
        </>
    )
}