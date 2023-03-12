import React from 'react'
import { useParams } from 'react-router-dom';
import SubCategoryTable from '../components/table/SubCategoryTable';

const SubCategory = () => {
  const {title} = useParams();
  return (
    <>
      <div className='lg:py-7 lg:px-10 p-5'>
        <h1 className='text-3xl font-bold text-black_500'>Sub Category <span className='text-2xl ml-2 text-gray-800'>({title})</span></h1>
      </div>
      <SubCategoryTable />
    </>
  )
}

export default SubCategory;