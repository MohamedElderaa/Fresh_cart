import React from 'react'
import { Helmet } from 'react-helmet'
import NotFoundImage from '../../assets/error.svg'

export default function NotFound() {
  return <>
  <Helmet>
    <title>Not Found Page</title>
  </Helmet>
    <div className='flex justify-center items-center mt-7 mb-36'>
      <img  src={NotFoundImage} alt="404 Not Found Page" />
    </div>

  </>

}
