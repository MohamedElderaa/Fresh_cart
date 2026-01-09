import axios from 'axios'
import React, { createContext ,useState} from 'react'

export let wishListContext = createContext()
export default function WishListContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const [productsWish, setProductsWish] = useState(null)
    const [numOfWishItems, setNumOfWishItems] = useState(0)

    async function addToWishList(id){
          return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
            {productId:id},
            {
                headers:{
                    token:localStorage.getItem("token")
                }
            }
           ).then((res)=>{
            console.log(res);
            return res

           }).catch((error)=>{
            console.log(error);
            return error
           })
    }   
    function getWishList(){
         setIsLoading (true)
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{       

                token:localStorage.getItem("token")
            }
        }).then((res)=>{
           
            console.log(res.data.data);
            setProductsWish(res.data)
            setNumOfWishItems(res.data.data.length)
            
        }).catch((error)=>{
            console.log(error);
           
        })  .finally (()=>{
            setIsLoading (false)        
        })
    }   
    async function removeItem(id){
           return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                {
                    headers:{
                        token:localStorage.getItem("token")
                    }
                }
            ).then((res)=>{
                console.log("after remove",res)
                
                setProductsWish(res.data)
                return true
                
            })
            .catch((error)=>{
                console.log(error);
                return false
            })

        }

  return <wishListContext.Provider value={{addToWishList , getWishList, isLoading , productsWish , removeItem , numOfWishItems}} >
    {children}
  </wishListContext.Provider>
}
