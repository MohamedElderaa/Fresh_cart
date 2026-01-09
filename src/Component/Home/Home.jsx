import React from 'react'
import DisplayProduct from '../DisplayProduct/DisplayProduct'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'



export default function Home() {
  
  return <>
  <Helmet>
    <title>Home</title>
  </Helmet>
   <MainSlider/>
  <CategorySlider/>

  <DisplayProduct />
  
  </>
}
