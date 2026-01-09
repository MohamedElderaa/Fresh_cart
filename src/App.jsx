import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Route,Routes, createHashRouter } from "react-router"
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import Products from './Component/Products/Products'
import Login from './Component/Login/Login'
import Signup from './Component/Signup/Signup'
import NotFound from './Component/NotFound/NotFound'
import Brand from './Component/Brand/Brand'
import AuthContextProvider from './Context/AuthContext/AuthContextProvider'
import ProtectRouter from './Component/ProtectRouter/ProtectRouter'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './Context/CartContextProvider/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import WishList from './Component/Wishlist/WishList'
import WishListContextProvider from './Context/WishListContextProvider/WishListContextProvider'
import Payment from './Component/Payment/Payment'
import AllOrders from './Component/AllOrders/AllOrders'
 

let queryClient = new QueryClient()


function App() {
   let router= createHashRouter([
    {path:"" ,element:<Layout/>,children:[
      {path:"",element:<ProtectRouter><Home/></ProtectRouter>},
      {path:"cart",element:<ProtectRouter><Cart/></ProtectRouter>},
      {path:"products",element:<ProtectRouter><Products/></ProtectRouter>},
      {path:"brand",element:<ProtectRouter><Brand/></ProtectRouter>},
      {path:"payment",element:<ProtectRouter><Payment/></ProtectRouter>},
      {path:"allorders",element:<ProtectRouter><AllOrders/></ProtectRouter>},
      {path:"wishlist",element:<ProtectRouter><WishList/></ProtectRouter>},
      {path:"productDetails/:id/:categoryName",element:<ProtectRouter><ProductDetails/></ProtectRouter>},
      {path:"login",element:<Login/>},
      {path:"signup",element:<Signup/>},
      {path:"*",element:<NotFound/>},
    ] }
    ])

  return  <>
  
      
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
         <WishListContextProvider>
           <RouterProvider router={router} />
           <Toaster />
         </WishListContextProvider>
        </CartContextProvider>
       </AuthContextProvider>
    </QueryClientProvider>
 
  
     </>
  
}

export default App
