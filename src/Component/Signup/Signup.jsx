import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from'yup';
import { authContext } from '../../Context/AuthContext/AuthContextProvider';
import { Helmet } from 'react-helmet';


export default function Signup() {
 let {setToken} = useContext(authContext)
  const[errorMessage,setErrorMessage]=useState(null)
  const[isLoading,setIsLoading]=useState(null)
  let navigate=useNavigate()
 
 function handleRegister(values){
  setIsLoading(true)
 axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
 .then((res)=>{
  console.log(res);
  localStorage.setItem("token",res.data.token);
  setToken(res.data.token);
  navigate("/login");

 })
.catch((error)=>{
   console.log(error.response.data.message);
   setErrorMessage(error?.response.data.message)
}).finally(()=>{
  setIsLoading(false)
});

 }
let validationSchema= Yup.object().shape({
  name:Yup.string().min(3,"Name must be at least 3 letters").max(12,"Name must be at most 12 letters").required("Name is required"),
  email:Yup.string().email("Email is inValid").required("Email is required"),
  password:Yup.string().matches(/^\w{7}[A-Za-z]$/,"Password end with letter and min 6 characters").required("Password is required"),
  rePassword:Yup.string().oneOf([Yup.ref("password")],"Password and rePassword not match").required("rePassword is required"),
  phone:Yup.string().matches(/^01[1250]\d{8}$/,"Phone must be gyption number").required("Phone is required")
 })
let formikRegister= useFormik({
    initialValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:""
    },
    validationSchema:validationSchema,
    onSubmit:handleRegister
})


  return <>
  <Helmet>
    <title>Signup</title>
  </Helmet>
  {errorMessage !=null ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {errorMessage}
</div>:null}
  <form onSubmit={formikRegister.handleSubmit} className="w-3/4 mx-auto">
  <h2 className="my-5 text-2xl">Register Now:</h2>
  <div className="my-3">
    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Name</label>
    <input 
    name='name'
    value={formikRegister.values.name}
    onChange={formikRegister.handleChange}
    onBlur={formikRegister.handleBlur}
    type="text" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Name" required />
  </div>
  {formikRegister.errors.name && formikRegister.touched.name ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {formikRegister.errors.name}
</div>:null}
  <div className="my-3">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
    <input
    name='email'
    value={formikRegister.values.email}
    onChange={formikRegister.handleChange}
    onBlur={formikRegister.handleBlur}
    type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Email" required />
  </div>
  {formikRegister.errors.email && formikRegister.touched.email ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {formikRegister.errors.email}
</div>:null}
  <div className="my-3">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Password</label>
    <input
    name='password'
    value={formikRegister.values.password}
    onChange={formikRegister.handleChange}
    onBlur={formikRegister.handleBlur}
    type="password" id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Your Password" required />
  </div>
  {formikRegister.errors.password && formikRegister.touched.password ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {formikRegister.errors.password}
</div>:null}
  <div className="my-3">
    <label htmlFor="repassword" className="block mb-2.5 text-sm font-medium text-heading">rePassword</label>
    <input
    name='rePassword'
    value={formikRegister.values.rePassword}
    onChange={formikRegister.handleChange}
    onBlur={formikRegister.handleBlur}
    type="password" id="repassword" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="rePassword" required />
  </div>
  {formikRegister.errors.rePassword && formikRegister.touched.rePassword ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {formikRegister.errors.rePassword}
</div>:null}
  <div className="my-3">
    <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Phone</label>
    <input
    name='phone'
    value={formikRegister.values.phone}
    onChange={formikRegister.handleChange}
    onBlur={formikRegister.handleBlur}
    type="tel" id="phone" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Phone" required />
  </div>
  {formikRegister.errors.phone && formikRegister.touched.phone ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {formikRegister.errors.phone}
</div>:null}
  <button type='submit' className="bg-green-400 rounded-md p-2 px-5 relative start-7/8 my-4 mb-10 text-white hover:bg-green-300 transition-all duration-500">{isLoading? <i className='fas fa-spin fa-spinner'></i>:"Register"}</button>
</form>

  
  </>
}
