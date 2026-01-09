import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext ,useState } from 'react'
import { cartContext } from '../../Context/CartContextProvider/CartContextProvider'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from'yup';
import { Helmet } from 'react-helmet'


export default function Payment() {
  const[cash,setCash]=useState(false)
    let navigate = useNavigate()
    const {cartId} = useContext(cartContext)
    function CashPayment(values){
    
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            values,
            {
                headers:{
                    token:localStorage.getItem("token")
            }
        }

        ).then(()=>{
            navigate ("/allorders")
            toast.success("Payment Done Successfully")

        }).catch(()=>{
            toast.error("Payment Failed , Please Try Again")
        })

    }
    function OnlinePayment(values){
       axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        values,
       {
            headers:{
                token:localStorage.getItem("token")
            },
            params:{
                url:"http://localhost:5173"
            }
        })
        .then((res)=>{
        
          window.open(res.data.session.url,"_self")
          
            toast.success("Payment Done Successfully")
            
        }).catch(()=>{
            toast.error("Payment Failed , Please Try Again")
        })
    }
    function PaymentMethod(values){
      let apiObj={
            shippingAddress:values
        }
      if(cash){
        CashPayment(apiObj)
      }else{
        OnlinePayment(apiObj)
      }
    }
    let validationSchema= Yup.object().shape({
      details:Yup.string().min(6,"Name must be at least 6 letters").max(20,"Name must be at most 20 letters").required("Name is required"),
      phone:Yup.string().matches(/^01[1250]\d{8}$/,"Phone must be Egyption number").required("Phone is required"),
      city:Yup.string().min(3,"City must be at least 3 letters").max(15,"City must be at most 15 letters").required("City is required")

     })
   let { values, handleChange, handleSubmit , handleBlur } = useFormik({
    initialValues:{
        details:"",
        phone:"",       
        city:""
    },
    validationSchema:validationSchema,
    onSubmit:PaymentMethod

    })
  return <>
  <Helmet>
    <title>Payment</title>
  </Helmet>
  <form onSubmit={handleSubmit} className="max-w-md mx-auto my-10">
  <div className="relative z-0 w-full my-7 group ">
    <input
    name="details"
    onBlur={handleBlur}
    onChange={handleChange}
    value={values.details}
    type="text"  id="details" className=" block text-green-600 py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
    <label htmlFor="details" className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Details</label>
  </div>
  <div className="relative z-0 w-full my-7 group">
    <input
    name="phone"
    onBlur={handleBlur}
    onChange={handleChange}
    value={values.phone}    
    type="tel"  id="phone" className="block py-2.5 text-green-600 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
    <label htmlFor="phone" className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone Number</label>
  </div>
  <div className="relative z-0 w-full my-7 group">
    <input
    name="city" 
    onBlur={handleBlur}
    onChange={handleChange}
    value={values.city}
    type="text" id="city" className="block py-2.5 text-green-600 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
    <label htmlFor="city" className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">City</label>
  </div>
  <div className="flex justify-between my-5">
    <button onClick={()=>{setCash(true)}} type="submit" className="cursor-pointer border border-solid border-green-500 rounded-md py-2 px-4 hover:bg-green-500 hover:text-white transition-all duration-900 ">Cash Payment

  </button>
  <button onClick={()=>{setCash(false)}} type="submit" className="cursor-pointer border border-solid border-green-500 rounded-md py-2 px-4 hover:bg-green-500 hover:text-white transition-all duration-900 ">Online Payment
    
  </button>
  </div>
</form>

  
  
  </>
}
