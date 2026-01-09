import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React ,{useEffect, useState} from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'


export default function Brand() {
  function getBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
let {data,isLoading,isError}= useQuery({
  queryKey: ['brands'],
  queryFn:getBrands,
   refetchInterval: 10000000,
      staleTime: 50000,
      retry: 2,
      refetchIntervalInBackground: false,
      select: (data) => {
        return data?.data.data
      },
      
})
console.log(data);

if(isLoading){
  return <div className='flex justify-center items-center'>
      <TailSpin   
visible={true}
height="80"
width="80"
color="#4fa94d"
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""/>
      </div>
}
if(isError){
  return <h2>Something went wrong</h2>
}
  return <>
  <div className="grid p-2 gap-5  lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
   {data.map((brand)=><div key={brand?._id}>
    
    <img className='shadow w-full rounded-2xl ' src={brand?.image} alt="Brand image" />
    <h2 className='text-center text-xl p-2'>{brand?.name}</h2>
   
    
  </div>)}
  
  </div>
  
  </>
}
