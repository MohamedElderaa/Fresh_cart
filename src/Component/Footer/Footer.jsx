import React from 'react'

export default function Footer() {
  return <>
  <footer className='relative bottom-0 start-0 end-0 bg-slate-300 py-4'>
   <div className='container mx-auto flex justify-between'>
    <h2 className='text-2xl font-bold'>Get The FreshCart App</h2>
    <ul className='flex '>
      <li><i className="fa-brands fa-app-store-ios"></i></li>
      <li><i className="fa-brands fa-google-play"></i></li>
      
    </ul>
   </div>
  <ul className='container mx-auto flex justify-center gap-4'>
     <li><i className="fa-brands fa-facebook"></i></li>
     <li><i className="fa-brands fa-square-instagram"></i></li>
     <li><i className="fa-brands fa-linkedin"></i></li>
     <li><i className="fa-brands fa-square-x-twitter"></i></li>
     <li><i className="fa-brands fa-tiktok"></i></li>
  </ul>



  </footer>
  
  
  
  </>
}
