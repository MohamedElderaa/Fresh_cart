import React, { use, useContext, useEffect } from 'react'
import { cartContext } from '../../Context/CartContextProvider/CartContextProvider'
import { TailSpin } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
  let {getCart , updateQuantityCart , removeItem , ClearCart , numOfCartItems , totalCartPrice, productsCart, isLoading} = useContext(cartContext)
   async function removeItemFromCart(id){
     let result=await removeItem(id)
     if(result){
      toast.success("Product Removed Successfully From Your Cart")
     }else{
      toast.error("Failed To Remove Product From your Cart")
      
      }
   }
   async function ClearCartHandler(){
    let result= await ClearCart() 
    if(result){
      toast.success("Cart Cleagreen Successfully")
      getCart()
    }else{
      toast.error("Failed To Clear Your Cart")
      getCart()
    } 
    
    }

    useEffect(()=>{
    getCart()
    },[])
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
    

  return <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
    
    <div className='my-7 flex items-center justify-between'>
    <div><h2 className='italic font-bold '>Number of Cart Items: {numOfCartItems}</h2>
    <h2 className='italic font-bold '>Total Cart Price: {totalCartPrice} EGP</h2></div>
    <button onClick={ClearCartHandler} className='group cursor-pointer border border-solid border-red-500 rounded-md py-2 px-4 hover:bg-red-500 hover:text-white transition-all duration-900 '>Clear Your Cart <i className="fa-solid fa-cart-shopping" /></button>
    </div>
      



<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Remove
        </th>
      </tr>
    </thead>
    <tbody>
      {productsCart?.map((product)=><tr key={product.product._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button onClick={()=>{updateQuantityCart(product.product._id, product.count - 1)}} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="cursor-pointer flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <input type="text" id="counter-input-1" data-input-counter className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-10 text-center" placeholder={product.count} required />
              <button onClick={()=>{updateQuantityCart(product.product._id, product.count + 1)}} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="cursor-pointer flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.price}
        </td>
        <td className="px-6 py-4">
          <span className="cursor-pointer text-rose-600 font-medium text-fg-danger hover:underline" onClick={()=>removeItemFromCart(product.product._id)}><i className="fa-solid fa-trash" />
            </span>
        </td>
      </tr>)}
     
    </tbody>
  </table>
</div>

<div className="text-center my-7">
  <Link to={"/payment"} className='group cursor-pointer border border-solid border-green-500 rounded-md py-2 px-4 hover:bg-green-500 hover:text-white transition-all duration-900 '>Payment <i className="fa-solid fa-wallet" />
</Link>
</div>
   
  
  </>
}


