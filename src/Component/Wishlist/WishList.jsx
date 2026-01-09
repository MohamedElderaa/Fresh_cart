import React, { useContext ,useEffect} from 'react'
import { wishListContext } from '../../Context/WishListContextProvider/WishListContextProvider'
import { TailSpin } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/CartContextProvider/CartContextProvider'
import { Helmet } from 'react-helmet'


export default function WishList() {
    let {getWishList, isLoading , productsWish, removeItem, numOfWishItems} = useContext(wishListContext)
    let {addToCart} = useContext(cartContext)
    useEffect(()=>{
    getWishList()
        },[])
        async function AddProductToCart(id) {
   let result = await addToCart(id)
    console.log("result" ,result.data);
     if(result.data.status=="success"){
      toast.success("Product added successfully to your cart")

     }else{ 
      toast.error("Product failed to add to your cart")

      } 

}

         if(isLoading){
      
      return <div classNameName='flex justify-center items-center'>
          <TailSpin     
            visible={true}
            height="80" 
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
             wrapperclassName=""/>
          </div>
    }
    async function removeItemFromWish(id){
     let result=await removeItem(id)
     if(result){
      toast.success("Product Removed Successfully From Your Favorites")
     }else{
      toast.error("Failed To Remove Product From your Favorites")
      
      }
      getWishList()
   }
     
  return <>
  <Helmet>
    <title>Wishlist</title>
  </Helmet>
    <h2 className='italic font-bold my-7'>Number of Favorites Items: {numOfWishItems}</h2>

    

<div className="grid p-2 gap-5  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
   
        {productsWish?.data.map((product)=><div  key={product.id} >
    
        <img className="rounded-base mb-6" src={product.imageCover} alt={product.title} />
   
        <div>

           
              <h2>{product.title.split(" ",2).join(" ")}</h2>
             <h2>{product.brand.name}</h2>
            <h4>{product.category.name}</h4>
            <div className='flex justify-between items-center my-2'>
            {product.priceAfterDiscount? <div className='text-sm'>
                  <span className='text-red-500 line-through'>{product.price} </span>
                    <span>{product.priceAfterDiscount} EGP</span>
                    </div>:<span className='text-sm'>{product.price} EGP</span>}
            <span className='text-sm'>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i>
            </span>
            </div>
            <div className='flex justify-between items-center my-2'>
              <button onClick={()=>{AddProductToCart(product._id)}} className='group cursor-pointer border-2 border-solid border-green-400 rounded-md py-1 px-2 my-2  hover:bg-green-500 hover:text-white transition-all duration-900'>Add To Cart <i className="fa-solid fa-cart-shopping text-green-500 group-hover:text-white transition-all duration-900" />
             </button>
              <span className="cursor-pointer text-rose-600 font-medium text-fg-danger hover:underline" onClick={()=>removeItemFromWish(product.id)}><i className="fa-solid fa-trash" />
            </span>
            </div>

            

       </div>
</div>)}
      </div>
     
  
  </>
}
