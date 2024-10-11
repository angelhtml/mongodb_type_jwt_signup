"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function RemoveButton(){

    const [data, setData] = useState<any[]>([])

     // get data
     const GetData = ()=>{
        axios({
          method: 'get',
          url: '/api/getuser'
        })
        .then(res => {
          setData(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }

      useEffect(() => {
        GetData()
      }, [])

      const Remove = (id: any) =>{
        axios({
          method: 'get',
          url: `/api/removeuser/${id}`,
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }

    return(
        <div>{data.map(i => <button className="border-2 border-red-500 flex flex-col m-6" key={i._id} onClick={() => Remove(i._id)}>Remove</button>)}</div>
    )
}