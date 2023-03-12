import React from 'react'
import ProductTable from '../components/table/ProductTable';

const Product = () => {
  return (
    <>
      <div className='lg:py-7 lg:px-10 p-5'>
        <h1 className='text-3xl font-bold text-black_500'>Products</h1>
      </div>
      <ProductTable />
    </>
  )
}

export default Product;