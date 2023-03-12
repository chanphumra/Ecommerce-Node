import React from 'react'
import CustomerTable from '../components/table/CustomerTable';

const Customer = () => {
  return (
    <>
      <div className='lg:py-7 lg:px-10 p-5'>
        <h1 className='text-3xl font-bold text-black_500'>Customer</h1>
      </div>
      <CustomerTable />
    </>
  )
}

export default Customer;