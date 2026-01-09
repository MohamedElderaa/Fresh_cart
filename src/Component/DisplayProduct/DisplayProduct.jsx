import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { useQuery } from '@tanstack/react-query'
import { cartContext } from '../../Context/CartContextProvider/CartContextProvider'
import { toast } from 'react-hot-toast'
import { wishListContext } from '../../Context/WishListContextProvider/WishListContextProvider'

export default function DisplayProduct() {
  let {addToCart} = useContext(cartContext)
  let {addToWishList} = useContext(wishListContext)
async function AddProductToCart(id) {
   let result = await addToCart(id)
    console.log("result" ,result.data);
     if(result.data.status=="success"){
      toast.success("Product added successfully to your cart")

     }else{ 
      toast.error("Product failed to add to your cart")

      } 

}
async function AddProductToWishList(id) {
   let result = await addToWishList(id)
    console.log("result" ,result.data);
     if(result.data.status=="success"){
      toast.success("Product added successfully to your Favorites")

     }else{ 
      toast.error("Product failed to add to your Favorites")

      } 

}
     


   async function getProduct() {
     return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      
    }
   let {data,isLoading,isError}= useQuery({
      queryKey: ['products'],
      queryFn:getProduct,
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
      return toast.error("Something went wrong please try again later")
    }
    
  return <>
  <div className="grid p-2 gap-5  lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
   {data.map((product)=><div key={product._id} className='relative'>

  <Link to={`/productDetails/${product._id}/${product.category.name}`}>
  <img className='w-full rounded-2xl ' src={product.imageCover} alt={product.title} />
  <h3 className='text-green-400 text-sm'>{product.category.name}</h3>
  <h2 >{product.title.split(" ",2).join(" ")}</h2>
  <h2>{product.brand.name}</h2>
  <div className='flex justify-between'>
    {product.priceAfterDiscount? <div className='text-sm'>
     <span className='text-red-500 line-through'>{product.price} </span>
     <span>{product.priceAfterDiscount} EGP</span>
    </div>:<span className='text-sm'>{product.price} EGP</span>}
    
    <span className='text-sm'><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
     
  </div>
  
   
   {product.priceAfterDiscount?<div>
    <span className='absolute top-0 bg-yellow-400 px-3 py-1 rounded-b-md'>Sale</span>
   </div> :null}
  </Link>
  
     <button onClick={()=>{AddProductToWishList(product._id)}} className='group cursor-pointer border-2 border-solid border-red-500 rounded-md py-1 px-2 my-2 w-full hover:bg-red-500 hover:text-white transition-all duration-900'>Add to Favs <i className="fa-solid fa-heart text-red-500 group-hover:text-white transition-all duration-900 " />
       </button>
   <button onClick={()=>{AddProductToCart(product._id)}} className='group cursor-pointer border-2 border-solid border-green-400 rounded-md py-1 px-2 my-2 w-full hover:bg-green-500 hover:text-white transition-all duration-900'>Add To Cart <i className="fa-solid fa-cart-shopping text-green-500 group-hover:text-white transition-all duration-900" />
   </button>

   </div> )}
   </div>
  
  
  </>
}
 