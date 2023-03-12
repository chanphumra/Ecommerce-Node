import React from 'react'
import OrdersTable from '../components/table/OrdersTable';

const Order = () => {
    return (
        <>
            <div className='lg:py-7 lg:pb-5 lg:px-10 p-5'>
                <h1 className='text-3xl font-bold text-black_500'>Orders</h1>
            </div>
            <OrdersTable />
        </>
    )
}

export default Order;