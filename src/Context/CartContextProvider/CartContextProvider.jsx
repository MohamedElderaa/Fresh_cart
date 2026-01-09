import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, use } from 'react'
import { useState } from 'react'


 export let cartContext = createContext()
export default function CartContextProvider({ children }) {
     const [numOfCartItems, setNumOfCartItems] = useState(0)
     const [totalCartPrice, setTotalCartPrice] = useState(0)
     const [productsCart, setProductsCart] = useState(null)
     const [isLoading, setIsLoading] = useState(false)
     const [cartId, setCartId] = useState(null)

     async function addToCart(id) {
         return  axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {productId:id}, 
        {
            headers:{       
                token:localStorage.getItem("token")
            }
        }
      ).then((res)=>{
        return res
      })
      .catch((error)=>{
        return error
      })

           
         }
         function getCart(){
            setIsLoading (true)
            axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            .then((res)=>{
                console.log(res);
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setProductsCart(res.data.data.products)
                setCartId(res.data.cartId)
                
                
                
            })
            .catch((error)=>{
                console.log(error);
            })
            .finally (()=>{
                setIsLoading (false)        
            })
        }
        async function removeItem(id){
           return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    headers:{
                        token:localStorage.getItem("token")
                    }
                }
            ).then((res)=>{
                console.log(res)
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setProductsCart(res.data.data.products)
                return true
                
            })
            .catch((error)=>{
                console.log(error);
                return false
            })

        }
        function updateQuantityCart(id , count){
            axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {count:count},
            {
                    headers:{
                        token:localStorage.getItem("token")
                    }   
                
            })
            .then((res)=>{
                console.log(res)
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setProductsCart(res.data.data.products)
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        async function ClearCart(){
           return axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
            {
                headers:{
                    token:localStorage.getItem("token")
                }
            }
           ).then((res)=>{
            console.log("clear",res)
            
            
            return true
           })
              .catch((error)=>{ 
                console.log(error);
                return false
                })
                
        }
   

  return <cartContext.Provider value={{addToCart , getCart ,updateQuantityCart, removeItem , ClearCart , cartId, numOfCartItems , totalCartPrice , productsCart, isLoading}}>
    {children}
  </cartContext.Provider>
}
