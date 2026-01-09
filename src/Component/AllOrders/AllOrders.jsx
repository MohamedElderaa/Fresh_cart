import axios from 'axios'
import React, { use, useContext ,useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext/AuthContextProvider'
import { jwtDecode } from "jwt-decode";
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function AllOrders() {
  const [orders, setOrders] = useState(null)
  let {id} = jwtDecode(localStorage.getItem("token"))
  
  

    function getAllOrders(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((res)=>{
            
            setOrders(res.data)
        })
        .catch((error)=>{
            toast.error("error" ,error)
        })  
    }
    useEffect (()=>{
            getAllOrders(id)
        },[])   


  return <>
  <Helmet>
    <title>All Orders</title>
  </Helmet>
    <h2 className='italic font-bold my-7'>All Orders</h2>
  
    


 {orders?.map((order)=><div className="bg-neutral-primary-soft block border-b-2  p-6  ">
      
      
    
    <h2 className='capitalize'>Name: {order.user.name}</h2>
    <h2>Phone: {order.user.phone}</h2>
    <h2 className='capitalize'>City: {order.shippingAddress.city}</h2>
    <h2>Order contents: {order.cartItems.length} Item(s)</h2>
   <h2>Order Price: {order.totalOrderPrice}</h2>
   
  
</div>)}



  
  
  </>
 }
 