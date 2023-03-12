import React from 'react'
import SlideshowTable from '../components/table/SlideshowTable';

const Product = () => {
  return (
    <>
      <div className='lg:py-7 lg:px-10 p-5'>
        <h1 className='text-3xl font-bold text-black_500'>Slideshow</h1>
      </div>
      <SlideshowTable />
    </>
  )
}

export default Product;