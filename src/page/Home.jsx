import React, { useEffect, useState } from 'react'
import Carusle from '../componenta/carusle'
import Tablet from '../componenta/Tablet'
import axios from 'axios'

function Home() {
  const [data , setData] = useState([])
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&sparkline=false&price_change_percentage=24h')
    .then((respons)=>{
      //  console.log(respons.data);
       setData(respons.data)
    })
  },[])
  return ( 
    <div className='bg-black'>
       <Carusle data={data}></Carusle> 
       <Tablet data={data}></Tablet>
    </div>
  )
}

export default Home