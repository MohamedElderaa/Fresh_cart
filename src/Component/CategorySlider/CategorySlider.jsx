import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import axios from 'axios';


export default function CategorySlider() {
  const [categories, setCategories] = useState(null)
  function getCategory() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  .then((res)=>{
    console.log(res.data.data);
    setCategories(res.data.data)
  })
  .catch((error)=>{
    console.log(error);
  })
  }
  useEffect(()=>{
    getCategory()
  },[])
  return <>
     <h2>Shop Popular Categories</h2>
    <div className='flex slider-container mb-15'>
      <button className="prev-btn cursor-pointer"> <i className="fa-solid fa-angle-left"></i> </button>
      <Swiper
        modules={[Navigation]}
        
        slidesPerView={7}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        allowTouchMove={false}   
        simulateTouch={false}
      >
          {categories?.map((category)=> <div key={category._id} >

            <SwiperSlide>
              <img className='w-full flex h-50 object-cover' src={category.image} alt={category.name} />
            </SwiperSlide>

          </div>)}
        
      </Swiper>
      <button className="next-btn cursor-pointer"><i className="fa-solid fa-angle-right text-black"></i> </button>
    </div>
 

   </>
}
