import axios from 'axios'
import React, { useContext, useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContextProvider/CartContextProvider'
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { wishListContext } from '../../Context/WishListContextProvider/WishListContextProvider'

export default function ProductDetails() {
  let {addToCart} = useContext(cartContext)
  let {addToWishList} = useContext(wishListContext)
    let {id , categoryName} = useParams()
    const [product, setProduct] = useState(null)
    const [relatedproducts, setRelatedProducts] = useState(null)
    const [error, setError] = useState(null)

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
    
    function getProduct() {
      axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then((respon)=>{
        console.log(respon.data.data);
        let newProduct=respon.data.data.filter((prod)=> prod.category.name==categoryName)
        console.log("relateeee",newProduct);
        setRelatedProducts(newProduct)

      })
      .catch(()=>{
           
        setError("Product Not Found")

      })
      
      
    }
   function getSpecificProduct(id){
     axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
     .then((res)=>{
      setProduct(res.data.data)
     })
     .catch(()=>{
      setError("Product Not Found")
     })
    }
    useEffect(()=>{
        getSpecificProduct(id)
        getProduct()
    },[id])
    
    
  return <>
    <div>
      {product? <div className="flex gap-3 items-center">
      <div className='w-[25%]'>
        <img className='w-full' src={product?.imageCover} alt={product?.title} />
      </div>
      <div className='w-[75%] p-2 space-y-2'>
          <h3 className='text-green-500 text-2xl'>{product?.category.name}</h3>
          <h2 >{product?.title}</h2>
          <h2>{product?.brand.name}</h2>
          <p>{product?.description}</p>
          <div className='flex justify-between'>
           <div >
             {product?.priceAfterDiscount? <div>
                <span className='text-red-500 line-through'>{product?.price} </span>
                <span>{product?.priceAfterDiscount} EGP</span>
             </div>:<span>{product?.price} EGP</span>}
           </div>
    
            <span><i className='fas fa-star text-yellow-400'></i>{product?.ratingsAverage}</span>
         </div>
         {product?.priceAfterDiscount?<div className='my-2'>
                 <span className='   bg-yellow-400 px-3 py-1 rounded-md'>Sale</span>
                </div> :null}
            <button onClick={()=>{AddProductToWishList(product._id)}} className='group cursor-pointer border-2 border-solid border-red-500 rounded-md py-1 px-2 my-2 w-full hover:bg-red-500 hover:text-white transition-all duration-900'>Add to Favs <i className="fa-solid fa-heart text-red-500 group-hover:text-white transition-all duration-900 " />
       </button>
          <button onClick={()=>{AddProductToCart(product._id)}} className='group cursor-pointer border-2 border-solid border-green-400 rounded-md py-1 px-2 my-2 w-full hover:bg-green-500 hover:text-white transition-all duration-900'>Add To Cart <i className="fa-solid fa-cart-shopping text-green-500 group-hover:text-white transition-all duration-900" />
          </button>
         <Toaster />  
      </div>
     </div>:<div className='flex justify-center items-center'>
      <TailSpin
visible={true}
height="80"
width="80"
color="#4fa94d"
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""/>
      </div>}
      {error?
      <p className='text-center text-red-500 '> {error}</p>
     :null}
    </div>
    <div>
     <div className="grid p-2 gap-5  lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
   {relatedproducts?.map((product)=><div key={product._id} className='relative'>      
    <Link to={`/productDetails/${product._id}/${product.category.name}`}>
    <img className='w-full rounded-2xl ' src={product.imageCover} alt={product.title} />
  <h3 className='text-green-400 text-sm'>{product.category.name}</h3>
  <h2 >{product.title.split(" ",2).join(" ")}</h2>       
  <h2>{product?.brand.name}</h2>                                                                    
  <div className='flex justify-between'>
    {product.priceAfterDiscount? <div className='text-sm'>
     <span className='text-red-500 line-through'>{product.price} </span>
     <span>{product.priceAfterDiscount} EGP</span>
    </div>:<span className='text-sm'>{product.price} EGP</span>}   
    <span className='text-sm'><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
  </div>   
   {product.priceAfterDiscount?<div>           
    <span className='absolute top-0 bg-yellow-400 px-3 py-1 rounded-b-md'>Sale</span>
   </div> :null}  </Link>                
    <button onClick={()=>{AddProductToWishList(product._id)}} className='group cursor-pointer border-2 border-solid border-red-500 rounded-md py-1 px-2 my-2 w-full hover:bg-red-500 hover:text-white transition-all duration-900'>Add to Favs <i className="fa-solid fa-heart text-red-500 group-hover:text-white transition-all duration-900 " />
       </button>
   <button onClick={()=>{AddProductToCart(product._id)}} className='group cursor-pointer border-2 border-solid border-green-400 rounded-md py-1 px-2 my-2 w-full hover:bg-green-500 hover:text-white transition-all duration-900'>Add To Cart <i className="fa-solid fa-cart-shopping text-green-500 group-hover:text-white transition-all duration-900" />
          </button>   
   <Toaster />     
    </div>
   )} 
    </div>
      </div>
  </>   
}
