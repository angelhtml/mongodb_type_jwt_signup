"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Navbar from "../../../components/navbar"

export default function Page(){
    const router = useRouter()
  const [input, setInput] = useState({
      email: '',
      username: '',
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

  const Submit = () => {
      axios({
          method: 'post',
          url: '/api/signup',
          data: {
              email: input.email,
              username: input.username,
              password: input.password
          }
      })
      .then(res => {
        if(res.data.msg == "user added"){
            localStorage.setItem('token', res.data.token)
            alert(res.data.msg)
            router.push("/")
        }
        if(res.data.msg == "user already exist"){
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
            <input name='username' value={input.username} onChange={Inputhander} placeholder="username"/>
            <input name="password" value={input.password} onChange={Inputhander} placeholder="password"/>
            <button onClick={Submit}>submit</button>
        </div>
        </>
    )
}