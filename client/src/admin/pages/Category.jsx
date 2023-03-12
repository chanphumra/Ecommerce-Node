import React from 'react'
import CategoryTable from '../components/table/CategoryTable';

const Category = () => {
  return (
    <>
      <div className='lg:py-7 lg:px-10 p-5'>
        <h1 className='text-3xl font-bold text-black_500'>Main Category</h1>
      </div>
      <CategoryTable />
    </>
  )
}

export default Category;