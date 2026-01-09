import React, { useContext } from 'react'
import Logo from '../../assets/logo.svg'
import { Navigate, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { authContext } from '../../Context/AuthContext/AuthContextProvider'

export default function Navbar() {
 let {token,setToken} = useContext(authContext)
 let navigate =useNavigate()
 function SignOut() {
  navigate("/login")
  localStorage.removeItem("token")
  setToken(null)
 }
  return <>
  
  <nav className='bg-slate-100 py-4 fixed top-0 start-0 end-0 z-50'>
   <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <div  className='flex items-center'>
        <Link to=''><img src={Logo} alt="freshcart logo"  className='w-37.5'/>
        </Link>
      {token? <ul className='flex gap-3.5 ms-2.5 text-gray-500'> 
      <li><Link to=''>Home</Link></li>
      <li><Link to='cart'>Cart</Link></li>
      <li><Link to='products'>Products</Link></li>
      <li><Link to='brand'>Brand</Link></li>
      <li><Link to='wishlist'>Favorites</Link></li>
    </ul>:null}
    </div>
    <ul className='flex gap-3.5 ms-2.5 text-gray-500'>
      {token?<li><span className='cursor-pointer' onClick={SignOut}>Sign Out</span></li>: 
      <>
      <li><Link to='login'>Login</Link></li>
      <li><Link to='signup'>Sign Up</Link></li>
      </>
      }
     

    </ul>

   </div>



  </nav>
  
  
  
  
  </>
}
