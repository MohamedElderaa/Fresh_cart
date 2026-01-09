import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from'yup';
import { authContext } from '../../Context/AuthContext/AuthContextProvider';
import { Helmet } from 'react-helmet';

export default function Login() {
  let {setToken}= useContext(authContext)
  const[errorMessage,setErrorMessage]=useState(null)
  const[successMessage,setSuccessMessage]=useState(null)
  const[isLoading,setIsLoading]=useState(null)
  let navigate=useNavigate()
 
 function handleLogin(values){
  setIsLoading(true)
 axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
 .then((res)=>{
  
  setSuccessMessage(res.data.message)
  localStorage.setItem("token",res.data.token);
  setToken(res.data.token)
  navigate("/");

 })
.catch((error)=>{
   
   setErrorMessage(error?.response.data.message)
}).finally(()=>{
  setIsLoading(false)
});

 }
let validationSchema= Yup.object().shape({

  email:Yup.string().email("Email is inValid").required("Email is required"),
  password:Yup.string().matches(/^\w{7}[A-Za-z]$/,"Password end with letter and min 6 characters").required("Password is required"),
 
 })
let formikLogin= useFormik({
    initialValues:{
       
        email:"",
        password:"",
       
       
    },
    validationSchema:validationSchema,
    onSubmit:handleLogin
})


  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
  {errorMessage !=null ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {errorMessage}
</div>:null}
  <form onSubmit={formikLogin.handleSubmit} className="w-3/4 mx-auto">
  <h2 className="my-5 text-2xl">Login Now:</h2>
  {successMessage ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-green-300" role="alert">
  {successMessage}
</div>:null}
  <div className="my-3">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
    <input
    name='email'
    value={formikLogin.values.email}
    onChange={formikLogin.handleChange}
    onBlur={formikLogin.handleBlur}
    type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Email" required />
  </div>
  {formikLogin.errors.email && formikLogin.touched.email ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {formikLogin.errors.email}
</div>:null}
  <div className="my-3">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Password</label>
    <input
    name='password'
    value={formikLogin.values.password}
    onChange={formikLogin.handleChange}
    onBlur={formikLogin.handleBlur}
    type="password" id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Your Password" required />
  </div>
  {formikLogin.errors.password && formikLogin.touched.password ? <div className="p-4 mb-4 text-sm text-center w-full rounded-md bg-red-200" role="alert">
  {formikLogin.errors.password}
</div>:null}
  <button type='submit' className="bg-green-400 rounded-md p-2 px-5 relative start-7/8 my-4 mb-10 text-white hover:bg-green-300 transition-all duration-500">{isLoading? <i className='fas fa-spin fa-spinner'></i>:"Login"}</button>
</form>

  
  </>
}
